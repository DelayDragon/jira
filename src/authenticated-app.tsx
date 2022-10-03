import styled from "@emotion/styled"
import { Row } from "component/lib"
import { useAuth } from "context/auth-context"
import React from "react"
import { ProjectListScreen } from "screens/project-list"

export const AuthenticatedApp = () =>{
    const {logout} = useAuth()
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h3>logo</h3>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>登出</button>
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const HeaderLeft = styled(Row)`
    /* display: flex;
    align-items: center; */
`
const HeaderRight = styled.div`
    
`
const Main = styled.main`
`
