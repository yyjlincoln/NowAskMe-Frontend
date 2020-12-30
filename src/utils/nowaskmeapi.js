// import Vue from 'vue'
import vuesax from "vuesax"
import axios from "axios"

vuesax // Vuesax must be installed.

export default {
    install(Vue, options) {
        options
        Vue.prototype.$nam = {
            server: "https://apis.nowask.me",
            user: {
                uuid: null,
                token: null,
                name: null,
                scope: null
            },
            ...JSON.parse(localStorage.getItem("namapi")),
            async requestAPI(route, { params = {}, authenticate = true, handle_error = true, max_retry = 2 } = {}) {
                if (authenticate == true) {
                    params.uuid = this.uuid
                    params.token = this.token
                    params.name = this.name
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
                        // Do something
                        this.notification.failed('Failed to complete the request ('+String(res.data.code)+')',res.data.message)
                        return undefined
                    } else {
                        return res.data
                    }
                } else {
                    return res.data
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
                    console.log(res)
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
                    console.log(res)
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
                    console.log(res)
                    if (res == null || res == undefined) {
                        throw new Error("Could not complete the request")
                    }
                    return res.sent
                },
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

            },
            data: () => ({

            })
        })
    }
}