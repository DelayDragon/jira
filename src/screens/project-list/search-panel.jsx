import { useEffect, useState } from "react"

export const SearchPanel = ()=>{
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])

    useEffect(()=>{
        fetch('').then(async res => {
            if(res.ok){
                setList(await res.json())
            }
        })
    }, [param])

    return <form>
        <div>
            {/* setParam(Object.assign({}, param, {name:evt.target.value})) */}
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name:evt.target.value
            })}></input>
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId:evt.target.value
            })} id="">
                <option value="">负责人</option>
                {
                    users.map(user => <option value={user.id}>{user.anme}</option>)
                }
            </select>
        </div>
    </form>
} 