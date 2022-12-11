import styled from '@emotion/styled'
import { Button, Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjectModal } from 'screens/project-list/util'
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from './lib'

// export const ProjectPopover = (props: {projectButton: JSX.Element }) => {
export const ProjectPopover = () => {
    const { open } = useProjectModal()
    const { data: projects, isLoading,refetch } = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
    const content = <ContentContainer>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item key={project.id}>
                    <List.Item.Meta title={project.name}></List.Item.Meta>
                </List.Item>)
            }
        </List>
        <Divider />
        {/* {props.projectButton} */}
        <ButtonNoPadding
            onClick={open}
            type={'link'}
        >创建项目</ButtonNoPadding>
    </ContentContainer>

    return <Popover onVisibleChange={() => refetch()} placement={'bottom'} content={content}>
        项目
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 30rem;
`