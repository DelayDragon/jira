import { useQuery } from "react-query"
import { Task } from "types/task"
import { useHttp } from "./http"


export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()

    return useQuery<Task[]>(
        ['Tasks', param],
        () => client('kanbans', { data: param })
    )
}