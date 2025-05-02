/**
 * 添加问卷的选项组件; 在Design组件中进行组件传参;
 * @constructor
 */
import './css/CreateOps.css'
import {Questionnaire, useQuestionnaireList} from "../../stores/QuestionnaireList.ts";
import {Button, Checkbox, Form, Input, InputNumber, InputNumberProps, message, Modal, Select, Space, Tag} from "antd";
import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {generateRandomId} from "../../constants/constant.c.ts";
import {QuestionnaireData} from "../../types/QuestionnaireData";


const {TextArea} = Input;
const title: string = "添加题目";

type FieldType = {
    type?: string;          // 题目类型（SingleQuestion / MultipleQuestion / FillQuestion）
    title?: string;         // 题目标题
    require?: boolean;      // 是否必填
    answer?: string;        // 填空题答案
    rows?: number;          // 填空题行数
    singleOptions?: Array<{ text: string, id: number }>; // 单选题选项
    multipleOptions?: Array<{ text: string, id: number }>; // 多选题选项
};

/**
 * 组件Props;
 */
interface CreateOpsType {
    id: number | undefined, //问卷ID
    obj: Questionnaire | null | undefined,  //当前选中问卷对象;
    isModalOpen: boolean, //对话框是否打开
    setIsModalOpen: (v: boolean) => void, //设置对话框打开状态

}

export const CreateOps: React.FC<CreateOpsType> = ({id, obj, isModalOpen, setIsModalOpen}) => {
    const [messageApi, contextHolder] = message.useMessage();
    //根据FieldType保存题目并添加到当前问卷选项中;
    const setCurrentlySelectedObj = useQuestionnaireList(state => state.setCurrentlySelectedObj);
    const addQuestionnaireData = useQuestionnaireList(state => state.addQuestionnaireData);
    const [form] = Form.useForm();
    // 表单提交
    const handleOk = () => {
        form.validateFields().then(values => {
            console.log('保存题目:', values);//打印题目列表;
            setIsModalOpen(false);
            const data: QuestionnaireData = {
                require: values.require,
                title: values.title,
                type: values.type,
                FillQuestions: {id: generateRandomId(), row: Number(values.rows)},
                MultipleQuestions: values.multipleOptions,
                QuestionnaireID: id,
                QuestionnaireName: obj?.title,
                SingleQuestions: values.singleOptions,
                id: generateRandomId()//生成题目ID;
            }
            if (typeof id === "number") {
                console.log("生成的data:", data);
                //保存;
                addQuestionnaireData(id, data);
                messageApi.success("保存到state成功").then(r => {
                    console.log(r);
                })
                //set一遍objID;
                setCurrentlySelectedObj();
            } else {
                console.log("保存到state失败");
                messageApi.error("保存到state失败").then(r => {
                    console.log(r);
                })
            }
            form.resetFields();
            setTextAreaRows(1);
            //设置为单选;
            setType("SingleQuestion");
        }).catch(error => {
            console.error('表单验证失败:', error);
        });
    };
    // 表单取消
    const handleCancel = () => {
        setIsModalOpen(false);
        //重置表单选项;
        form.resetFields();
        setTextAreaRows(1);
        //设置为单选;
        setType("SingleQuestion");
    };

    const [textAreaRows, setTextAreaRows] = useState(1);

    const [type, setType] = useState('SingleQuestion');

    // 处理行数变化
    const handleRowChange: InputNumberProps['onChange'] = (value) => {
        console.log('changed', value);
        setTextAreaRows(Number(value));
    };
    // 处理题型选择;
    const handleTypeChange = (value: string) => {
        console.log(`selected ${value}`);
        setType(value);
    };

    return (
        <>
            {contextHolder}
            <div style={{width: "100%"}}>
                <Modal width={'800px'} title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                       okText={'完成'}
                       cancelText={'取消'}
                >
                    <Tag color={'processing'}>问卷ID:{id}</Tag>
                    <Tag color={'error'}>
                        问卷标题:{obj?.title}
                    </Tag>
                    <div className={'CreateOps-form'}>
                        <Form
                            form={form}
                            name="question-form"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            style={{maxWidth: 600}}
                            initialValues={{require: false, rows: 1, type: "SingleQuestion"}}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType> name={'type'} label={'题目类型'}>
                                <Select
                                    style={{width: 240}}
                                    onChange={handleTypeChange}
                                    options={[
                                        {value: 'SingleQuestion', label: '单选题'},
                                        {value: 'MultipleQuestion', label: '多选题'},
                                        {value: 'FillQuestion', label: '填空题'},
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item<FieldType> name="require" valuePropName="checked" label={'是否必填'}>
                                <Checkbox>必填</Checkbox>
                            </Form.Item>
                            <Form.Item<FieldType> name="title" label={'题目标题'}
                                                  rules={[{required: true, message: "请输入题目标题"}]}>
                                <Input placeholder="请输入标题"/>
                            </Form.Item>

                            {type === "FillQuestion" ?
                                <div>
                                    <Form.Item<FieldType> name="answer" label={'填空'}>
                                        <TextArea rows={textAreaRows}/>
                                    </Form.Item>
                                    <Form.Item<FieldType> name="rows" label={'行数'}>
                                        <InputNumber min={1} max={10} onChange={handleRowChange}/>
                                    </Form.Item>
                                </div> :
                                <div>
                                    {/*控制选项个数*/}
                                    <Form.Item label="选项设置" style={{marginLeft: "0px"}}>
                                        <Form.List

                                            name={type === "SingleQuestion" ? "singleOptions" : "multipleOptions"}>
                                            {(fields, {add, remove}) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Space key={field.key} align="baseline">
                                                            <Form.Item
                                                                {...field}
                                                                label={`选项 ${index + 1}`}
                                                                name={[field.name, "text"]}
                                                                rules={[{required: true, message: "请输入选项内容"}]}
                                                            >
                                                                <Input placeholder="选项内容" style={{width: "200px"}}/>
                                                            </Form.Item>
                                                            <Button type="dashed" onClick={() => remove(field.name)}
                                                                    danger>
                                                                删除
                                                            </Button>
                                                        </Space>
                                                    ))}
                                                    <Button type="dashed" onClick={() =>
                                                        add({text: '', id: generateRandomId()})
                                                    } block icon={<PlusOutlined/>}>
                                                        新增选项
                                                    </Button>
                                                </>
                                            )}
                                        </Form.List>
                                    </Form.Item>
                                </div>
                            }
                        </Form>
                    </div>
                </Modal>
            </div>
        </>
    )
}