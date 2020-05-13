import React, { useState, useEffect } from 'react'
import JsonPathPickerComp_memo from "../JsonPathPicker/JsonPathPickerComp.js";
import { state } from '../../fakedata.js';

export default function TlogPathfinderSection() {

    const [state, setState] = useState({
        json: null,
        path: null,
        pathText: ''
    });

    var _p = {
        json: state.json,
        onChoose: (path) => setState({path, pathText:path}),
        path: state.path,
        showOnly: false 
    };

    var _s = {
        choosen: ""
    };

    var _text = ''
    const generate = () => {
        console.log("_text.trim()", _text.trim());
        setState({
            json: _text.trim() || '""'
        })
    }
    const mapPath = () => {
        setState({
            path: state.pathText
        })
    }


    return (
        <div>
            <div>
            <div style={{width:'29%',height:800,float:'left',boxSizing:'border-box',paddingLeft:'100px',borderRight:'1px solid #888'}}>
                <textarea
                    style={{width:'80%',height:300}}
                    onChange={(e)=> {
                        _text = e.target.value
                        //console.log(e.target.value)
                        }
                    }
                />
                <p><button style={{width:'80%'}} onClick={generate}>generate</button></p>
                <textarea
                    style={{width:'80%',minHeight:'100px',boxSizing:'border-box',border:'1px solid #108ee9',padding:'10px'}}
                    onChange={(e)=> {
                        setState({
                            pathText: e.target.value
                        })
                    }}
                    value={state.pathText}
                />
                <p><button style={{width:'80%'}} onClick={mapPath}>map path</button></p>
            </div>
            <div style={{width:'70%',float:'left',boxSizing:'border-box',paddingLeft:'50px'}}>
                <JsonPathPickerComp_memo
                    P={_p} S={_s}
                />
            </div>
        </div>
        </div>
    )
}
