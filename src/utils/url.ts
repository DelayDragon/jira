import { useSearchParams } from "react-router-dom"

export const useUrlQueryParam = (keys: string[]) =>{
    const [searchParams,setSearchParam] = useSearchParams()
    // console.log(searchParams.get('name'));
    return [
        keys.reduce((prev, key)=>{
            return {...prev, [key]: searchParams.get(key) || ''}
        },{} as {[key in string] : string}),
        setSearchParam
    ] as const
}


const a = ['jack', 12, {gender:'male'}] as const