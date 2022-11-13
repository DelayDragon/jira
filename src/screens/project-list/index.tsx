import React from 'react'
import * as qs from "qs"
import { List } from "./list"
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { Project } from '../project-list/list.js'
import { cleanObject, useDebounce, useDocumentTitle, useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useAsync } from 'utils/use-async'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'
import { useProjectsSearchParams } from './util'
import { Row } from 'component/lib'
// import { Helmet } from 'react-helmet'

const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = (props: { projectButton: JSX.Element}) => {
    // const [keys, setKeys] = useState<('name' | 'personId')[]>(['name', 'personId'])
    const [param, setParam] = useProjectsSearchParams()
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
    const { data: users } = useUsers()

    useDocumentTitle('项目列表', false)

    // console.log(useUrlQueryParam(['name']));


    return <Container>
        {/* 方案一
        <Helmet>
            <title>项目列表</title>
        </Helmet> */}
        <Row between={true}>
            <h1>项目列表</h1>
            {props.projectButton}
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