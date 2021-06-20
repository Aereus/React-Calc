
import './Home.css'
import React,{useState} from 'react'
import Button from './components/Button'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import {modifyResult,toggleCalc} from './redux/action'

function Home(){
    const operators=['*','+','-','/'];
    // const [result, setResult] = useState("");
    // const [calcOver,setCalc]= useState(0);
    const dispatch = useDispatch();
    const res = useSelector(state=>state.data);
    const calcO = useSelector(state=>state.calcOver);

    
    const reset = ()=>{
    if(calcO!==false){
        dispatch(toggleCalc());
    }
    }
    const saveResult =async ()=>{
    if(res.length!==0)
    {
        fetch("http://localhost:8080/result",{
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        method: 'POST',
        body:JSON.stringify({"result":res}),
        })
        .then(response=>{console.log(response);return response.json()})
        .then(data=>{console.log(data)})
        .catch(err=>console.log(err))}    
    }
    
    const ButtonClick = (e) =>{
    reset();
    if(!(operators.includes(e.target.value)&&operators.includes(res[res.length-1]))){
        return dispatch(modifyResult(calcO?e.target.value:res+e.target.value))}
    return dispatch(modifyResult(res.slice(0,-1)+e.target.value));
    }
    
    const ClearClick = (e) => (dispatch(modifyResult('')));


    const EqualClick = (e) => {
    try{
        let rescop=res;
        if(rescop.length !== 0)
        { 
        let start=1;
        for(let i=0;i<rescop.length;i++){
            if(start===1&&rescop[i]==0){
            rescop=rescop.slice(0,i)+rescop.slice(i+1);
            continue;
            }
            start=0;
            if(operators.includes(rescop[i])){
            start=1;
            }
        }
        dispatch(modifyResult(parseFloat(eval(rescop).toFixed(5))));
        }
    }catch(e){dispatch(modifyResult('Math Error'))}
    dispatch(toggleCalc())
    }

    const Backspace = (e)=>{
    if(res.length!==0)
    {dispatch(modifyResult(String(res).slice(0,-1)))}
    };

    return (
    <div className="App">
        <div className="container">
            <div className="row">           
             <input type="text" readOnly={true} onChange={(e)=>console.log(e.target.value)} value={res}/>              
            </div>
            <div className="row">
            <Button handleClick={ButtonClick} value={7}/>
            <Button handleClick={ButtonClick} value={8}/>
            <Button handleClick={ButtonClick} value={9}/>
            <Button handleClick={ButtonClick} clName="operatorClass" value={'*'}/>
            </div>
            <div className="row">
            <Button handleClick={ButtonClick} value={4}/>
            <Button handleClick={ButtonClick} value={5}/>
            <Button handleClick={ButtonClick} value={6}/>
            <Button handleClick={ButtonClick} clName="operatorClass" value={'/'}/>
            </div>
            <div className="row">
            <Button handleClick={ButtonClick} value={1}/>
            <Button handleClick={ButtonClick} value={2}/>
            <Button handleClick={ButtonClick} value={3}/>
            <Button handleClick={ButtonClick} clName="operatorClass" value={'-'}/>
            </div>
            <div className="row">    
            <Button handleClick={ButtonClick} style={{flex:2.1}}  value={0}/>
            <Button handleClick={Backspace} value={'C'}/>
            <Button handleClick={ButtonClick} clName="operatorClass" value={'+'}/>         
            </div>
            <div className="row">
            <Button handleClick={ClearClick} clName="saveClass" value={'Clear'}/>
            <Button handleClick={EqualClick} clName="operatorClass" value={'='}/>
            </div>
            <div className="row">
            <Link to="/result" className="linkClass"><Button value={'Save'} handleClick={saveResult} clName="saveClass"/></Link>
            </div>
        </div>
    </div>
    
    )
}

export default Home;

