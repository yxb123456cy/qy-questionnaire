/**
 * 全局Header;
 * @constructor
 */
import './css/GlobalHeader.css'
import {Button} from "antd";
import {Link} from "react-router";
import React from "react";
import {ShowAvatarOption} from "./ShowAvatarOption.tsx";
import {useUserStore} from "../../../stores/UserStore.ts";


const ShowLoginAndRegister: React.FC = () => {
    return (
        <>
            <div>
                <Link to={'login'}>
                    <Button style={{width: "100px"}}>
                        登录
                    </Button></Link>
                <Link to={'register'}>
                    <Button style={{marginLeft: "2vw", width: "100px"}}>
                        注册
                    </Button>
                </Link>
            </div>
        </>
    )
}
export const GlobalHeader = () => {
    const loginState = useUserStore(state => state.isLogin);

    return (
        <>
            <div className={'logo'}>
                <Link to={'/'}>
                    <img className={'logoImg'} src={'/images/logo.png'} alt={'logo'}/>
                    <span style={{color: "rgb(48, 49, 51)"}}>问卷喵</span>
                    <span style={{
                        fontSize: "13px",
                        marginLeft: '5px',
                        color: "rgb(96, 98, 102)"
                    }}>——免费的在线问卷调查系统</span>
                </Link>
            </div>

            <div className={'header-right'}>
                {/*通过Zustand中的登录状态来判断需要渲染的组件*/}
                {/*<ShowAvatarOption/>*/}
                {/*<ShowLoginAndRegister/>*/}
                {loginState ? <ShowAvatarOption/>
                    : <ShowLoginAndRegister/>
                }
            </div>
        </>
    )
}