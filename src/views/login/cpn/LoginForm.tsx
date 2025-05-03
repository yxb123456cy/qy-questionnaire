import {FormProps, message} from 'antd';
import {Button, Checkbox, Form, Input} from 'antd';
import {Link, useNavigate} from "react-router";
import {localCache} from "../../../utils/Cache.ts";
import {useUserStore} from "../../../stores/UserStore.ts";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};


const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log("error!!!");
    console.log('Failed:', errorInfo);
};
export const LoginForm = () => {
    const setLoginState = useUserStore(state => state.setLoginState);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        if (values.username === 'jdk' && values.password === '123456') {
            console.log("登录成功");
            if (values.remember) {
                const value = {
                    username: values.username,
                    password: values.password,
                }
                localCache.setCache("login-values", value);
            }

            messageApi.success('登录成功', 1).then(r => {
                //Zustand保存登录信息 并且切换出头像操作组件;
                setLoginState(true);
                console.log(r);
                navigate('/home');
            });
        } else {
            console.log('账号或密码错误,登录失败');
            messageApi.error("账号或密码错误,登录失败").then(r => {
                console.log(r);
            })
        }
    };
    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{
                    remember: true,
                    username: localCache.getCache('login-values')?.username,
                    password: localCache.getCache('login-values')?.password,
                }}
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

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" style={{width: "17vw"}}>
                        登录
                    </Button>
                </Form.Item>
                <Form.Item label={null}>
                    <Link to={'/register'}>
                        <Button type='dashed' style={{width: "17vw"}}>
                            去注册
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </>

    );
}

