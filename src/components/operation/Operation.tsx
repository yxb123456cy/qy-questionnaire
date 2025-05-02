import './css/Operation.css'
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined, PlayCircleOutlined,
    PlusCircleOutlined,
    StarOutlined,
    ThunderboltOutlined
} from "@ant-design/icons";
import {Button, Tooltip} from "antd";
import {ReactNode} from "react";
import {TooltipPlacement} from "antd/es/tooltip";
import type {ButtonShape, ButtonType} from "antd/es/button/buttonHelpers";
import type {SizeType} from "antd/es/config-provider/SizeContext";
import {useQuestionnaireStore} from "../../stores/Questionnaire.ts";
import {useCreateModalState} from "../../stores/CreateModal.ts";
import {CreateQuestionnaire} from "../create/CreateQuestionnaire.tsx";


interface TooltipBtn {
    buttonShape: ButtonShape,
    buttonType: ButtonType,
    event?: () => void,
    icon: ReactNode,
    placement: TooltipPlacement,
    size: SizeType,
    title: string,
    show?: boolean,
}

export const Operation = () => {
    //将新增问卷对话框打开;
    const setIsModalOpen = useCreateModalState(state => state.setIsModalOpen);
    const QuestionnaireCount = useQuestionnaireStore(state => state.count);
    //const createQuestionnaire = useQuestionnaireStore(state => state.create);
    const tooltipBtnList: Array<TooltipBtn> = [
        {
            show: false,
            placement: 'bottom',
            title: '创建问卷',
            buttonType: 'link',
            buttonShape: 'circle',
            icon: <PlusCircleOutlined/>,
            size: 'large',
            event: () => {
                //参数从store中获取 使用zustand;
                //创建问卷函数;
                //打开问卷对话框;
                console.log("点击了创建问卷");
                // createQuestionnaire();
                setIsModalOpen(true);
            }
        },
        {
            show: QuestionnaireCount == 0,
            placement: 'bottom',
            title: '修改问卷',
            buttonType: 'link',
            buttonShape: 'circle',
            icon: <EditOutlined/>,
            size: 'large',
            event: () => {
                //打开修改问卷对话框;
                //修改问卷方法;
                console.log("点击了修改问卷");
            }
        },
        {
            show: QuestionnaireCount == 0,
            placement: 'bottom',
            title: '发布问卷',
            buttonType: 'link',
            buttonShape: 'circle',
            //icon需要根据当前选中的问卷的是否发布状态来决定;
            icon: <PlayCircleOutlined/>,
            size: 'large',
            event: () => {
                //调用发布问卷方法;
                //发布问卷方法;
                console.log("点击了发布问卷");
            }
        },
        {
            show: QuestionnaireCount == 0,
            placement: 'bottom',
            title: '预览问卷',
            buttonType: 'link',
            buttonShape: 'circle',
            icon: <EyeOutlined/>,
            size: 'large',
            event: () => {
                //调用预览问卷方法;
                //预览问卷方法;
                console.log("点击了预览问卷");
            }
        },
        {
            show: QuestionnaireCount == 0,
            placement: 'bottom',
            title: '分享问卷',
            buttonType: 'link',
            buttonShape: 'circle',
            icon: <ThunderboltOutlined/>,
            size: 'large',
            event: () => {
                //打开问卷方向对话框;
                //分享问卷方法;
                console.log("点击了分享问卷");
            }
        },
        {
            show: QuestionnaireCount == 0,
            placement: 'bottom',
            title: '删除问卷',
            buttonType: 'link',
            buttonShape: 'circle',
            icon: <DeleteOutlined/>,
            size: 'large',
            event: () => {
                //打开删除问卷提示框;
                //删除问卷方法;
                console.log("点击了删除问卷");
            }
        },
        {
            show: QuestionnaireCount == 0,
            placement: 'bottom',
            title: '设为星标',
            buttonType: 'link',
            buttonShape: 'circle',
            //icon需要根据当前选中的问卷的是否发布状态来决定;
            icon: <StarOutlined/>,
            size: 'large',
            event: () => {
                //调用设置问卷为星标问卷方法;
                //将问卷设置为星标问卷方法;
                console.log("点击了设为星标");
            }
        }
    ]
    return (
        <>
            {/*后续修改为For循环*/}
            <div className="Operation">
                {tooltipBtnList.map((e) => (
                    <Tooltip placement={e.placement} title={e.title} key={e.title}>
                        <Button type={e.buttonType} shape={e.buttonShape} icon={e.icon} size={e.size}
                                onClick={e.event} disabled={e.show}/>
                    </Tooltip>
                ))}
            </div>
            <CreateQuestionnaire/>
        </>
    )
}