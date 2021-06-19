import react from 'react';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Button from './components/Button'


function Home(){
    const operators=['*','+','-','/'];
    const [result, setResult] = useState("");
    const [calcOver,setCalc]=useState(0);


    const reset = ()=>{
    if(calcOver!==0){
        setCalc(0);
    }
    }
    const saveResult =async ()=>{
    
    fetch("http://localhost:8080/result",{
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
        },
        method: 'POST',
        body:JSON.stringify({"result":result}),
    })
    .then(response=>{console.log(response);return response.json()})
    .then(data=>{console.log(data)})
    .catch(err=>console.log(err))    
    }
    
    const ButtonClick = (e) =>{
    reset();
    if(!(operators.includes(e.target.value)&&operators.includes(result[result.length-1]))){
        return setResult(calcOver?e.target.value:result+e.target.value);}
    return setResult(result.slice(0,-1)+e.target.value);
    }
    
    const ClearClick = (e) => (setResult(""));


    const EqualClick = (e) => {
    try{
        let rescop=result;
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
        setResult(parseFloat(eval(rescop).toFixed(5)));
        }
    }catch(e){setResult('Math Error');}
    setCalc(1);
    }

    const Backspace = (e)=>{
    if(result.length!==0)
    {setResult(String(result).slice(0,-1))}
    };

    return (
    <div className="App">
        <div className="container">
            <div className="row">           
             <input type="text" readOnly={true} value={result}/>              
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
            <Button value={'Save'} handleClick={saveResult} clName="saveClass"></Button>
            </div>
        </div>
    </div>
    
    );
}