interface StorageObj {
    setKey: (key: string, val: string) => void;
    getKey: (key: string, defaultVal?) => void;
    sessionSetKey: (key: string, val: string) => void;
    sessionGetKey: (key: string, defaultVal?) => void;
}

const initStorage = (name) => {
    const adminSetting = localStorage.getItem(name)
    if (adminSetting && adminSetting !== 'undefined') {
        return JSON.parse(adminSetting)
    }
    return false
}
const setStorage = (name, data) => {
    const dataJson = JSON.stringify(data)
    localStorage.setItem(name, dataJson)
}
const storage: StorageObj = {
    setKey: (key, val) => {
        const adminSetting = initStorage('_admin_setting')
        let data = {}
        if (adminSetting) {
            data = {
                ...adminSetting
            }
        }
        data[key] = val
        setStorage('_admin_setting', data)
    },
    getKey: (key, defaultVal) => {
        const adminSetting = initStorage('_admin_setting')
        if (adminSetting && adminSetting[key]) {
            return adminSetting[key]
        }
        return defaultVal
    },
    sessionSetKey: (name, key) => {
        if(!key){
            sessionStorage.removeItem(name)
            return
        }
        sessionStorage.setItem(name, key)
    },
    sessionGetKey: (name, defaultVal) => {
        const val = sessionStorage.getItem(name)
        return val ? val : defaultVal

    }
}
export default storage
