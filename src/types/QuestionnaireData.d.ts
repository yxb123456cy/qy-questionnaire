interface BaseQuestion {
    id: number, //题目ID;
}

interface QuestionOp {
    id: number,//选项ID;
    text: string,
}

interface SingleQuestion extends BaseQuestion {
    //选项列表;
    ops: QuestionOp[],
}

interface MultipleQuestion extends BaseQuestion {
    //选项列表;
    ops: QuestionOp[],
}

interface FillQuestion extends BaseQuestion {
    row: number, //行数;
}

export interface QuestionnaireData {
    require: boolean, //是否必须选择;
    title: string, //题目标题
    type: string, //题目类型 单选 多选 填空三选一
    id: number,//该题目的ID;
    //所属问卷ID;
    QuestionnaireID?: number,
    //所属问卷标题;
    QuestionnaireName?: string
    SingleQuestions?: SingleQuestion[], //单选题列表 可选 根据Type来动态拥有
    MultipleQuestions?: MultipleQuestion[], //多选题列表 可选 也是根据Type来动态拥有
    FillQuestions?: FillQuestion, //判断题 可选 为单个对象 包含ID与填空行数 也是根据Type来动态拥有

}
