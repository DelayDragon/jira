//在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
//该文件用于实现用户登录、注册和登出系统
import { User } from "types/User";
const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";

// 获取当前用户
export const getToken = () => window.localStorage.getItem(localStorageKey);

// 保存用户信息
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 登录
export const login = async (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 登出
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
