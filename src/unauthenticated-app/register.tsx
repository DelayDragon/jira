import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import {Form, Input, Button} from 'antd'
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL

export const RegisterScreen = ({onError}:{onError:(error: Error)=> void}) => {
    const {register, user} = useAuth()
    const {run, isLoading} = useAsync()
    // const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
    //     event.preventDefault()
    //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    //     register({username, password})
    //     // console.log('success');
        
    // } 
    const handleSubmit = async ({cpassword, ...values}: {username: string, password:string, cpassword: string}) =>{
        if(cpassword !== values.password){
            onError(new Error('请确认两次输入的密码相同'))
            return
        }
        try{
            await run(register(values))
        }catch(e:any){
            onError(e)
        }
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
                <Input placeholder={'密码'} type="password" id={'password'} />
            </Form.Item>
            <Form.Item name={'cpassword'} rules={[{
                required:true,
                message:'请确认密码'
            }
            ]}>
                <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
            </Form.Item>
            <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>注册</LongButton>
        </Form>)
}