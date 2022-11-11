import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';
    throwOnError?: boolean
}

const defaultConfig: State<null> ={
    stat:'idle',
    data:null,
    error:null,
    throwOnError: false
}

const defaultInitialState: State<null> = {
    error: null,
    data: null,
    stat: 'idle',
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig}
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const mountedRef = useMountedRef()
    const [retry, setRetry] = useState(() => () =>{

    })

    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }), [])
    const setError = useCallback((error: Error) => setState({
        error,
        stat: 'error',
        data: null
    }), [])
    //run用来触发异步请求
    const run = useCallback(
        (promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
            if (!promise || !promise.then) {
                throw new Error('请传入Promise类型数据')
            }
            setRetry(() => ()=>{
                if(runConfig?.retry){
                    run(runConfig?.retry(), runConfig)
                }
    
            })
            // setState({ ...state, stat: 'loading' })
            setState(prevState => ({...prevState, stat: 'loading'}))
            return promise
                .then(data => {
                    if(mountedRef.current)
                    setData(data)
                    return data
                })
                .catch(error => {
                    //catch消化异常，如果不主动抛出异常，外面时接收不到异常的
                    setError(error)
                    if(config.throwOnError)
                    return Promise.reject(error)
                })
        }, [config.throwOnError, mountedRef, setData, setError])

    // const retry = () => {
    //     run(oldPromise)
    // }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        //retry被调用时，重新调用run，让state重新刷新一遍
        retry,
        ...state

    }
}