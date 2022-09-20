import React from 'react'
import * as qs from "qs"
import { List } from "./list"
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { cleanObject, useDebounce, useMount } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = ()=>{
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    const debounceParam = useDebounce(param, 2000)
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
            if(res.ok){
                setList(await res.json())
            }
        })
    }, [debounceParam])

    useMount(()=>{
        fetch(`${apiUrl}/users`).then(async res => {
            if(res.ok){
                setUsers(await res.json())
            }
        })
    })
    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}></List>
    </div>
}