import React from 'react';
import { useState } from 'react';

export default function TextForm(props) {
    const [text,setText] = useState("Enter text here");

    const bclr = props.mode==="dark"?"#2f4e89":"white";
    const tclr = props.mode==="dark"?"white":"black";

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase","success");
    }
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase","success");
    }
    const handleClearClick = () => {
        setText("");
        props.showAlert("Text cleared","success");
    }
    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Text copied to clipboard","success");
    }
    const handleExtraSpace = () => {
        let newText=text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed","success");
    }
    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    return (
        <>
        
        <div className='container' style={{color:tclr}}>
            <h1 className='mb-3'>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" style={{backgroundColor: bclr, color:tclr}} value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
            </div>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to uppercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to lowercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpace}>Remove extra spaces</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>Copy text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear text</button>
        </div>
        <div className="container my-3" style={{color:tclr}}>
            <h1>Your text summary</h1>
            <p>{text.split(/\s+/).filter((ele)=>{ return ele.length!==0}).length} Words and {text.replace(/\s+/g, '').length} Characters</p>
            <p>{0.008*(text.split(" ").filter((ele)=>{ return ele.length!==0}).length)} minutes read time</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to preview!"}</p>
        </div>
        </>
    )
}
