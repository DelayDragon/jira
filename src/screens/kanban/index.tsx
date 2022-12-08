
import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "component/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from "./util";

export const KanbanScreen = () => {
    useDocumentTitle('看板列表')

    const { data: currentProject } = useProjectInUrl()
    // const { data: kanbans } = useKanbans(useKanbanSearchParams())
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading || kanbanIsLoading

    return <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel></SearchPanel>
        {
            isLoading ? <Spin size={"large"} /> :
                (<ColumnsContainer>
                    {kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)}
                    <CreateKanban />
                </ColumnsContainer>)
        }
        <TaskModal/>
    </ScreenContainer>
}

export const ColumnsContainer = styled.div`
    display: flex;
    flex: 1;
    overflow-x: scroll;
    overflow-y: hidden;
`