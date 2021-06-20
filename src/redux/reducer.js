import {MODIFY_RESULT,TOGGLE_CALC} from './action'

const initialState={
    data:'',
    calcOver:false
}

const resultReducer = (state= initialState ,action)=>{
    switch(action.type){
        case MODIFY_RESULT:
            return {
                ...state,
                data:action.payload
            };
        case TOGGLE_CALC:
            return{
                ...state,
                calcOver:!state.calcOver,
            }
        default:
            return state;
    }
}

export default resultReducer