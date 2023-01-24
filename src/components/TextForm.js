import React from 'react';
import { useState } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState("Enter text here");

    const bclr = props.mode === "dark" ? "#2f4e89" : "white";
    const tclr = props.mode === "dark" ? "white" : "black";

    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        const toggle = document.getElementById("toggle");
        if(toggle.textContent==="Read Aloud"){
            toggle.innerHTML="Stop";
            props.showAlert("Read Aloud started","success")
        }else{
            props.showAlert("Read Aloud stopped","success")
            toggle.innerHTML="Read Aloud";
            window.speechSynthesis.cancel();
        }
    }
   
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase", "success");
    }
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase", "success");
    }
    const handleClearClick = () => {
        setText("");
        props.showAlert("Text cleared", "success");
    }
    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Text copied to clipboard", "success");
    }
    
    const formatText = () => {
        let newText = text.split(/[ ]+/).join(" ");    //handleExtraSpace
        newText = newText.split(/\r?\n/).filter(line => line.trim() !== '').join('\n');  //removeEmptyLines
        let myValue = newText.toLowerCase()    //firstCap
        let newValue = myValue.split('.')
        let newarray = []
        for (let i = 0; i < newValue.length; i++) {
            let arrayValue;
            if (i === 0) {
                arrayValue = newValue[i][0].toUpperCase() + newValue[i].slice(1);
            }
            else if(newValue[i][0]===' '){
                arrayValue = " " + newValue[i][1].toUpperCase() + newValue[i].slice(2);
            }
            else{
                arrayValue = " " + newValue[i][0].toUpperCase() + newValue[i].slice(1);
            }
            newarray.push(arrayValue)
        }
        newText = newarray.join('.')
        setText(newText)
        props.showAlert("Text formatted", "success");
    }
    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    return (
        <>

            <div className='container' style={{ color: tclr }}>
                <h1 className='mb-3'>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" style={{ backgroundColor: bclr, color: tclr }} value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
                </div>
                
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={formatText}>Format Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>Copy Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length === 0} type="submit" id="toggle" onClick={speak} className="btn btn-primary mx-1 my-1">Read Aloud</button>
            </div>
            <div className="container my-3" style={{ color: tclr }}>
                <h1>Your text summary</h1>
                <p>{text.split(/\s+/).filter((ele) => { return ele.length !== 0 }).length} Words and {text.replace(/\s+/g, '').length} Characters</p>
                <p>{0.008 * (text.split(" ").filter((ele) => { return ele.length !== 0 }).length)} minutes read time</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    )
}
