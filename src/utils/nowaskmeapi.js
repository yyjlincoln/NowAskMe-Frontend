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
            async requestAPI(route, { params = {}, authenticate = true, handle_error = true } = {}) {
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
                    return
                }
                if (handle_error == true) {
                    if (res.data.code < 0) {
                        // Do something
                    }
                } else {
                    return res.data
                }

            },
            auth: {
                async checkEmail(email) {
                    return await Vue.prototype.$nam.requestAPI('/auth/check_email', {
                        authenticate: false,
                        params: {
                            email
                        }
                    }).exist
                },
            },
            notification: {
                success(subject, message) {
                    Vue.prototype.$vs.notification({
                        title: subject,
                        text: message,
                        sticky: true,
                        position: "top-right",
                        color: "green",
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