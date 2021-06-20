export const MODIFY_RESULT = 'MODIFY_RESULT';
export const TOGGLE_CALC = 'TOGGLE_CALC'

export const modifyResult = (payload)=>({
    type:MODIFY_RESULT, 
    payload:payload
})

export const toggleCalc = ()=>({
    type:TOGGLE_CALC
})