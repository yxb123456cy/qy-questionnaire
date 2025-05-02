import {MenuProps, Tag} from 'antd';
import {Menu} from 'antd';
import '../css/QuestionnaireList.css'
import {BookOutlined, ContainerOutlined, StarFilled} from "@ant-design/icons";
import {useQuestionnaireList} from "../../../stores/QuestionnaireList.ts";
import {useEffect, useState} from "react";

export const MenuList = () => {
    const questionnaireList = useQuestionnaireList(state => state.questionnaireList);
    const setCurrentlyQuestionnaire = useQuestionnaireList(state => state.setCurrentlyQuestionnaire);
    const currentlySelected = useQuestionnaireList(state => state.currentlySelected);
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrentSelectedKeys(e.key);
        setCurrentlyQuestionnaire(Number(e.key));//设置当前的选中问卷obj;
        //修改
    };
    const [currentSelectedKeys, setCurrentSelectedKeys] = useState(String(currentlySelected));

    useEffect(() => {
        setCurrentSelectedKeys(String(currentlySelected));
    }, [currentlySelected]);
    return (
        <Menu
            onClick={onClick}
            className={'QuestionnaireList'}
            style={{width: '100%', backgroundColor: '#fff', padding: '0px'}}
            defaultSelectedKeys={[String(currentlySelected)]}
            defaultOpenKeys={['QuestionnaireMenuList']}
            mode="inline"
            selectedKeys={[currentSelectedKeys]}
            // items={items}
        >
            <Menu.SubMenu key={'QuestionnaireMenuList'} icon={<ContainerOutlined/>} title={'问卷列表'}>
                {/*map循环渲染;*/}
                {questionnaireList.map((e) => (
                    <Menu.Item key={e.id} icon={<BookOutlined/>}
                               style={{paddingLeft: "10px",marginTop:"2vh"}}
                    >
                        {e.title} <Tag style={{marginLeft: "2vw"}} color={e.published ? 'green' : 'red'}>
                        {e.published ? '已发布' : '未发布'}</Tag>
                        {e.star ? <StarFilled/> : <StarFilled/>}
                    </Menu.Item>
                ))}
            </Menu.SubMenu>
        </Menu>
    );
};

