import {useQuestionnaireStore} from "../../../stores/Questionnaire.ts";
import {useQuestionnaireList} from "../../../stores/QuestionnaireList.ts";
import React, {useEffect, useState} from "react";
import './css/Design.css'
import {Button} from "antd";
import { QuestionnaireData} from "../../../types/QuestionnaireData";
import {CreateOps} from "../../../components/create/CreateOps.tsx";

/**
 * 定义组件类型;
 */
interface ShowQuestionnaireDataInterface {
    data: QuestionnaireData[] | undefined | null;
}

/**
 * Props 组件传参;
 * @param data
 * @constructor
 */
const ShowQuestionnaireData: React.FC<ShowQuestionnaireDataInterface> = ({data}) => {
    return(
        <div className={'QuestionnaireData-list-content'}>
            {  data?.map((e)=>(
                <div>{e.id}</div>
            ))}
        </div>

    )
}

export const Design = () => {
    const [createOpsShow, setCreateOpsShow] = useState(false);
    const count = useQuestionnaireStore(state => state.count);
    const currentlySelectedObj = useQuestionnaireList(state => state.currentlySelectedObj);
    // const [spinning, setSpinning] = useState(true);
    const getQuestionnaireDataList = useQuestionnaireList(state => state.getQuestionnaireDataList);
    const openCreateOpsCard = () => {
        setCreateOpsShow(true);
    }
    useEffect(() => {
        console.log("重新渲染");
        console.log("当前问卷数:", count);
        console.log(currentlySelectedObj);
        setCreateOpsShow(false);
    }, [count, currentlySelectedObj]);
    return (
        <>
            {/*Zustand 跨组件通信测试成功*/}
            {/*<Spin tip="Loading..." spinning={spinning}>*/}
            {/*    {spinning ? <Alert*/}
            {/*        message="加载中---"*/}
            {/*        description="正在加载问卷详细信息"*/}
            {/*        type="info"*/}
            {/*    /> : ''}*/}
            {/*</Spin>*/}
            {currentlySelectedObj ? <div className={'Design'}>
                    <div className={'Design-title'}>
                        <h2>{currentlySelectedObj?.title}</h2>
                    </div>
                    <div className={'Design-top'}>
                        {currentlySelectedObj?.describe}
                    </div>
                    {/*展示问卷选项是可选的 根据该问卷是否存在选项来显示*/}
                    {currentlySelectedObj?.data ?
                        <ShowQuestionnaireData data={getQuestionnaireDataList(currentlySelectedObj.id)}/> : ''}
                    <div className={'Design-btn'}>
                        {/*//添加题目是一直存在的*/}
                        {/*添加题目后修改该选中问卷obj的data*/}
                        <Button style={{width: "25%", padding: "18px", marginTop: "2vh"}} type={'default'}
                                onClick={openCreateOpsCard}
                        >添加题目</Button>
                    </div>
                    <CreateOps isModalOpen={createOpsShow} id={currentlySelectedObj?.id} obj={currentlySelectedObj}
                               setIsModalOpen={setCreateOpsShow}/>
                </div>
                :
                '请先选择问卷'
            }


        </>
    )
}