// import Vue from 'vue'
import vuesax from "vuesax"
import axios from "axios"


vuesax // Vuesax must be installed.

function GenerateInstall() {
    return function (Vue, options) {
        options
        Vue.prototype.$nam = {
            // server: "http://localhost:5000",
            server: "https://apis.nowask.me",
            that: null,
            lastPath: '',
            user: {
                uuid: null,
                token: null,
                name: null,
                scope: null
            },
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
                await this.useractions.getProfile()

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
            async requestAPI(route, { params = {}, authenticate = true, handle_error = true, max_retry = 2 } = {}) {
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
                        }
                    })
                    if (res == undefined || res == null) {
                        throw new Error('Could not complete the request')
                    }
                    this.getProfile()
                    return res
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
                    localStorage.setItem("namuser", "{}")
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