// import Vue from 'vue'
import vuesax from "vuesax"
import axios from "axios"

vuesax // Vuesax must be installed.

export default {
    install(Vue, options) {
        options
        Vue.prototype.$nam = {
            // server: "http://localhost:5000",
            server: "https://apis.nowask.me",
            user: {
                uuid: null,
                token: null,
                name: null,
                scope: null
            },
            storeCredentials() {
                localStorage.setItem("namuser", JSON.stringify(this.user))
            },
            pullCredentials() {
                this.user = {
                    ...this.user, ...JSON.parse(localStorage.getItem("namuser"))
                }

            },
            async requestAPI(route, { params = {}, authenticate = true, handle_error = true, max_retry = 2 } = {}) {
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
                        if (res.data.code in [-107, -108, -109]) {
                            this.notification.failed('Please login again (' + String(res.data.code) + ')', res.data.message)
                            Vue.prototype.$router.push({
                                name: 'login'
                            })
                        } else if (res.data.code in [-110]) {
                            Vue.prototype.$router.push({
                                name: 'login'
                            })
                            this.notification.failed('Sorry, something unexpected happened. Please try to login again (' + String(res.data.code) + ')', res.data.message)
                        } else if (res.data.code in [-111]) {
                            this.notification.failed("Access is denied.", "You don't have sufficient permission to complete this action. You are missing: " + String(res.data.scope))
                        }
                        // Do something
                        this.notification.failed('Failed to complete the request (' + String(res.data.code) + ')', res.data.message)
                        return undefined
                    } else {
                        return res.data
                    }
                } else {
                    return res.data
                }

            },
            useractions: {
                async getProfile() {
                    let res = await Vue.prototype.$nam.requestAPI('/user/get_profile')
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
                    Vue.prototype.$nam.user = res
                    Vue.prototype.$nam.storeCredentials()
                    if (res == null || res == undefined) {
                        throw new Error("Could not complete the request")
                    }
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
                async checkScope() {
                    let res = await Vue.prototype.$nam.requestAPI('/auth/check_scope')
                    if (res == null || res == undefined) {
                        Vue.prototype.notification.failed("Could not verify your identity with our server", "You might have logged out, or your login status has expired, or you've been disconnected from the internet. Please try again or log in again.")
                        throw new Error('Could not complete the request')
                    }
                    return res.scope
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
            data: () => ({

            })
        })
    }
}