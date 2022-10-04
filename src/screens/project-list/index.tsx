import React from 'react'
import * as qs from "qs"
import { List } from "./list"
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = ()=>{
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    const debounceParam = useDebounce(param, 2000)
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const client = useHttp()

    useEffect(()=>{
        client('projects',{data: cleanObject(debounceParam)}).then(setList)
    }, [debounceParam])

    useMount(()=>{
        client('users').then(setUsers)
    })
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}></List>
    </Container>
}

const Container = styled.div`
    padding:3.2rem;
`