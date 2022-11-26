import { useMemo } from "react"
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

    const open = () => setProjectCreate({projectCreate:true})
    const close = () => setProjectCreate({projectCreate: undefined})

    // return [
    //     projectCreate === 'true',
    //     open,
    //     close
    // ] as const 

    return {
        projectModalOpen: projectCreate === 'true',
        open,
        close
    }
}