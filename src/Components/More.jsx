import React,{useState} from 'react'
import More_details from "./More_details";
import './More.css'
// import Toggle_btn from "./Toggle_btn";
const More = (data) => {
    const [Toggle,setToggle]=useState(false)
    
    const btn_name=()=>{
        if(Toggle===false) return "More"
        return "Less"
    }
    const btn_click=()=>{
        setToggle((prev)=>(!prev))
    }

  return (
    <div className='more'>
      {Toggle === false ? (
        <div>
            <button className='more_btn' onClick={btn_click}>{btn_name()}</button>
        </div>
      ) : (
        <div className='more'>
          <More_details data={data.data}/>
          <button className='more_btn' onClick={btn_click}>{btn_name()}</button>
        </div>
      )}
    </div>
  );
}

export default More
{
  /* <Toggle_btn state={true} onClick={()=>{setToggle(false)}}/> */
}