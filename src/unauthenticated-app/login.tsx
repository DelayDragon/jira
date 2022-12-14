import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync();
  // const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
  //     event.preventDefault()
  //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value
  //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value
  //     login({username, password})
  //     // console.log('success');
  // }

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>登录成功，用户名：{user?.name}</div> : null}
      <Form.Item
        name={"username"}
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      >
        {/* <label htmlFor="username">用户名</label> */}
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
      >
        {/* <label htmlFor="password">密码</label> */}
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
        登录
      </LongButton>
    </Form>
  );
};
