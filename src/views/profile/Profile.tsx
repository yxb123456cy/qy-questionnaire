import './css/Profile.css'
import React from "react";
import {Avatar, Button, Card, Descriptions, DescriptionsProps, Tag} from "antd";
import {AntDesignOutlined} from "@ant-design/icons";
const gridStyle1: React.CSSProperties = {
    width: '35%',

};
const gridStyle2: React.CSSProperties = {
    width: '65%',

};
export const Profile = () => {
    const items: DescriptionsProps['items'] = [
        {
            key: 'use',
            label: '使用天数',
            children: <span style={{fontWeight:"bolder"}}>60份</span>,
        },
        {
            key: 'count',
            label: '创建问卷',
            children: <span style={{fontWeight:"bolder"}}>20份</span>,
        },
    ];
    const registerDate: string = "2025年3月";
    return (
        <>
            <div className={'UserProfile'} style={{width: "100%"}}>
                <Card title="个人中心">
                    <Card.Grid style={gridStyle1} className={'card-left'}>
                        <div className={'UserProfile-avatar'}>
                            <Avatar
                                src={'https://qy-red-book.oss-cn-guangzhou.aliyuncs.com/resources/avatar/67700cbb11c98ab3f5837115.jpg'}
                                size={{ xs: 50, sm: 80, md: 100, lg: 140, xl: 200, xxl: 200 }}
                                icon={<AntDesignOutlined />}
                            />
                        </div>
                        <div className={'UserProfile-userName'} style={{marginTop:"-15px"}}>
                            <h2>轻叶~</h2>
                        </div>
                        <div className={'UserProfile-register-date'}
                             style={{marginTop:"-15px"}}>
                            注册时间:&nbsp;&nbsp;
                            <Tag>{registerDate}</Tag>
                        </div>
                        <div className={'UserProfile-desc'}>
                            <h4>个人简介</h4>
                            <span  style={{marginTop:"-1.5vh",display:"block"}}> 励志成为一名全栈工程师;</span>

                        </div>
                        <div className={'UserProfile-email'} style={{marginTop:"2vh"}}>
                            <span>联系信息&nbsp;</span>📧&nbsp;&nbsp;&nbsp;<span style={{fontWeight:"bolder"}}>
                            2186256471@qq.com</span><br/>
                            <Button type={'primary'} style={{width:"90%",marginTop:"2vh"}}
                            >修改密码</Button>
                        </div>
                        <div className={'UserProfile-Descriptions'} style={{marginTop:"2vh"}}>
                            <Descriptions title="统计信息" items={items} />;
                        </div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle2}>
                        <div className={'UserProfile-my-star'}>
                            <h1>我的星标问卷</h1>
                        </div>
                    </Card.Grid>
                </Card>
            </div>
        </>
    )
}