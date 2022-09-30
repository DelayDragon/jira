import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import {Form, Input, Button} from 'antd'

const apiUrl = process.env.REACT_APP_API_URL

export const RegisterScreen = () => {
    const {register, user} = useAuth()
    // const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
    //     event.preventDefault()
    //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    //     register({username, password})
    //     // console.log('success');
        
    // } 
    const handleSubmit = (values: {username: string, password:string}) =>{
        register(values)
    }
    return (
        <Form onFinish={handleSubmit}>
            {user? <div>
                登录成功，用户名：{user?.name}
            </div> : null}
            <Form.Item name={'username'} rules={[{
                required:true,
                message:'请输入用户名'
            }
            ]}>
                {/* <label htmlFor="username">用户名</label> */}
                <Input placeholder={'用户名'} type="text" id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{
                required:true,
                message:'请输入密码'
            }
            ]}>
                {/* <label htmlFor="password">密码</label> */}
                <Input placeholder={'密码'} type="password" id={'password'} />
            </Form.Item>
            <Button type={'primary'} htmlType={'submit'}>注册</Button>
        </Form>)
}