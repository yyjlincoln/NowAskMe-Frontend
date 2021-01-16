export default {
    init(Vue) {
        return {
            Vue,
            timeFrom(timestamp, full = false) {
                let ts = Date.now() // current timestamp
                let tso = new Date(ts) // current timestamp as an object
                let td = (ts - timestamp) / 1000 // time difference in seconds
                let tx = new Date(timestamp) // timestamp as an object
                if (td < 0) {
                    full = true
                }
                if (!full) {
                    if (td < 60) {
                        return 'Just now'
                    }
                    else if (td / 60 <= 60) {
                        return Math.floor(td / 60) + ' minutes ago'
                    }
                    else if (td / 3600 <= 5) {
                        return Math.floor(td / 3600) + ' hours ago'
                    }
                    else if (td / 3600 <= 24 && tso.getDate() == tx.getDate()) {
                        return (tx.getHours() < 10 ? '0' : '') + tx.getHours() + ':' + (tx.getMinutes() < 10 ? '0' : '') + tx.getMinutes()
                    } else if (tx.getFullYear() == tso.getFullYear()) {
                        return tx.getDate() + '/' + (tx.getMonth() + 1) + ' ' + (tx.getHours() < 10 ? '0' : '') + tx.getHours() + ':' + (tx.getMinutes() < 10 ? '0' : '') + tx.getMinutes()
                    } else {
                        return tx.getDate() + '/' + (tx.getMonth() + 1) + '/' + tx.getFullYear() + ' ' + (tx.getHours() < 10 ? '0' : '') + tx.getHours() + ':' + (tx.getMinutes() < 10 ? '0' : '') + tx.getMinutes()
                    }
                } else {
                    return tx.getDate() + '/' + (tx.getMonth() + 1) + '/' + tx.getFullYear() + ' ' + (tx.getHours() < 10 ? '0' : '') + tx.getHours() + ':' + (tx.getMinutes() < 10 ? '0' : '') + tx.getMinutes()
                }
            }
        }
    }
}