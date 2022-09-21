import { useEffect, useState } from "react"

export const isFalsy = (value) => value === 0 ? false : !value

export const cleanObject = (object)=>{
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback)=>{
    useEffect(() => {
        callback()
    }, [])
}
//防抖hooks
export const useDebounce = (value, delay) => {
     const [debounceValue, setDebounceValue] = useState(value)

     useEffect(()=>{
        //每次在value变化以后，设置一个定时器
        const timeout = setTimeout(()=>setDebounceValue(value),delay)
        //每次在上一个useEffect处理完再运行
        return () => clearTimeout(timeout)
     }, [value, delay])

     return debounceValue
}