import { createContext, useReducer, useMemo, useEffect } from "react";
import { ActionTypeEnum } from "./actionType";
import { getLocalStorage, saveLocalStorage } from "../../utils/localStorage";
import { LocalStorageKey } from "../../constants/local-storage-key";
export const AppContext = createContext<LocalState.TAppContext>({ 
    state: {}, 
    dispatch: () => { }, 
    setPlayerState: () => {}, 
    setIsConnected: () => {}, 
    setPlayerController: () => {},
    clearState: () => {},
});

const initState: LocalState.TLocalState = Object.keys(localStorage).reduce((obj, key) => {
    if (Object.values(LocalStorageKey).includes(key as LocalState.LocalStorageKey)) {
        return { ...obj, [key]: getLocalStorage(key as LocalState.LocalStorageKey) }
    }
    return { ...obj, connected: false}
}, {})

const reducer = (state: LocalState.TLocalState, action: LocalState.TActionDispatch) => {
    switch (action.type) {
        case ActionTypeEnum.SET_APP_STATE: 
            return { ...state, ...action.payload }
        
        case ActionTypeEnum.SET_LOCALSTATE: {
            const objectTypeState = Object.keys(action.payload).reduce((obj, key) => {
                if (typeof action.payload[key as LocalState.LocalStorageKey] === 'object') {
                    return {
                        ...obj,
                        [key]: { ...(state?.[key as LocalState.LocalStorageKey] as object || {}), ...(action.payload[key as LocalState.LocalStorageKey] as object) },
                    }
                }
                return obj
            }, {})
            
            const newLocalStorageState = {
                ...action.payload, 
                ...objectTypeState,    
            }
            
            const newState = {
                ...state, 
                ...newLocalStorageState,
            }
            
            Object.keys(newLocalStorageState).forEach((key) => {
                const keyCastType = key as LocalState.LocalStorageKey
                saveLocalStorage(keyCastType, newLocalStorageState[keyCastType]);
            })

            return newState
        }
        
        case ActionTypeEnum.UPDATE_STATE_FROM_LOCALSTORAGE:
            return action.payload
        
        case ActionTypeEnum.REMOVE_LOCALSTATE: {
            const oldKeyState = Object.keys(action.payload)
            return Object.keys(state).filter(key => !oldKeyState.includes(key)).reduce((obj, key) => {
                return { ...obj, [key]: state[key as LocalState.LocalStorageKey]}
            }, {})
        }
        
        default: 
            return state;
    }
}

const AppContextProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        function checkLocalStorage() {
            dispatch({
                type: ActionTypeEnum.UPDATE_STATE_FROM_LOCALSTORAGE,
                payload: Object.keys(localStorage).reduce((obj, key) => {
                    if (Object.values(LocalStorageKey).includes(key as LocalState.LocalStorageKey)) {
                        return { ...obj, [key]: getLocalStorage(key as LocalState.LocalStorageKey) }
                    }
                    return obj
                }, {})
            })
        }
        window.addEventListener('storage', checkLocalStorage)

        return () => {
            window.removeEventListener('storage', checkLocalStorage)
        }
    }, [])

    const setPlayerState = (payload: LocalState.TLocalState['player_state']) => {
        dispatch({type: ActionTypeEnum.SET_LOCALSTATE, payload: {[LocalStorageKey.PLAYER_STATE]: payload}})
    }

    const setIsConnected = (value: boolean) => {
        dispatch({type: ActionTypeEnum.SET_APP_STATE, payload: {connected: value}})
    }

    const setPlayerController = (player: Spotify.Player) => {
        dispatch({type: ActionTypeEnum.SET_APP_STATE, payload: {playerController: player}})
    }

    const clearState = () => {
        dispatch({type: ActionTypeEnum.REMOVE_LOCALSTATE, payload: state})
    }

    const contextValueProp = useMemo(() => ({ state, dispatch, setPlayerState, setIsConnected, setPlayerController, clearState }), [state])
    
    
    return (
        <AppContext.Provider value={contextValueProp}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider