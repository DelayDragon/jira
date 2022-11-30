import { useCallback, useEffect } from "react"
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query"
import { Project } from "types/Project"
import { useProjectsSearchParams } from "screens/project-list/util"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options"

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

export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Project>) => client(`projects/${params.id}`, {
            method: 'PATCH',
            data: params
        }),
        useEditConfig(queryKey)
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
export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp()

    return useMutation(
        (params: Partial<Project>) => client('projects', {
            data: params,
            method: 'POST'
        }),
        useAddConfig(queryKey)
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

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp()

    return useMutation(
        ({ id }: { id: number }) => client(`projects/${id}`, {
            method: 'DELETE'
        }),
        useDeleteConfig(queryKey)
    )
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