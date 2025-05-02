import {create} from 'zustand'
import {localCache} from "../utils/Cache.ts";

interface UserState {
    isLogin: boolean,
    token: string,
    username: string,
    password: string,
    setLoginState: (login: boolean) => void,
    saveTokenValue: (tokenName: string, tokenValue: string) => void,
    saveTokenValueToCache: () => void,
}

export const useUserStore = create<UserState>()(
    (set) => ({
        isLogin: false,
        token: "",
        username: "",
        password: "",
        setLoginState: (login) => set(() => ({
            isLogin: login
        })),
        saveTokenValue: (tokenName, tokenValue) => set(() => ({
            token: tokenName,
            tokenValue: tokenValue,
        })),
        saveTokenValueToCache: () => {
            const state = useUserStore.getState();
            localCache.setCache("token", state.token);
        }
    }))