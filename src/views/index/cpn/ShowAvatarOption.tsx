import React from "react";
import {Avatar, Dropdown, MenuProps} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {Link, useLocation, useNavigate} from "react-router";
import {localCache} from "../../../utils/Cache.ts";
import {useUserStore} from "../../../stores/UserStore.ts";


/**
 * 头像操作;
 * @constructor
 */
export const ShowAvatarOption: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const setLoginState = useUserStore(state => state.setLoginState);
    const logOut = () => {
        //localCache.setCache("login-values", value);
        localCache.deleteCache("login-values");//清除缓存;
        setLoginState(false); //Zustand设置登录状态为False;
        console.log(location.pathname);
        if (location.pathname !== "/") {
            navigate("/login");
        }
    }
    const url: string = "https://qy-red-book.oss-cn-guangzhou.aliyuncs.com/resources/avatar/67700cbb11c98ab3f5837115.jpg";
    const items: MenuProps['items'] = [
        {
            key: 'Profile',
            label: (
                <Link to={'/profile'}> <a>
                    个人信息
                </a></Link>
            ),
        },
        {
            key: 'management',
            label: (
                <Link to={'/home'}>
                    问卷管理
                </Link>
            ),
        },
        {
            key: 'logout',
            danger: true,
            label: (
                <span onClick={logOut}>
                    退出登录</span>
            ),
        },
    ];
    return (
        <>
            <Dropdown menu={{items}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Avatar src={url} alt={'avatar'}/>轻叶~
                    <DownOutlined/>
                </a>
            </Dropdown>
        </>
    )
}