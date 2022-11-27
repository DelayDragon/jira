import { useMemo } from "react"
import { useProject } from "utils/project"
import { useUrlQueryParam } from "utils/url"

// 项目列表搜索的参数
export const useProjectsSearchParams = () =>{
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return  [
        useMemo(()=>({...param, personId: Number(param.personId) || undefined}),[param]),
        setParam
    ] as const
}

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])
    const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

    const open = () => {
        setProjectCreate({projectCreate:true})
    }
    const close = () => {
        setProjectCreate({projectCreate: undefined})
        setEditingProjectId({editingProjectId: undefined})
    }
    const startEdit = (id : number) => setEditingProjectId({editingProjectId: id})

    // return [
    //     projectCreate === 'true',
    //     open,
    //     close
    // ] as const 

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}