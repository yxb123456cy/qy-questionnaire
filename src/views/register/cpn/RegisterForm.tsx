import type {FormProps} from 'antd';
import {Button, Form, Input} from 'antd';
import {Link} from "react-router";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export const RegisterForm = () => (
    <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="账号"
            name="username"
            rules={[{required: true, message: '请输入您的账号!'}]}
        >
            <Input/>
        </Form.Item>

        <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{required: true, message: '请输入您的密码!'}]}
        >
            <Input.Password/>
        </Form.Item>
        <Form.Item<FieldType>
            label="确认密码"
            name="password"
            rules={[{required: true, message: '请再次输入您的密码!'}]}
        >
            <Input.Password/>
        </Form.Item>
        <Form.Item label={null}>
            <Button type="primary" htmlType="submit" style={{width: "17vw"}}>
                注册
            </Button>
            <br/>
            <span style={{marginTop: "1vh", display: "block"}}>已有账号?&nbsp;&nbsp;&nbsp;
                <span className={'Register-to-login'}>
                    <Link to={'/login'}>去登录</Link>
                </span>
                </span>
        </Form.Item>
    </Form>
);

