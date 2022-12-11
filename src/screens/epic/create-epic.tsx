import styled from "@emotion/styled"
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd"
import { useForm } from "antd/es/form/Form"

import { ErrorBox } from "component/lib"
import { useEffect } from "react"
import { useProjectIdInUrl } from "screens/kanban/util"
import { useAddEpic } from "utils/epic"
import { useEpicQueryKey } from "./util"

export const CreateEpic = (props: Pick<DrawerProps, 'open'> & {onClose: () => void}) => {
    const {mutate: addEpic, isLoading, error} = useAddEpic(useEpicQueryKey())
    const [form] = useForm()
    const projectId = useProjectIdInUrl()

    const onFinish= async (values: any) =>{
        await addEpic({...values, projectId })
        props.onClose()
    }
    useEffect(()=>{
        form.resetFields()
    },[form,props.open])

    return <Drawer 
    open={props.open} 
    onClose={props.onClose}
    forceRender={true} 
    destroyOnClose={true} 
    width={'100%'}>
        <Container>
        {
                isLoading ? <Spin size={'large'} /> : <>
                    <h1>创建任务组</h1>
                    <ErrorBox error={error}></ErrorBox>
                    <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
                        <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: "请输入任务组名称" }]}>
                            <Input placeholder={'请输入任务组名称'}></Input>
                        </Form.Item>
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button loading={isLoading} type={'primary'} htmlType={'submit'}>
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            }
        </Container>
    </Drawer>
}

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`