import { ResponseError, extend } from "umi-request";
import { clearLocalStorage, getLocalStorage } from "../../utils/localStorage";
import { LocalStorageKey } from "../../constants/local-storage-key";
import path from "../../constants/path";

const errorHandler = (error: ResponseError) => {
    if (!error?.response) {
        switch (error.response.status) {
            case 400:
                return history.pushState({}, '', path.LOGIN_PATH)

            case 403:
                clearLocalStorage()
                return history.pushState({}, '', path.LOGIN_PATH)
            
            case 429:
                console.log('The app has exceeded its rate limits.')
                break;
            
            default:
                return Promise.reject({
                    meta: {
                        statusCode: 503,
                        message: 'Mạng không khả dụng!',
                        error: 'Mạng không khả dụng!',
                    },
                    result: {
                        data: null,
                    },
                });
        }
        
    } else {
        return history.pushState({}, '', path.LOGIN_PATH)
    }
};

const request = extend({
    prefix: import.meta.env.VITE_SPOTIFY_API,
    errorHandler,
});


request.interceptors.request.use(
    (url: string, options) => {
        const token = getLocalStorage(LocalStorageKey.ACCESS_TOKEN)

        options.headers = {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'Content-Type': 'application/json',
            ...options.headers,
        };

        return {
            url,
            options,
        };
    },
    { global: false },
)

export default request