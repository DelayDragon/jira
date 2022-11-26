import styled from "@emotion/styled"
import { ButtonNoPadding, Row } from "component/lib"
import { useAuth } from "context/auth-context"
import React, { useState } from "react"
import { ReactComponent as SoftwareLgon } from '../src/assets/Jira Software-blue.svg'
import { ProjectListScreen } from "screens/project-list"
import { Button, Dropdown, Menu } from "antd"
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from "react-router-dom"
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "component/project-popover"

export const AuthenticatedApp = () => {
    // const [projectModalOpen, setProjectModalOpen] = useState(false)
    const value: any = undefined
    return <Container>
        <Router>
            {/* {value.notExist} */}
            <PageHeader
            // projectButton={
            //     <ButtonNoPadding
            //         type={'link'}
            //         onClick={() => setProjectModalOpen(true)}
            //     >
            //         创建项目
            //     </ButtonNoPadding>
            // } 
            />

            <Main>
                {/* <Button onClick={()=>setProjectModalOpen(true)}>打开</Button> */}
                {/* <ProjectListScreen /> */}
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/projects'}></Navigate>}></Route>
                    <Route
                        path={'/projects'}
                        element={
                            <ProjectListScreen
                            // projectButton={
                            //     <ButtonNoPadding
                            //         type={'link'}
                            //         onClick={() => setProjectModalOpen(true)}
                            //     >
                            //         创建项目
                            //     </ButtonNoPadding>
                            // } 
                            />}>
                    </Route>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                </Routes>
            </Main>
            {/* <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} /> */}
            <ProjectModal />
        </Router>
    </Container >
}


// const PageHeader = (props: { projectButton: JSX.Element }) => {
const PageHeader = () => {
    return <Header between={true}>
        <HeaderLeft gap={true}>
            <ButtonNoPadding type={'link'} onClick={resetRoute}>
                <SoftwareLgon width={'18rem'} color={"rgba(38, 132, 255)"} />
            </ButtonNoPadding>
            {/* <ProjectPopover {...props} /> */}
            <ProjectPopover />
            <span>用户</span>
        </HeaderLeft>
        <HeaderRight>
            <User />
        </HeaderRight>
    </Header>
}

const User = () => {
    const { logout, user } = useAuth()
    return <Dropdown overlay={<Menu>
        <Menu.Item key={'logout'}>
            <Button onClick={logout} type={'link'}>登出</Button>
        </Menu.Item>
    </Menu>}>
        <Button href="" onClick={e => e.preventDefault()}>
            Hi, {user?.name}
        </Button>
    </Dropdown>
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
