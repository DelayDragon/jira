import styled from "@emotion/styled";
import React from "react";
import { Button, Spin, Typography } from "antd";

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ButtonNoPadding = styled(Button)`
    padding: 0;
`
// 类型守卫
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({error}:{error: unknown}) => {
    if(isError(error)){
        return <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
    }
    return null
}

export const FullPageLoading = () => <FullPage>
    <Spin size={"large"}></Spin>
</FullPage>


export const FullPageErrorFallback = ({ error }: { error: Error | null }) => <FullPage>
    {/* <Typography.Text type={'danger'}>{error?.message}</Typography.Text> */}
    <ErrorBox error={error}/>
</FullPage>

export const ScreenContainer = styled.div`
    padding: 3.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const Row = styled.div<{
    gap?: number | boolean;
    between?: Boolean;
    marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom ? props.marginBottom + "px" : undefined};
  > * {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-right: ${(props) =>
        typeof props.gap === "number"
            ? props.gap + "rem"
            : props.gap
                ? "2rem"
                : undefined};
  }
`;





