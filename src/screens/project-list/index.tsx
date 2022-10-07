import React from 'react'
import * as qs from "qs"
import { List } from "./list"
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import {Project} from '../project-list/list.js'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useAsync } from 'utils/use-async'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'

const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = ()=>{
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    const debounceParam = useDebounce(param, 500)
    const { isLoading, error, data: list} = useProjects(debounceParam)
    const {data: users} = useUsers()

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List loading={isLoading} dataSource={list || []} users={users || []}></List>
    </Container>
}

const Container = styled.div`
    padding:3.2rem;
`