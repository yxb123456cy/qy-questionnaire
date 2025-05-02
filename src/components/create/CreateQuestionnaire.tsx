import {Form, Input, message, Modal} from "antd"
import {useCreateModalState} from "../../stores/CreateModal.ts";
import {Questionnaire, useQuestionnaireList} from "../../stores/QuestionnaireList.ts";
import {
    defaultPublishUserID,
    defaultPublishUserName,
    defaultWallpaperUrl,
    generateRandomId
} from "../../constants/constant.c.ts";
import dayjs from "dayjs";
import {useQuestionnaireStore} from "../../stores/Questionnaire.ts";

const {TextArea} = Input;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 21},
};

export const CreateQuestionnaire = () => {
    const placeholder: string = "感谢您能抽时间参与本次问卷，您的意见和建议就是我们前行的动力!";
    const ModalTitle: string = "添加问卷";

    const [messageApi, contextHolder] = message.useMessage();
    const increase = useQuestionnaireStore(state => state.create);
    const addQuestionnaire = useQuestionnaireList(state => state.addQuestionnaire);
    const setCurrentlySelected = useQuestionnaireList(state => state.setCurrentlySelected);
    const setCurrentlySelectedObj = useQuestionnaireList(state => state.setCurrentlySelectedObj);
    const [form] = Form.useForm();
    const isModalOpen = useCreateModalState(state => state.isModalOpen);
    const setIsModalOpen = useCreateModalState(state => state.setIsModalOpen);

    const handleOk = () => {
        const questionnaireTitle: string = form.getFieldValue('title');
        //trim 去除两端空字符串;
        if (questionnaireTitle === undefined || questionnaireTitle === null || questionnaireTitle.trim() === '') {
            //提示;
            messageApi.error("问卷标题不能为空!")
                .then();
            return; // return 反而不会关闭对话框????
        }
        const questionnaireDescribe: string = form.getFieldValue('describe');
        const questionnaireID: number = generateRandomId(); //生成Questionnaire的ID;
        console.log(questionnaireID);
        const obj: Questionnaire = {
            Wallpaper: defaultWallpaperUrl,
            data: undefined, //暂时没有选项;
            describe: questionnaireDescribe,
            id: questionnaireID, //返回一个随机numberID;
            publishDate: dayjs().format(),//使用day.js获取当前时间;
            publishUserID: defaultPublishUserID,//先默认为1;
            publishUserName: defaultPublishUserName,
            published: false, //未发布问卷;
            star: false, //不是星标问卷
            title: questionnaireTitle,
        }
        setIsModalOpen(false);
        console.log('问卷标题:', questionnaireTitle); //打印问卷标题;
        console.log("问卷描述:", questionnaireDescribe) //打印问卷描述;
        addQuestionnaire(obj);//添加至Store;
        increase();  //添加问卷成功后 修改问卷数目 展示问卷列表;
        setCurrentlySelected(questionnaireID);     //然后设置当前问卷的选中项;
        form.resetFields();//表单清空
        console.log('当前选中项:', questionnaireID);
        //设置当前选中的问卷OBJ;
        setCurrentlySelectedObj();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        //取消也得进行清空;
        //表单清空
        form.resetFields();
        //当前选中项不变;
        //取消则不进行添加;
    };
    return (
        <>
            {contextHolder}
            <Modal title={ModalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   okText="确定"
                   cancelText="取消"
                   width={'800px'}
                   style={{fontSize: "xx-large"}}
            >
                <div style={{width: '100%', marginTop: '4vh'}}>
                    {/*表单区域;*/}
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        style={{maxWidth: 700}}
                    >
                        <Form.Item name="title" label="问卷标题" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="describe" label="问卷描述" rules={[{required: false}]}>
                            <TextArea rows={6}
                                      placeholder={placeholder}
                                      maxLength={128}/>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}