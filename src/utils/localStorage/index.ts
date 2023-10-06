
export const saveLocalStorage = (key: LocalState.LocalStorageKey, value: string | object | undefined) => {
    try {
        if ( typeof value ===  'object' ) {
            const jsonString = JSON.stringify(value)
            return localStorage.setItem(key, jsonString)
        }
        if (value !== undefined) return localStorage.setItem(key, value);
        else return localStorage.removeItem(key)
    } catch (error) {
        return localStorage.removeItem(key)
    }
}

export const getLocalStorage = (key: LocalState.LocalStorageKey) => {
    try {
        return JSON.parse(localStorage.getItem(key) ?? '{}')
    } catch (error) {
        return localStorage.getItem(key)
    }
}

export const clearLocalStorage = () => {
    localStorage.clear();
}