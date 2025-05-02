import './css/Login.css'
import {LoginForm} from "./cpn/LoginForm.tsx";
import {Card} from "antd";

export const Login = () => {

    return (
        <>
            <div className={'login-container'}>
                <div className={'login-banner'}>
                    <img src={'/svg/智能AI.svg'} alt={'智能AI.svg'} width={'70%'} />
                </div>
                <div className={'login-view'}>
                    <Card style={{ width: 550,textAlign:'center' }}>
                        <div className={'login-card'}>
                            <div className={'login-image'}>
                                <img src={'/images/logo.png'} alt={'logo'} width={'20%'}/>
                                <span style={{fontSize:"45px",marginLeft:'2vw'}}>LOGIN</span>
                            </div>
                            <div className={'login-form'}>
                                <LoginForm/>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </>
    )
}