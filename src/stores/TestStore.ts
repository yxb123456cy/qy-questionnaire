import {create} from 'zustand'

interface BearState {
    bears: number
    increase: (by: number) => void
}

export const useBearStore = create<BearState>()(
    (set) => ({
        bears: 0,//questionnaire 假定为问卷数;
        increase: (by) => set((state) => ({bears: state.bears + by})),
    }))