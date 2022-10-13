import styled from "@emotion/styled"
import { Row } from "component/lib"
import { useAuth } from "context/auth-context"
import React from "react"
import {ReactComponent as SoftwareLgon } from '../src/assets/Jira Software-blue.svg'
import { ProjectListScreen } from "screens/project-list"
import { Button, Dropdown, Menu } from "antd"

export const AuthenticatedApp = () =>{
    const {logout, user} = useAuth()
    const value : any = undefined
    return <Container>
        {/* {value.notExist} */}
        <Header between={true}>
            <HeaderLeft gap={true}>
                <SoftwareLgon width={'18rem'} color={"rgba(38, 132, 255)"}/>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown overlay={<Menu>
                    <Menu.Item key={'logout'}>
                        <Button onClick={logout} type={'link'}>登出</Button>
                    </Menu.Item>
                </Menu>}>
                    <Button href="" onClick={e => e.preventDefault()}>
                        Hi, {user?.name}
                    </Button>
                </Dropdown>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen/>
        </Main>
    </Container>
}

const HeaderItem = styled.h3`
    margin-right: 3rem;
`

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`
const Header = styled(Row)`
    padding:3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index:1
`
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div`
    
`
const Main = styled.main`
`
