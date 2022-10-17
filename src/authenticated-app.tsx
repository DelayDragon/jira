import styled from "@emotion/styled"
import { Row } from "component/lib"
import { useAuth } from "context/auth-context"
import React from "react"
import { ReactComponent as SoftwareLgon } from '../src/assets/Jira Software-blue.svg'
import { ProjectListScreen } from "screens/project-list"
import { Button, Dropdown, Menu } from "antd"
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from "react-router-dom"
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"

export const AuthenticatedApp = () => {
    const value: any = undefined
    return <Container>
        {/* {value.notExist} */}
        <PageHeader />
        <Main>

            <Router>
                {/* <ProjectListScreen /> */}
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/projects'}></Navigate>}></Route>
                    <Route path={'/projects'} element={<ProjectListScreen />}></Route>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                </Routes>
            </Router>
        </Main>
    </Container>
}


const PageHeader = () => {
    const { logout, user } = useAuth()
    return <Header between={true}>
        <HeaderLeft gap={true}>
            <Button type={'link'} onClick={resetRoute}><SoftwareLgon width={'18rem'} color={"rgba(38, 132, 255)"} /></Button>
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
