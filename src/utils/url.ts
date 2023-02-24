import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject, subset } from "utils";

// 返回页面url中，指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  const [stateKeys] = useState(keys);
  // console.log(searchParams.get('name'));
  return [
    useMemo(
      // () => keys.reduce((prev, key) => {
      //     return { ...prev, [key]: searchParams.get(key) || '' }
      // }, {} as { [key in K]: string }),
      // [searchParams]
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

// as const的作用
/**
 * 解决一个数组中存在着不同类型的元素,返回数组元素的原始类型
 */

export const useSetUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

// const a = ['jack', 12, {gender:'male'}] as const
