declare namespace LocalState {

    type ActionType = import('./contexts/AppContext/actionType').ActionTypeEnum
    type LocalStorageKey = import('./constants/local-storage-key').LocalStorageKey

    interface TLocalState extends Partial<Record<LocalStorageKey, string>>  {
        player_state?: Partial<Spotify.PlaybackState> & {
            deviceId?: string,
            // isPlaying?: boolean,
            current_track?: SPOTIFY_API.TSearchItems,
        },
        connected?: boolean,
        playerController?: Spotify.Player,
        search_items?: SPOTIFY_API.TSearchItems[],
    }

    type TActionDispatch = {
        type: ActionType,
        payload: TLocalState,
    }

    type TAppContext = {
        state: TLocalState,
        dispatch: (action: TActionDispatch) => void,
        setPlayerState: (payload: LocalState.TLocalState['player_state']) => void,
        setIsConnected: (value: boolean) => void,
        setPlayerController: (player: Spotify.Player) => void,
        clearState: () => void,
    }
}

declare namespace AUTH {
    type TAuthParam = {
        client_id: string,
        response_type: string,
        redirect_uri: string,
        state?: string,
        scope?: string,
        show_dialog?: string,
    }
    type TRefreshTokenBody = {
        refreshToken: string,
    }

    type TLoginBody = {
        code: string,
    }

    type TLoginResponse = {
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
    }
}

type TRoutes = {
    path: string,
    component: React.ReactNode,
    route?: TRoutes[]
}

declare namespace SPOTIFY_API {
    
    type TSearchParam = {
        q: string,
        type: string,
        market?: string,
        limit?: number,
        offset?: number,
        include_external?: string,
    }

    type TSearchResponse = {
        tracks: {
            href: string,
            limit: number,
            next: string | null,
            offset: number,
            previous: string | null,
            total: number,
            items: TSearchItems[]
        }
    }

    type TSearchItems = {
        href: string,
        id: string,
        is_playable: boolean,
        available_markets: string[],
        name: string,
        type: string,
        uri: string,
        preview_url: string,
        album: {
            id: string,
            images: TAlbumImages[],
            name: string,
            uri: string,
            external_urls: TSpotifyExtenalUrl
        },
        artists: TArtists[],
    }
    
    type TArtists = {
        name: string,
        external_urls: TSpotifyExtenalUrl,
        id: string,
        images: TAlbumImages[],
        uri: string,
        type: string,
    }

    type TAlbumImages = {
        url: string,
        height: number | null,
        width: number | null
    }

    type TSpotifyExtenalUrl = {
        spotify: string,
    }

    type TTrackPlayerPayload = {
        context_uri?: string,
        uris?: string[],
        offset?: {
            posision?: number,
            uri?:string,
        },
        position_ms?: number,
    }

    type TDeviceId = {
        device_id: string,
    }
    type TPositionPayload = {
        position_ms: number,
    }
}