// import Vue from 'vue'
import vuesax from "vuesax"
import axios from "axios"
import biometrics from "../utils/nowaskme-biometrics.js"
import utils from "../utils/nowaskme-utils.js"

vuesax // Vuesax must be installed.

function GenerateInstall() {
    return function (Vue, options) {
        options
        Vue.prototype.$nam = {
            // server: "http://127.0.0.1:5001",
            version: 'Final-24/6/2021-night',
            server: "https://apis.nowask.me",
            that: null,
            lastPath: '',
            user: {
                uuid: null,
                token: null,
                name: null,
                scope: null
            },
            cache: {}, // Add some cache, otherwise there would be >10 requests to the server in some circumstances.
            cache_max: 30000, // Max age
            cache_max_wait: 5000,
            cache_wait_period: 300,
            initialized: false,
            connected: true,
            pwa: true,
            requests: {
                lastRequest: 0,
                pending: {},
                packing: false,
            },
            async init(that) {
                if (this.initialized == true) {
                    return
                }
                // Allow only one initialization
                this.initialized = true
                this.that = that
                try {
                    this.cache = JSON.parse(localStorage.getItem("nam_cache"))
                } catch {
                    this.cache = {}
                }
                await this.pullCredentials()
                await this.useractions.getProfile({
                    handle_error: false,
                    no_cache: false,
                    clear_cache: false
                })
            },
            async commitRequest(route, params) {
                if (this.undefined == undefined) {
                    // Disable the batch request until the bug is identified and fixed.
                    return await axios.get(this.server + route, { params })
                }

                // BUG: Index Collision while two batch requests are happening at the same time.
                console.log('Submitted')
                // Add a request handler
                this.connected = true;
                if (this.requests.packing == true) {
                    // Packing is activated. Add the request to the list.
                    let RequestID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    console.log(RequestID, 'added to the list')
                    this.requests.pending[RequestID] = { request: { route, data: params }, completed: false, response: null }
                    while (!this.requests.pending[RequestID].completed) {
                        await this.sleep(10)
                    }
                    // Resolved
                    let d = {
                        data: this.requests.pending[RequestID].response
                    }
                    console.log(RequestID, 'Resolved')
                    console.log(RequestID, this.requests.pending[RequestID].completed, this.requests.pending[RequestID], d)
                    // delete this.requests.pending[RequestID]
                    return d
                } else if (Date.now() - this.requests.lastRequest <= 200) {

                    console.log('Start packing')
                    this.requests.packing = true

                    let RequestID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    console.log(RequestID, 'added to the list')
                    this.requests.pending[RequestID] = { request: { route, data: params }, completed: false, response: null }

                    // Start the countdown
                    setTimeout(async () => {
                        this.requests.packing = false
                        // Request batch
                        var batch = []
                        for (var x in this.requests.pending) {
                            batch.push({
                                route: this.requests.pending[x].request.route,
                                data: this.requests.pending[x].request.data
                            })
                        }
                        var form = new FormData()
                        form.append("batch", JSON.stringify(batch))
                        console.log('Pack sending')
                        let res = await axios.post(this.server + '/batch', form, {})
                        console.log('Pack recv')
                        var index = 0
                        for (var requestID in this.requests.pending) {
                            this.requests.pending[requestID].response = res.data.batch[index]
                            this.requests.pending[requestID].completed = true
                            // console.log('Toggled completed: for ' + requestID, 'of index', index, 'with response', res.data.batch[index])
                            index = index + 1
                        }
                        this.lastRequest = Date.now()
                    }, 200);

                    // Now, await for the results to come

                    while (!this.requests.pending[RequestID].completed) {
                        await this.sleep(10)
                    }
                    // Resolved
                    let d = {
                        data: this.requests.pending[RequestID].response
                    }
                    console.log(RequestID, 'Resolved')
                    console.log(RequestID, this.requests.pending[RequestID].completed, this.requests.pending[RequestID], d)
                    if (d == { data: undefined }) {
                        console.warn('UNDEFINED')
                    }
                    return d

                } else {
                    // Direct request
                    // console.log('direct')
                    this.requests.lastRequest = Date.now()
                    return await axios.get(this.server + route, { params })
                }

            },
            async onRouteChange(prev, next) {
                // console.log('Route changed!', prev, next)
                prev
                const authentication_free = [
                    '^/$',
                    '^/get-started$',
                    '^/register$',
                    '^/verification$',
                    '^/login/*',
                    '^/legal/*',
                    '^/local/*',
                    '^/diagnostics$',
                    '^/beta/*'
                    // RegExp: ^ - Nothing before; $ - Nothing after.
                ]
                for (var i = 0; i < authentication_free.length; i++) {
                    try {
                        if (new RegExp(authentication_free[i]).test(next)) {
                            return
                        }
                    } catch {
                        // error
                    }
                }
                await this.useractions.getProfile({
                    no_cache: true,
                    clear_cache: false
                })

            },
            async watch(that) {
                // Watches for change in this, and determine whether it was "app first launch" (init) 
                // or "change in route" (onRouteChange) or attach to other components (discard)

                if (that.$el.id == "app") {
                    // Watch if it was the first mount.
                    // ONLY with the first mount will that be mounted to #app
                    console.log("App first mounted")
                    await this.init(that)
                }
                try {
                    // Watch for the new route, if there is any, and compare it with last path.
                    // ONLY invoke route change AFTER the app is initialized, otherwise onRouteChange handler
                    // will try to read and use functions / data that will only be there AFTER initialization.
                    if (that.$route.path != this.lastPath && that.$route.path != "" && this.initialized) {
                        this.onRouteChange(this.lastPath, that.$route.path)
                        this.lastPath = that.$route.path
                    }
                } catch {
                    // Not handling
                }
            },
            storeCredentials() {
                if (this.user != undefined) {

                    localStorage.setItem("namuser", JSON.stringify(this.user))
                }
            },
            pullCredentials() {
                try {
                    this.user = {
                        ...this.user, ...JSON.parse(localStorage.getItem("namuser"))
                    }
                } catch {
                    localStorage.setItem("namuser", "{}")
                }
            },
            sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },
            async requestAPI(route, { params = {}, authenticate = true, handle_error = true, max_retry = 2, no_cache = true, clear_cache = true } = {}) {
                let cache_key = ""
                let check_cache_time = 0
                let current_location = window.location.href // Added current_location to prevent the API from being error-handled when the user has already left the page

                if (!no_cache) {
                    try {
                        this.cache = JSON.parse(localStorage.getItem("nam_cache"))
                    } catch {
                        // Could not fetch the cache, then it will use the local cache.
                        // Nothing to do here
                    }
                    // Check cache
                    cache_key = JSON.stringify({ route, params, authenticate, handle_error, max_retry })
                    check_cache_time = Date.now()
                    if (this.cache[cache_key] != undefined && check_cache_time - this.cache[cache_key].time <= this.cache_max && no_cache != true) {
                        try {
                            console.log('Cache hit')
                            if (this.cache[cache_key].content == null) {
                                // There is an existing request, so wait for it
                                console.log("Cache wait")
                                // Wait for 1 second
                                let wait_time = 0;
                                while (wait_time <= this.cache_max_wait && this.cache[cache_key].content == null) {
                                    console.log('Cache still waiting')
                                    try {
                                        this.cache = JSON.parse(localStorage.getItem("nam_cache"))
                                    } catch {
                                        this.cache = {}
                                    }
                                    await this.sleep(this.cache_wait_period)
                                    wait_time += this.cache_wait_period
                                }
                                if (this.cache[cache_key].content == null) {
                                    console.log("Cache wait timeout.")
                                } else {
                                    console.log("Cache wait return")
                                    return this.cache[cache_key].content
                                }
                            } else {
                                return this.cache[cache_key].content
                            }
                        } catch {
                            console.log('Cache hit, but failed to return')
                            delete this.cache[cache_key]
                        }
                    } else {
                        delete this.cache[cache_key]
                    }

                    // Register cache entry
                    this.cache[cache_key] = {
                        time: check_cache_time,
                        content: null
                    }

                    // Clear other caches
                    for (var key in this.cache) {
                        if (check_cache_time - this.cache[key].time > this.cache_max) {
                            delete this.cache[key]
                        }
                    }
                    // Cache finish

                    // Store cache to localstorage
                    localStorage.setItem("nam_cache", JSON.stringify(this.cache))

                }

                if (clear_cache) {
                    this.cache = {}
                    localStorage.setItem("nam_cache", JSON.stringify(this.cache))
                }

                this.pullCredentials()
                if (authenticate == true) {
                    params.uuid = this.user.uuid
                    params.token = this.user.token
                }
                let res = null
                try {
                    res = await this.commitRequest(route, params)
                    console.log('resolved here', res)
                    console.log(res.data.post)
                } catch (e) {
                    this.logging.error(e)
                    if (handle_error == true && max_retry > 0 && current_location == window.location.href) {
                        await this.sleep(1000)
                        return await this.requestAPI(route, {
                            params,
                            authenticate,
                            handle_error,
                            max_retry: max_retry - 1,
                            no_cache: true,
                            clear_cache: true
                        })
                    } else {
                        this.notification.failed('Check your internet connection', 'We could not contact our server due to an internet issue (' + String(e) + ')')
                        this.app.showGlobalError("We could not connect to the server","You may be offline. Please check your internet connection, then press ignore or reload the application.")
                        this.connected = false
                    }
                    return undefined
                }

                if (!no_cache) {
                    // Record cache
                    if (!no_cache) {
                        if (res.data.code >= 0) {
                            this.cache[cache_key] = {
                                time: check_cache_time,
                                content: res.data
                            }
                        } else {
                            delete this.cache[cache_key]
                        }
                    }
                    // Record finish
                    localStorage.setItem("nam_cache", JSON.stringify(this.cache))
                }


                if (handle_error == true && current_location == window.location.href) {
                    if (res.data.code < 0) {
                        if ([-107, -108, -109].includes(res.data.code) == true) {
                            this.that.$router.replace({ path: '/get-started', query: { 'then': this.lastPath } })
                            Vue.prototype.$nam.notification.failed('Please login again (' + String(res.data.code) + ')', res.data.message)
                            // [TODO] Add query so after auth it returns
                        } else if ([-110].includes(res.data.code) == true) {
                            this.that.$router.replace({ path: '/get-started', query: { 'then': this.lastPath } })
                            this.notification.failed('Sorry, something unexpected happened. Please try to login again (' + String(res.data.code) + ')', res.data.message)
                        } else if ([-111].includes(res.data.code) == true) {
                            this.notification.failed("Access is denied.", "You don't have sufficient permission to complete this action. You are missing: " + String(res.data.scope))
                        } else {
                            this.notification.failed('Failed to complete the request (' + String(res.data.code) + ')', res.data.message)
                        }
                        // Do something
                        return undefined
                    } else if (res.data.code > 0) {
                        this.notification.warn("Warning (" + String(res.data.code) + ")", res.data.message)
                        return res.data
                    } else {
                        return res.data
                    }
                } else {
                    return res.data
                }

            },
            useractions: {
                async getProfile(options) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/get_profile', options)
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    Vue.prototype.$nam.user = { ...Vue.prototype.$nam.user, ...res }
                    Vue.prototype.$nam.storeCredentials()
                    return res
                },
                async updateProfile({ name = null, description = null, userid = null } = {}) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/update_profile', {
                        params: {
                            name,
                            description,
                            userid
                        },
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    this.getProfile()
                    this._invokeUserStatusChange([Vue.prototype.$nam.user.uuid])
                    return res
                },
                async getUserProfile(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/get_profile', {
                        params: { target: uuid },
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return {
                        name: res.name,
                        description: res.description,
                        uuid: res.uuid,
                        userid: res.userid
                    }
                },
                async getFollowing(uuid = null) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/get_following', {
                        params: {
                            target: uuid,
                        },
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.following
                },
                async getFollowers(uuid = null) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/get_followers', {
                        params: {
                            target: uuid
                        },
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.followers
                },
                async getPinned() {
                    let res = await Vue.prototype.$nam.requestAPI('/user/get_pinned', {
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.pinned
                },
                async isFollowing(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/is_following', {
                        params: {
                            target: uuid
                        },
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.following
                },
                async isFollower(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/is_follower', {
                        params: {
                            target: uuid
                        },
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.follower
                },
                async isPinned(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/is_pinned', {
                        params: {
                            target: uuid
                        },
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.pinned
                },
                async follow(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/follow', {
                        params: {
                            target: uuid
                        }
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    this._invokeUserStatusChange([Vue.prototype.$nam.user.uuid, uuid])
                    return res
                },
                async unfollow(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/unfollow', {
                        params: {
                            target: uuid
                        }
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    this._invokeUserStatusChange([Vue.prototype.$nam.user.uuid, uuid])
                    return res
                },
                async pin(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/pin', {
                        params: {
                            target: uuid
                        }
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    this._invokeUserStatusChange([Vue.prototype.$nam.user.uuid, uuid])
                    return res
                },
                async unpin(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/unpin', {
                        params: {
                            target: uuid
                        }
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    this._invokeUserStatusChange([Vue.prototype.$nam.user.uuid, uuid])
                    return res
                },
                _userStatusListeners: [],
                addUserStatusListener(that, func) {
                    let id = this._userStatusListeners.length
                    this._userStatusListeners[id] = func
                    return id
                },
                removeUserStatusListener(id) {
                    delete this._userStatusListeners[id]
                },
                _invokeUserStatusChange(associated_uuids = []) {
                    for (var listener in this._userStatusListeners) {
                        if (listener) {
                            try {
                                this._userStatusListeners[listener](associated_uuids)
                            } catch (e) {
                                this.removeUserStatusListener(listener)
                            }
                        }
                    }
                },
                async search(term) {
                    let res = await Vue.prototype.$nam.requestAPI("/user/search", {
                        params: {
                            term
                        }
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.results
                }


            },
            post: {
                async getStream() {
                    let res = await Vue.prototype.$nam.requestAPI('/post/get_stream', {
                        params: {
                            // TODO Limit
                        },
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.stream
                },
                async getUserStream(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/post/get_user_stream', {
                        params: {
                            target: uuid
                        },
                        // TODO Limit
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.stream
                },
                async getPost(postid) {
                    let res = await Vue.prototype.$nam.requestAPI('/post/get_post', {
                        params: {
                            postid: postid
                        },
                        no_cache: false,
                        clear_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.post
                },
                async postStory(content, privacy) {
                    let res = null
                    if (privacy != null) {
                        res = await Vue.prototype.$nam.requestAPI('/post/new_post', {
                            params: {
                                type: 'story',
                                content: content,
                                privacy: privacy
                            }
                        })
                    } else {
                        res = await Vue.prototype.$nam.requestAPI('/post/new_post', {
                            params: {
                                type: 'story',
                                content: content
                            }
                        })
                    }

                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.postid

                },
                async deletePost(postid) {
                    let res = await Vue.prototype.$nam.requestAPI('/post/delete_post', {
                        params: {
                            postid: postid
                        }
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return true

                }
            },
            auth: {
                async checkEmail(email) {
                    let res = await Vue.prototype.$nam.requestAPI('/auth/check_email', {
                        authenticate: false,
                        params: {
                            email
                        }
                    })
                    if (res == null || res == undefined) {
                        throw new Error("Could not complete the request")
                    }
                    return res.exist
                },
                async requestOTP(email) {
                    let res = await Vue.prototype.$nam.requestAPI('/auth/send_email', {
                        authenticate: false,
                        params: {
                            email
                        }
                    })
                    if (res == null || res == undefined) {
                        throw new Error("Could not complete the request")
                    }
                    return res.sent
                },
                async checkOTP(email, otp) {
                    let res = await Vue.prototype.$nam.requestAPI('/auth/login/email', {
                        authenticate: false,
                        params: {
                            email,
                            otp
                        }
                    })
                    if (res == null || res == undefined) {
                        throw new Error("Could not complete the request")
                    }
                    Vue.prototype.$nam.user = res
                    Vue.prototype.$nam.storeCredentials()
                    Vue.prototype.$nam.useractions._invokeUserStatusChange([Vue.prototype.$nam.user.uuid])
                    return res
                },
                async register(email, otp) {
                    let res = await Vue.prototype.$nam.requestAPI('/auth/register', {
                        authenticate: false,
                        params: {
                            email,
                            otp
                        }
                    })
                    Vue.prototype.$nam.user = res
                    Vue.prototype.$nam.storeCredentials()
                    Vue.prototype.$nam.useractions._invokeUserStatusChange([Vue.prototype.$nam.user.uuid])
                    if (res == null || res == undefined) {
                        throw new Error("Could not complete the request")
                    }
                    return res
                },
                async checkScope(options) {
                    let res = await Vue.prototype.$nam.requestAPI('/auth/check_scope', options)
                    if (res == null || res == undefined) {
                        Vue.prototype.notification.failed("Could not verify your identity with our server", "You might have logged out, or your login status has expired, or you've been disconnected from the internet. Please try again or log in again.")
                        throw new Error('Could not complete the request')
                    }
                    return res.scope
                },
                async checkLoginStatus() {
                    try {
                        let res = await this.checkScope({
                            handle_error: false
                        })
                        if (res) {
                            console.log(res)
                            return true
                        }
                    } catch {
                        return false
                    }
                },
                async requestQR() {
                    let res = await Vue.prototype.$nam.requestAPI('/auth/generate_qr', {
                        authenticate: false
                    })
                    if (res == null || res == undefined) {
                        throw new Error("Could not complete the request")
                    }
                    return res.requestid
                },
                async logout() {
                    Vue.prototype.$nam.user = {}
                    localStorage.setItem("namuser", "{}")
                    Vue.prototype.$nam.useractions._invokeUserStatusChange([Vue.prototype.$nam.user.uuid])
                    // TODO: Request server to revoke token
                    return true
                },
                biometrics: biometrics.init(Vue, options)
            },
            notification: {
                success(subject, message) {
                    Vue.prototype.$vs.notification({
                        title: subject,
                        text: message,
                        sticky: true,
                        position: "top-right",
                        color: "success",
                        duration: 5000,
                        progress: 'auto'
                    })
                },
                failed(subject, message) {
                    Vue.prototype.$vs.notification({
                        title: subject,
                        text: message,
                        sticky: true,
                        position: "top-right",
                        color: "danger",
                        duration: 5000,
                        progress: 'auto'
                    })
                },
                warn(subject, message) {
                    Vue.prototype.$vs.notification({
                        title: subject,
                        text: message,
                        sticky: true,
                        position: "top-right",
                        color: "warning",
                        duration: 5000,
                        progress: 'auto'
                    })
                }
            },
            logging: {
                error(...options) {
                    console.error("[ERROR] ", ...options)
                }
            },
            utils: utils.init(Vue, options),
            app: {
                _app: null,
                registerApp(app) {
                    this._app = app
                    return true
                },
                async showGlobalError(title, message, ignorable) {
                    if (this._app == null) {
                        return false
                    }
                    this._app.error = true
                    this._app.error = true
                    this._app.status = message
                    this._app.title = title
                    this._app.ignorable = ignorable
                    this._app.loading = true
                    return true
                },
            }
        }
        Vue.mixin({
            created() {
                this.$nam.pullCredentials()
            },
            mounted() {
                this.$nam.watch(this)
            },
            data: () => ({

            })
        })
    }
}

export default {
    install: GenerateInstall()
}