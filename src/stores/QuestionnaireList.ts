import {create} from 'zustand'
import {QuestionnaireData} from "../types/QuestionnaireData";
import dayjs from "dayjs";

//问卷类型接口;
export interface Questionnaire {
    id: number, //问卷ID
    title: string, //问卷标题;
    describe?: string, //问卷描述 可选项;
    Wallpaper?: string, //问卷壁纸 可选项;
    data?: QuestionnaireData[], //可选项;
    star?: boolean, //是否星标问卷（也就是是否收藏该问卷） 可选项;
    publishUserID: number,  //发布该问卷的用户ID;
    publishUserName: string, //发布该问卷的用户名称;
    publishDate?: string  //该问卷的发布时间 可选项;
    published: boolean,
}


interface QuestionnaireList {
    //state（状态）:
    authorId: number, //登录该问卷喵的用户ID;
    questionnaireList: Questionnaire[], //该用户的所有问卷列表;
    recyclingBins: Questionnaire[], //回收问卷列表;
    stars: Questionnaire[], //星标问卷列表;
    currentlySelected: number | null,//当前选中问卷项;
    publishedList: Questionnaire [], //已经发布的问卷列表,
    //当前选中的问卷;
    currentlySelectedObj: Questionnaire | null | undefined,


    //Functions(方法):
    setCurrentlySelectedObj: () => void,
    setCurrentlyQuestionnaire: (QuestionnaireId: number) => void,
    //设置当前选中问卷项ID;
    setCurrentlySelected: (QuestionnaireId: number) => void,

    //新增问卷至questionnaireList;
    addQuestionnaire: (newQuestionnaire: Omit<Questionnaire, | 'publishUserID' | 'publishUserName' | 'published' | 'publishDate'>) => void
    //删除问卷-> questionnaireList中删除对应问卷,recyclingBins中新增对应被删除的问卷;软删除;
    deleteQuestionnaire: (QuestionnaireId: number) => void,
    //将问卷设为星标问卷->将问卷添加至星标问卷列表中;
    starQuestionnaire: (QuestionnaireId: number) => void,
    //将问卷发布->将问卷添加至发布问卷列表中;
    publishQuestionnaire: (QuestionnaireId: number) => void,
    // 从回收站恢复问卷
    restoreFromRecycleBin: (QuestionnaireId: number) => void,
    // 彻底删除问卷（从回收站中）
    permanentlyDeleteQuestionnaire: (QuestionnaireId: number) => void,


    // 问卷题目管理方法
    //新增问卷题目;
    addQuestionnaireData: (questionnaireId: number, newData: QuestionnaireData) => void;
    //更新问卷题目;
    updateQuestionnaireData: (questionnaireId: number, updatedData: QuestionnaireData) => void;
    //删除问卷题目;
    deleteQuestionnaireData: (questionnaireId: number, dataId: number) => void;
    //获取问卷题目数组（列表）
    getQuestionnaireDataList: (questionnaireId: number) => QuestionnaireData[] | undefined;
}


export const useQuestionnaireList = create<QuestionnaireList>()(
    (set, get) => ({
        currentlySelectedObj: null,
        authorId: 1,// 暂时设置为1;
        questionnaireList: [],
        recyclingBins: [], //回收箱 存储被删除的问卷;
        currentlySelected: null, //当前选中问卷项;
        stars: [], //星标问卷列表;
        publishedList: [],//已经发布的问卷列表;
        // 设置当前选中问卷项
        setCurrentlySelected: (QuestionnaireId: number): void =>

            set({currentlySelected: QuestionnaireId}),

        // 新增问卷至questionnaireList
        addQuestionnaire: (newQuestionnaire) =>
            set((state) => {
                const createdQuestionnaire: Questionnaire = {
                    ...newQuestionnaire,
                    publishUserID: state.authorId,
                    publishUserName: '轻叶', // 这里应根据实际用户系统获取
                    published: false,
                    publishDate: dayjs().format(),
                };
                return {
                    questionnaireList: [...state.questionnaireList, createdQuestionnaire]
                }
            }),
        // 删除问卷
        deleteQuestionnaire: (QuestionnaireId) =>
            set((state) => {
                const questionnaireToDelete = state.questionnaireList.find(q => q.id === QuestionnaireId)
                return {
                    questionnaireList: state.questionnaireList.filter(q => q.id !== QuestionnaireId),
                    recyclingBins: questionnaireToDelete
                        ? [...state.recyclingBins, questionnaireToDelete]
                        : state.recyclingBins
                }
            }),
        // 设为星标问卷
        starQuestionnaire: (QuestionnaireId) =>
            set((state) => {
                const updatedList = state.questionnaireList.map(q =>
                    q.id === QuestionnaireId
                        ? {...q, star: true}
                        : q
                )
                const starred = updatedList.find(q => q.id === QuestionnaireId)

                return {
                    questionnaireList: updatedList,
                    stars: starred && !state.stars.some(s => s.id === QuestionnaireId)
                        ? [...state.stars, starred]
                        : state.stars
                }
            }),

        publishQuestionnaire: (QuestionnaireId) => set(
            (state) => {
                const updatedList = state.questionnaireList.map(q =>
                    q.id === QuestionnaireId ? {...q, published: true} : q);
                const res = updatedList.find(q => q.id === QuestionnaireId)

                return {
                    //重新设置questionnaireList
                    questionnaireList: updatedList,
                    //新增到发布列表;
                    stars: res && !state.publishedList.some(s => s.id === QuestionnaireId)
                        ? [...state.publishedList, res]
                        : state.publishedList
                }
            }),

        // 从回收站恢复问卷
        restoreFromRecycleBin: (QuestionnaireId) =>
            set((state) => {
                //使用find方法寻找回收列表中 问卷ID为形参的问卷;
                const questionnaireToRestore = state.recyclingBins.find(q => q.id === QuestionnaireId);

                return {
                    recyclingBins: state.recyclingBins.filter(q => q.id !== QuestionnaireId),
                    //如果找到的questionnaireToRestore不为空 则恢复至questionnaireList末尾; 如果没有找到 就原questionnaireList不变;
                    questionnaireList:
                        questionnaireToRestore ? [...state.questionnaireList, questionnaireToRestore] : state.questionnaireList
                }
            }),

        // 彻底删除问卷
        permanentlyDeleteQuestionnaire: (QuestionnaireId) =>
            set((state) => ({
                //除掉形参ID对象的问卷 并返回剩余问卷;
                recyclingBins: state.recyclingBins.filter(q => q.id !== QuestionnaireId)
            })),
        setCurrentlySelectedObj: () =>
            set((state) => ({
                //从questionnaireList中find 查找出id 为currentlySelected 选中项ID;
                currentlySelectedObj: state.questionnaireList.find(e => e.id === state.currentlySelected),
            })),
        setCurrentlyQuestionnaire: (QuestionnaireId) =>
            set((state) => ({
                //从questionnaireList中find 查找出id 为currentlySelected 选中项ID;
                currentlySelectedObj: state.questionnaireList.find(e => e.id === QuestionnaireId),
            })),

        addQuestionnaireData: (questionnaireId, newData) =>
            set((state) => ({
                questionnaireList: state.questionnaireList.map(q => {
                    if (q.id === questionnaireId) {
                        return {
                            ...q,
                            data: [...(q.data || []), newData]
                        };
                    }
                    return q;
                })
            })),
        updateQuestionnaireData: (questionnaireId, updatedData) =>
            set((state) => ({
                questionnaireList: state.questionnaireList.map(q => {
                    if (q.id === questionnaireId && q.data) {
                        const index = q.data.findIndex(d => d.id === updatedData.id);
                        if (index !== -1) {
                            const newDataArray = [...q.data];
                            newDataArray[index] = updatedData;
                            return {
                                ...q,
                                data: newDataArray
                            };
                        }
                    }
                    return q;
                })
            })),
        deleteQuestionnaireData: (questionnaireId, dataId) =>
            set((state) => ({
                questionnaireList: state.questionnaireList.map(q => {
                    if (q.id === questionnaireId && q.data) {
                        return {
                            ...q,
                            data: q.data.filter(d => d.id !== dataId)
                        };
                    }
                    return q;
                })
            })),
        getQuestionnaireDataList: (id) => {
            const questionnaire = get().questionnaireList.find(q => q.id === id);
            return questionnaire?.data || [];
        },
    }))