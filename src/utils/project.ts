import { useCallback, useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Project } from "screens/project-list/list"
import { useProjectsSearchParams } from "screens/project-list/util"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()

    return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }))

    // const {run, ...result} = useAsync<Project[]>()

    // const fetchProjects = useCallback(() => client('projects',{data: cleanObject(param || {})}), [param, client])
    // useEffect(()=>{
    //     run(fetchProjects(),{
    //         retry: fetchProjects
    //     })
    // }, [param, run, fetchProjects])
    // return result
}

export const useEditProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    const [searchParams] = useProjectsSearchParams()
    const queryKey = ['projects', searchParams]
    return useMutation(
        (params: Partial<Project>) => client(`projects/${params.id}`, {
            method: 'PATCH',
            data: params
        }), {
        // onSuccess: () => queryClient.invalidateQueries('projects')
        onSuccess: () => {
            queryClient.invalidateQueries('projects')
            console.log('edit');
        },
        async onMutate(target: Partial<Project>) {
            const previousItems = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, (old?: Project[]) => {
                return old?.map(project => project.id === target.id ? { ...project, ...target } : project) || []
            })
            return { previousItems }
        },
        onError(error: Error, newItem: Partial<Project>, context: any) {
            // queryClient.setQueryData(queryKey, context.previousItems)
            queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems)

        }
    }
    )

    // const {run, ...asyncResult} = useAsync()
    // const client = useHttp()
    // const mutate = (params: Partial<Project>) => {
    //     console.log(params);
    //     return run(client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'PATCH'
    //     }))
    // }
    // return {
    //     mutate,
    //     ...asyncResult
    // }
}
export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()

    return useMutation(
        (params: Partial<Project>) => client('projects', {
            data: params,
            method: 'POST'
        }), {
        // onSuccess: () => queryClient.invalidateQueries('projects')
        onSuccess: () => {
            queryClient.invalidateQueries('projects')
            console.log('add');
        }
    }
    )


    // const { run, ...asyncResult } = useAsync()
    // const client = useHttp()
    // const mutate = (params: Partial<Project>) => {
    //     return run(client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'POST'
    //     }))
    // }
    // return {
    //     mutate,
    //     ...asyncResult
    // }
}

export const useProject = (id?: number) => {
    const client = useHttp()

    return useQuery<Project>(
        ['project', { id }],
        () => client(`projects/${id}`),
        {
            enabled: !!id
        }
    )
}