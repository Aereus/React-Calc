import {useSelector} from 'react-redux'


function Result(){
    const res = useSelector(state=>state.data)
    return(
        <div>
            {res}
        </div>
    )
}

export default Result