import {Col, Row, Tabs} from "antd";
import './Home.css'
import type {TabsProps} from 'antd';
import {Design} from "./design/Design.tsx";
import {AnswerData} from "./table/AnswerData.tsx";
import {Star} from "./star/Star.tsx";
import {RecycleBin} from "../recycleBin/RecycleBin.tsx";
import {Operation} from "../../components/operation/Operation.tsx";
import {useQuestionnaireStore} from "../../stores/Questionnaire.ts";
import {QuestionnaireList} from "../../components/Questionnairelist/QuestionnaireList.tsx";

const CreateText = () => {
    return (
        <>
            <div style={{width: "100%", lineHeight: '20px', fontSize: "15px", textAlign: 'left',marginLeft:"3vw", marginTop: "1.5vh"}}>
                点击上方 + 创建第一个问卷
            </div>
        </>
    )
}

const Container = () => {
    const count = useQuestionnaireStore(state => state.count);
    const items: TabsProps['items'] = [
        {
            key: 'design',
            label: '问卷设计',
            children: (
                <Design/>
            ),
        },
        {
            key: 'data',
            label: '回答统计',
            children: (
                <AnswerData/>
            ),
        },
        {
            key: 'star',
            label: '星标问卷',
            children: (
                <Star/>
            ),
        },
        {
            key: 'RecyclingBins',
            label: '回收箱',
            children: (
                <RecycleBin/>
            ),
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <>

            <Row>
                <Col span={6}>
                    <Operation/>
                    {/*通过该用户当前所持有问卷数目来进行动态渲染;*/}
                    {count === 0 ? <CreateText/> : <QuestionnaireList/>}
                </Col>
                <Col span={18}>
                    <Tabs
                        onChange={onChange}
                        type="card"
                        items={items}
                    />
                </Col>
            </Row>
        </>
    )
}
export const Home = () => {


    return (
        <>
            <div style={{width: '100%', backgroundColor: "#fff"}}>
                <Container/>
            </div>
        </>
    )
}