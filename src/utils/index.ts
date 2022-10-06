import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const idVoid = (value:unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: {[key: string]: unknown})=>{
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if(idVoid(value)){
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void)=>{
    useEffect(() => {
        callback()
        // TODO 依赖项加上callback会造成无限循环，这个和useCallback和useMemo有关
    }, [])
}
//防抖hooks
export const useDebounce = <V>(value: V, delay?: number) => {
     const [debounceValue, setDebounceValue] = useState(value)

     useEffect(()=>{
        //每次在value变化以后，设置一个定时器
        const timeout = setTimeout(()=>setDebounceValue(value),delay)
        //每次在上一个useEffect处理完再运行
        return () => clearTimeout(timeout)
     }, [value, delay])

     return debounceValue
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item:T) =>setValue([...value, item]),
        removeIndex: (index:number) => {
            const copy = [...value]
            copy.splice(index, 1)
            setValue(copy)
        }
    }
}