import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const style = { padding: 5 }

    const handleChange = (event) => dispatch(setFilter(event.target.value))

    return (
        <div style={style}>
            Filter: <input onChange={handleChange} />
        </div>
    )
}

export default Filter
