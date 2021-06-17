import React,{useState} from 'react'
import './App.css';
import Button from './components/Button'


function App() {
  const operators=['*','+','-','/'];
  const [result, setResult] = useState("");
  const [calcOver,setCalc]=useState(0);
 
  
  const reset = ()=>{
    if(calcOver!==0){
      setCalc(0);
    }
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
        <input type="text" disabled={true} value={result}/>
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
        <Button clName="saveClass" value={'Save'}></Button>
      </div>
    </div>
    </div>
    
  );
}

export default App;
