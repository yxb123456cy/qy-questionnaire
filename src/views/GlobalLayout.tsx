import {GlobalHeader} from "./index/cpn/GlobalHeader.tsx";
import {IndexFooter} from "./index/cpn/IndexFooter.tsx";
import {Layout} from "antd";
import * as React from "react";
import {Outlet} from "react-router";

const {Header, Footer, Content} = Layout;

export const GlobalLayout = () => {
    const headerStyle: React.CSSProperties = {
        borderBottom: "2px solid #1a94bc",
        color: 'black',
        height: '8vh',
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#fff',
    };

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        backgroundColor: '#e5e7eb',
    };


    const footerStyle: React.CSSProperties = {
        position: "fixed",
        height: '6vh',
        left: "0",
        right: "0",
        bottom: '0',
        zIndex: 9999,
        padding: "0",
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#1a94bc',
    };

    const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',
        width: '100%',
    };


    return (

        <>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <GlobalHeader/>
                </Header>
                <Content style={contentStyle}>
                    {/*{{嵌套路由}}*/}
                    <Outlet/>
                </Content>
                <Footer style={footerStyle}>
                    <IndexFooter/>
                </Footer>
            </Layout>
        </>
    )
}