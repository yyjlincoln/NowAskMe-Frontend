import axios from "axios"

function GenerateInstall() {
    return function (Vue, options) {
        options
        Vue.prototype.$config = {
            server: "https://apis.nowask.me/config",
            configs: {

            },
            user: {},
            getConfig(config, defaults) {
                if (this.configs[config] !== null && this.configs[config] !== undefined) {
                    return this.configs[config]
                } else {
                    return defaults
                }
            },
            async updateConfig() {
                // Update user credentials
                try {
                    this.user = {
                        ...this.user, ...JSON.parse(localStorage.getItem("namuser"))
                    }
                } catch {
                    localStorage.setItem("namuser", "{}")
                }
                let res = null

                try{
                    res = await axios.get(this.server, {
                        uuid: this.user.uuid,
                        token: this.user.token,
                        version: Vue.prototype.$nam.version
                    })
                } catch(e){
                    console.error('Could not update config!')
                    return false
                }
                // Request the server
                
                if (res.data.code >= 0) {
                    if (res.data.code != 0) {
                        console.warn(res.data.message)
                    }
                    this.configs = res.data.config
                } else {
                    console.error("Failed to update config: server returned with code " + res.data.code)
                }
                return true
            }
        }
        // Vue.prototype.$config.updateConfig()
    }
}

export default {
    install: GenerateInstall()
}