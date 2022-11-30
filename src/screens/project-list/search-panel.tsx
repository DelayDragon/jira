import React from 'react'
import { Form, Input, Select } from 'antd'
import { Project } from "../../types/Project";
import { UserSelect } from 'component/user-select';
import { User } from '../../types/User';
interface SearchPanelProps {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>
    setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
    return <Form style={{marginBottom:'2rem'}} layout={'inline'}>
        <Form.Item>
            {/* setParam(Object.assign({}, param, {name:evt.target.value})) */}
            <Input
                type="text"
                value={param.name}
                onChange={evt => setParam({
                    ...param,
                    name: evt.target.value
                })}
                placeholder={'项目名'}
            ></Input>
        </Form.Item>
        <Form.Item>
            <UserSelect 
            defaultOptionName={'负责人'}
            value={param.personId} 
            onChange={value => setParam({
                ...param,
                personId: value
            })}></UserSelect>
        </Form.Item>
    </Form>
} 