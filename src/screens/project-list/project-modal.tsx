import { Button, Drawer } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { projectListActions, selectProjectModalOpen } from './project-list.slice'

export const ProjectModal = () => {
    // export const ProjectModal = (props:{projectModalOpen: boolean, onClose: () => void}) => {
    // return <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={"100%"}>
    //     <h1>Project Modal</h1>
    //     <Button onClick={props.onClose}>关闭</Button>
    // </Drawer>
    const dispatch = useDispatch()
    const projectListModalOpen = useSelector(selectProjectModalOpen)
    return <Drawer onClose={() => dispatch(projectListActions.closeProjectModal())} visible={projectListModalOpen} width={"100%"}>
        <h1>Project Modal</h1>
        <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
}