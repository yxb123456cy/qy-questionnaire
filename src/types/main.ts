import {QuestionnaireData} from "./QuestionnaireData";

const list: QuestionnaireData = {
    ////填空题列表;
    FillQuestions: [
        {
            row: 4, //4行 控制 输入框组件的行数;
            id: 1, //该填空题ID
            title: "你想找怎么样的男朋友",
            require: true, //必填项;
        }
    ],

    //多选题列表;
    MultipleQuestions: [
        {
            ops: [
                {
                    id: 1,
                    text: "1次"
                },
                {
                    id: 2,
                    text: "2次"
                },
                {
                    id: 3,
                    text: "3次"
                },
                {
                    id: 4,
                    text: "4次"
                }
            ],
            id: 1,
            title: "你谈过几次恋爱", //
            require: true, //必选;
        }
    ], //多选题列表;
    QuestionnaireID: 1, //问卷ID
    QuestionnaireName: "大学生恋爱观念调查",
    //单选题列表;
    SingleQuestions: [
        {
            ops: [
                {
                    id: 1,
                    text: "谈过"
                },
                {
                    id: 2,
                    text: "没有谈过"
                }
            ],
            id: 1,
            title: "你是否谈过恋爱",
            require: true,//必选;
        }
    ]

}


console.log(JSON.stringify(list));