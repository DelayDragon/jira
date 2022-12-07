import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useTasksModal, useTasksSearchParams } from "./util";
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from "@emotion/styled";
import { Card } from "antd";
import { Row } from "component/lib";
import { CreateTask } from "./create-task";


const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()

    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) {
        return null
    }
    return <img alt={'task-icon'} style={{ width: "2rem", height: 'auto' }} src={name === 'task' ? taskIcon : bugIcon} />
}

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    // const {data: allTasks} = useTasks(useTasksSearchParams())
    const { data: allTasks } = useTasks(useTasksSearchParams())

    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

    const { startEdit } = useTasksModal()
    return <Container>
        <Row between={true}>
            <h3>{kanban.name}</h3>
        </Row>
        <TaskContainer>
            {
                tasks?.map(task =>
                    <Card onClick={() => startEdit(task.id)} style={{ marginBottom: '0.5rem', cursor: 'pointer'}} key={task.id}>
                        {task.name}
                        <TaskTypeIcon id={task.typeId} />
                    </Card>)
            }
            <CreateTask kanbanId={kanban.id}></CreateTask>
        </TaskContainer>
    </Container>
}

export const Container = styled.div`
    min-width:27rem;
    height: 50rem;
    border-radius: 0.6rem;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding:0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
`

const TaskContainer = styled.div`
    overflow: scroll;
    flex: 1;
    
    ::-webkit-scrollbar{
        display: none;
    }
`