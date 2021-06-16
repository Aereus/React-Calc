import React,{useState} from 'react'
import './App.css';
import Button from './components/Button'


function App() {
  const operators=['*','+','-','/'];
  const [result,setResult] = useState("");
  const ButtonClick = (e) =>{
    if(!(operators.includes(e.target.value)&&operators.includes(result[result.length-1]))){
      return setResult(result+e.target.value);}
    return setResult(result.slice(0,-1)+e.target.value);
  }
  const ClearClick = (e)=>(setResult(""));

  const EqualClick = (e)=>(setResult(eval(result)));

  const Backspace = (e)=>(setResult(result.slice(0,-1)));

  return (
    <div className="App">
      <div className="row">
        <input type="text" disabled="true" value={result}/>
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
    
        <Button handleClick={ButtonClick} style={{flex:2}}  value={0}/>
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
  );
}

export default App;
