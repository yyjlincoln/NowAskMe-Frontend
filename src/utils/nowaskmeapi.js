// import Vue from 'vue'
import vuesax from "vuesax"
import axios from "axios"


vuesax // Vuesax must be installed.

function GenerateInstall() {
    return function (Vue, options) {
        options
        Vue.prototype.$nam = {
            // server: "http://localhost:5000",
            version:'Major-1/1/2021',
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
            cache_max: 30000,
            initialized: false,
            async init(that) {
                if (this.initialized == true) {
                    return
                }
                // Allow only one initialization
                this.initialized = true
                this.that = that
                await this.pullCredentials()
                await this.useractions.getProfile({
                    handle_error: false
                })
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
                    '^/local/*'
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
                    no_cache: false
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
                    // Not handelling
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
            async requestAPI(route, { params = {}, authenticate = true, handle_error = true, max_retry = 2, no_cache = true } = {}) {
                let cache_key = ""
                let check_cache_time = 0

                if (!no_cache) {
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
                                await this.sleep(1000)
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

                } else {
                    // In case of a non-cached request, clear the cache 
                    // (because it will usually change some data and make the cache inaccurate)
                    // Examples: log in, follow, unfollow, etc.
                    this.cache = {}
                }

                this.pullCredentials()
                if (authenticate == true) {
                    params.uuid = this.user.uuid
                    params.token = this.user.token
                }
                let res = null
                try {
                    res = await axios.get(this.server + route, {
                        params
                    })
                } catch (e) {
                    this.logging.error(e)
                    this.notification.failed('Check your internet connection', 'We could not contact our server due to an internet issue (' + String(e) + ')')
                    if (handle_error == true && max_retry > 0) {
                        return await this.requestAPI(route, {
                            params,
                            authenticate,
                            handle_error,
                            max_retry: max_retry - 1
                        })
                    }
                    return undefined
                }

                if (!no_cache) {
                    // Record cache
                    if (res.data.code >= 0 && !no_cache) {
                        this.cache[cache_key] = {
                            time: check_cache_time,
                            content: res.data
                        }
                    }
                    // Record finish
                }


                if (handle_error == true) {
                    if (res.data.code < 0) {
                        if ([-107, -108, -109].includes(res.data.code) == true) {
                            this.that.$router.push('/get-started')
                            Vue.prototype.$nam.notification.failed('Please login again (' + String(res.data.code) + ')', res.data.message)
                            // [TODO] Add query so after auth it returns
                        } else if ([-110].includes(res.data.code) == true) {
                            this.that.$router.push('/get-started')
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
                    this._invokeUserStatusChange()
                    return res
                },
                async getUserProfile(uuid) {
                    let res = await Vue.prototype.$nam.requestAPI('/user/get_profile', {
                        params: { target: uuid },
                        no_cache: false
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
                        no_cache: false
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
                        no_cache: false
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    return res.followers
                },
                async getPinned() {
                    let res = await Vue.prototype.$nam.requestAPI('/user/get_pinned', {
                        no_cache: false
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
                        no_cache: false
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
                        no_cache: false
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
                        no_cache: false
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
                    this._invokeUserStatusChange()
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
                    this._invokeUserStatusChange()
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
                    this._invokeUserStatusChange()
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
                    this._invokeUserStatusChange()
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
                _invokeUserStatusChange() {
                    for (var listener in this._userStatusListeners) {
                        if (listener) {
                            try {
                                this._userStatusListeners[listener]()
                            } catch (e) {
                                this.removeUserStatusListener(listener)
                            }
                        }
                    }
                },


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
                    Vue.prototype.$nam.useractions._invokeUserStatusChange()
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
                    Vue.prototype.$nam.useractions._invokeUserStatusChange()
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
                async logout() {
                    Vue.prototype.$nam.user = {}
                    localStorage.setItem("namuser", "{}")
                    Vue.prototype.$nam.useractions._invokeUserStatusChange()
                    // TODO: Request server to revoke token
                    return true
                }
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