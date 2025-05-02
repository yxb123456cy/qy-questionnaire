import {create} from 'zustand'

interface QuestionnaireState {
    active: number | null,//当前选中项 问卷ID;
    count: number, //当前问卷数目
    //创建一次问卷就加一;
    create: () => void,
    //remove方法; 删除当前选中项并将其添加到回收箱; 回收箱状态存储问卷的ID;
    remove: () => void,
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
    (set) => ({
        count: 0,//questionnaire数量 假定为问卷数;
        active: null,
        create: () => set(
            (state) => ({count: state.count + 1})
        ),
        remove: () => set(
            (state) => ({count: state.count - 1})
        ),
    }))