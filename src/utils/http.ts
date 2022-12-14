import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  //axios 和 fetch表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  //utility types
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};

//联合类型 interface 在这种情况下没法替代type
// let a : string | number

//类型别名
// type b = string | number
// let bb : b = 6

//interface也没法实现utility type

// JS中的typeof是在runtime时运行的；
// TS中的typeof，实在静态环境运行的；

// type Person = {
//     name: string,
//     age: number
// }
//Partial把变量属性变为可选的；
// const person1: Partial<Person> = {}
//Omit传进两个参数，第一个为需要修改的type，第二个是要删除的属性，可以是联合类型
// const person2: Omit<Person, 'name'> = {age:2}
// const person3: Omit<Person, 'name' | 'age'> = {}

// Partial的实现
// type Partial<T> = {
// 传进的T类型，遍历出来，把所有的键都变成了可选的
//     [P in keyof T]? : T[P]
// }

// Pick的实现
// 在传进的类型中挑选一些键来形成新的类型
// T为传进的类型，K必须为T中的键值
// type Pick<T, K extents keyof T> = {
//     [P in K] : T[P]
// }

//Exclude的实现
// 相当于遍历，把T联合类型中的所有键比较U，相同则删去键，否则返回
// type Exclude<T, U> = T extends U ? never : T;

// Omit的实现
// Omit传进两个参数，第一个为需要修改的type，第二个是要删除的属性，可以是联合类型
// type Omit<T, K extend keyof any>
//      =Pick<T, Exclude<keyof T, K>>
