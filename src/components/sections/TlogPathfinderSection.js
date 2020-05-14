import React, { useState, useEffect } from 'react'
import JsonPathPickerComp from "../JsonPathPicker/JsonPathPickerComp.js";
import { state } from '../../fakedata.js';
import Button from 'react-bootstrap/Button';

export default function TlogPathfinderSection() {
   
    console.log("render: TlogPathFinderSection");
    const [state, setState] = useState({
        json: null,
        path: null,
        pathText: '',
    });

    /*
    var _p = {
        json: state.json,
        onChoose: (path) => setState({path, pathText:path}),
        path: state.path,
        showOnly: false 
    };
    
    var _s = {
        choosen: ""
    };
    */

    const select = () => {
        console.log("clicked");
    }

    var _text = ''
    const generate = () => {
        if(_text.length > 0){
            setState({
                json: _text.trim() || '""'
            })
        }
    }

    return (
        <div>
            <div>
            <div style={{width:'29%',height:800,float:'left',boxSizing:'border-box',paddingLeft:'6em', paddingTop:"2em",borderRight:'1px solid #888'}}>
                <textarea
                    style={{width:'80%',height:300}}
                    onChange={(e)=> {
                            _text = e.target.value
                        }
                    }
                />
                <p><button style={{width:'80%'}} onClick={generate}>generate</button></p>
           </div>
            <div style={{width:'70%',float:'left',boxSizing:'border-box',paddingLeft:'2em', paddingTop:"2em"}}>
                <input
                    style={{width:'80%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                    onChange={(e)=> {
                        setState({
                            pathText: e.target.value
                        })
                    }}
                    value={state.pathText}
                readOnly/>
                <div>
                    <Button style={{marginBottom: "1em", marginTop: "1em"}} onClick={select}>Import selected value</Button>
                </div>
                <JsonPathPickerComp
                    json={state.json}
                    path={state.path}
                    onChoose={(path, json)=> setState({path, pathText:path, json, json:state.json})}
                    showOnly={false} 
                />
            </div>
        </div>
        </div>
    )
}
