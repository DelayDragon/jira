import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export const useUrlQueryParam = <K extends string>(keys: K[]) =>{
    const [searchParams,setSearchParam] = useSearchParams()
    // console.log(searchParams.get('name'));
    return [
        useMemo(() => keys.reduce((prev, key)=>{
            return {...prev, [key]: searchParams.get(key) || ''}
        },{} as {[key in K] : string}),
        [searchParams]),
        setSearchParam
    ] as const
}


const a = ['jack', 12, {gender:'male'}] as const