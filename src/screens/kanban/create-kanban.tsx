import { Input } from "antd"
import { useState } from "react"
import { useAddKanban } from "utils/kanban"

import { Container } from "./kanban-column"
import { useKanbanQueryKey, useProjectIdInUrl } from "./util"

export const CreateKanban = () => {
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl()
    const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey())

    const submit = async () => {
        await addKanban({ name, projectId })
        setName('')
    }

    return <Container>
            <Input
                size={'large'}
                placeholder={'新建看板名称'}
                value={name}
                onPressEnter={submit}
                onChange={evt => setName(evt.target.value)}
            />
        </Container>

}