import React from 'react'
import * as qs from "qs"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useDebounce, useDocumentTitle, useMount } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { ButtonNoPadding, Row } from 'component/lib'
import { useDispatch } from 'react-redux'
import { projectListActions } from './project-list.slice'
// import { Helmet } from 'react-helmet'

const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = (props: { projectButton: JSX.Element}) => {
    // const [keys, setKeys] = useState<('name' | 'personId')[]>(['name', 'personId'])
    const [param, setParam] = useProjectsSearchParams()
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
    const { data: users } = useUsers()

    useDocumentTitle('项目列表', false)
    const dispatch = useDispatch()

    // console.log(useUrlQueryParam(['name']));


    return <Container>
        {/* 方案一
        <Helmet>
            <title>项目列表</title>
        </Helmet> */}
        <Row between={true}>
            <h1>项目列表</h1>
            {/* {props.projectButton} */}
            <ButtonNoPadding
                onClick={() => dispatch(projectListActions.openProjectModal())}
                type={'link'}
            >
                创建项目
            </ButtonNoPadding>
        </Row>
        {/* <Button onClick={retry}>retry</Button> */}
        <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List
            projectButton={props.projectButton}
            refresh={retry}
            loading={isLoading}
            dataSource={list || []}
            users={users || []}>
        </List>
    </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding:3.2rem;
`