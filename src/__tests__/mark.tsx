import React from 'react'
import { Mark } from 'component/mark'
import {render, screen} from '@testing-library/react'


test('Mark 组件正确高亮关键词', () => {
    const name = '物料管理'
    const keyword = '管理'

    render(<Mark name={name} keyword={keyword}></Mark>)

    expect(screen.getByText(keyword)).toBeInTheDocument()
    expect(screen.getByText(keyword)).toHaveStyle('color: skyblue')
    expect(screen.getByText('物料')).not.toHaveStyle('color: skyblue')
})