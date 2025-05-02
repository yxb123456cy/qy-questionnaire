import './css/Register.css'
import {Card} from "antd";
import {RegisterForm} from "./cpn/RegisterForm.tsx";

export const Register = () => {

    return (
        <>
            <div className={'Register-container'}>
                <div className={'Register-banner'}>
                    <img src={'/src/assets/svg/智能7.svg'} alt={'智能7.svg'} width={'70%'}/>
                </div>
                <div className={'Register-view'}>
                    <Card style={{width: 550, textAlign: 'center'}}>
                        <div className={'Register-card'}>
                            <div className={'Register-image'}>
                                <img src={'/src/assets/images/logo.png'} alt={'logo'} width={'20%'}/>
                                <span style={{fontSize: "45px", marginLeft: '2vw'}}>REGISTER</span>
                            </div>
                            <div className={'Register-form'}>
                                <RegisterForm/>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}