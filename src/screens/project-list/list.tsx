import React from 'react'
import { User } from './search-panel';
import { Button, Dropdown, Menu, Table, TableProps } from 'antd'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from 'component/pin';
import { useEditProject } from 'utils/project';
import { ButtonNoPadding } from 'component/lib';
import { useDispatch } from 'react-redux';
import { projectListActions } from './project-list.slice';

// TODO 把所有ID都改成number类型
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project> {
    users: User[]
    refresh?: () => void
    projectButton: JSX.Element
}


export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject()
    // const pinProject = (id: number, pin: boolean)=>mutate({id, pin})
    const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)
    const dispatch = useDispatch()

    return <Table
        rowKey={'id'}
        pagination={false}
        columns={[
            {
                title: <Pin checked={true} disabled={true}></Pin>,
                render(value, project) {
                    // return <Pin checked={project.pin} onCheckedChange={pin => pinProject(project.id, pin)}></Pin>
                    return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}></Pin>

                }
            },
            {
                title: '名称',
                // dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                render(value, project) {
                    return <Link to={String(project.id)}>{project.name}</Link>
                }
            },
            {
                title: '部门',
                dataIndex: 'organization',
                // sorter:(a, b) =>a.organization.localeCompare(b.organization)
            },
            {
                title: '负责人',
                render(value, project) {
                    return <span key={project.personId}>
                        {users.find(user => user.id === project.personId)?.name || '未知'}
                    </span>
                }
            },
            {
                title: '创建时间',
                dataIndex: '',
                render(value, project) {
                    return <span>
                        {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                    </span>
                }
            },
            {
                render(value, project){
                    return <Dropdown overlay={<Menu>
                        <Menu.Item key={"edit"}>
                            {/* <ButtonNoPadding type={'link'} onClick={props.setProjectModalOpen(true)}>编辑</ButtonNoPadding> */}
                            {/* {props.projectButton} */}
                            <ButtonNoPadding type={'link'} onClick={() => dispatch(projectListActions.openProjectModal())}>编辑</ButtonNoPadding>
                        </Menu.Item>
                    </Menu>}>
                        <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
                    </Dropdown>
                }
            }
        ]}
        {...props}>
    </Table>
}
