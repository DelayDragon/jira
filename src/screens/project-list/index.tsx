import React from 'react'
import * as qs from "qs"
import { List } from "./list"
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { Project } from "../../types/Project"
import { cleanObject, useDebounce, useDocumentTitle, useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useAsync } from 'utils/use-async'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'
import { useProjectModal, useProjectsSearchParams } from './util'
import { ButtonNoPadding, ErrorBox, Row } from 'component/lib'
// import { Helmet } from 'react-helmet'

const apiUrl = process.env.REACT_APP_API_URL


// export const ProjectListScreen = (props: { projectButton: JSX.Element}) => {
export const ProjectListScreen = () => {
    const { open } = useProjectModal()
    // const [keys, setKeys] = useState<('name' | 'personId')[]>(['name', 'personId'])
    const [param, setParam] = useProjectsSearchParams()
    const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
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
            <ButtonNoPadding
                onClick={open}
                type={'link'}
            >创建项目</ButtonNoPadding>
            {/* {props.projectButton} */}
        </Row>
        {/* <Button onClick={retry}>retry</Button> */}
        <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
        {/* {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null} */}
        <ErrorBox error={error} />
        <ListContainer>
            <List
                // projectButton={props.projectButton}
                // refresh={retry}
                loading={isLoading}
                pagination={{
                    onChange(page) {
                        console.log(page);
                    },
                    pageSize: 6
                }}
                dataSource={list || []}
                users={users || []}>
            </List>
        </ListContainer>
    </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    flex:1; 
    padding:3.2rem;
    /* overflow: hidden; */
`

const ListContainer = styled.div`
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
`