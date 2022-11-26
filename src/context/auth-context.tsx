import React, { ReactNode, useCallback, useState } from "react"
import * as auth from 'auth-provider'
import {User} from 'screens/project-list/search-panel'
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "component/lib";
import * as authStore from "store/auth.slice"
import { useDispatch } from "react-redux";
import { useAppDispatch } from "hook";
import { useSelector } from "react-redux";

export interface AuthForm{
    username: string;
    password:string;
}

export const bootstrapUser = async () =>{
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('me', {token})
        user = data.user
    }
    return user
}

// const AuthContext = React.createContext<{
//     user:User| null;
//     register:(form:AuthForm) =>Promise<void>,
//     login: (form:AuthForm) =>Promise<void>,
//     logout:() =>Promise<void>,
// } | undefined>(undefined)
// AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children} : {children: ReactNode}) =>{
    // const [user, setUser] = useState<User | null>(null)
    const {
        // data: user, 
        error, 
        isLoading, 
        isIdle, 
        isError, 
        run, 
        // setData: setUser
    } = useAsync<User | null>()

    const dispatch: (...args: unknown[]) =>Promise<User> = useAppDispatch()

    //point free
    // const login = (form : AuthForm) => auth.login(form).then(setUser)
    // const register = (form : AuthForm) => auth.register(form).then(setUser)
    // const logout = () => auth.logout().then(user => setUser(null))

    useMount(() =>{
        // bootstrapUser().then(setUser)
        // run(bootstrapUser())
        run(dispatch(authStore.bootstrap()))
    })

    if(isIdle || isLoading){
        return <FullPageLoading></FullPageLoading>
    }

    if(isError){
        return <FullPageErrorFallback error={error}></FullPageErrorFallback>
    }
    return <div>{children}</div> 
    // <AuthContext.Provider children={children} value={{user, login, register, logout}}/>
}

// export const useAuth = ()=>{
//     const context = React.useContext(AuthContext)
//     if(!context){
//         throw new Error('useAuth比u下在AuthProvider中使用')
//     }
//     return context
// }

export const useAuth = () =>{
    const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch()
    const user = useSelector(authStore.selectUser)
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)),[dispatch])
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()),[dispatch])
    // login({username: '123', password: "123"}).then()
    return {
        login,
        register,
        logout,
        user
    }
}