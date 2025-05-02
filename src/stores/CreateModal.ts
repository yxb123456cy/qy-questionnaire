import {create} from 'zustand'

interface CreateModalState {
    isModalOpen: boolean
    setIsModalOpen: (ops: boolean) => void
}

export const useCreateModalState = create<CreateModalState>()(
    (set) => ({
        isModalOpen: false,//创建问卷对话框初始状态 ;默认为false
        setIsModalOpen: (ops: boolean) => set(() => ({isModalOpen: ops})),
    }))