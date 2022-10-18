import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

export const useUrlQueryParam = <K extends string>(keys: K[]) =>{
    const [searchParams,setSearchParam] = useSearchParams()
    // console.log(searchParams.get('name'));
    return [
        useMemo(() => keys.reduce((prev, key)=>{
            return {...prev, [key]: searchParams.get(key) || ''}
        },{} as {[key in K] : string}),
        [searchParams]),
        (params: Partial<{[key in K]: unknown}>) =>{
            const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
            return setSearchParam(o)
        } 
    ] as const
}


const a = ['jack', 12, {gender:'male'}] as const