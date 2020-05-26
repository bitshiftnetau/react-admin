import React, { useState, useEffect } from 'react'
import { BsFillBackspaceFill } from "react-icons/bs";
import JsonPathPickerComp from "../JsonPathPicker/JsonPathPickerComp.js";
import Button from 'react-bootstrap/Button';
import { FilePond, File, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';


registerPlugin(FilePondPluginFileValidateType);

var json_string = JSON.stringify({
    "name":"John",
    "age":30,
    "cars": [
      { "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
      { "name":"BMW", "models":[ "320", "X3", "X5" ] },
      { "name":"Fiat", "models":[ "500", "Panda" ] }
    ]
});

function TlogPathfinderSection() {
 
    const [state, setState] = useState({
        json: null,
        path: null,
        pathText: '',
        filename: ''
    });

    var tlogname = '';
    var reportcol = '';
    var passfailcol = '';
    var sheetaddress = '';
    var sheetname = '';
    var receiptline = '';
 
    var server_address = "https://localhost:8090";
    var post_xml = "/xml";
    var post_json = "/json";
    var post_path = "/path";
    var post_sheetinfo = "/sheetinfo";
    var post_tlogname = "/tlogname";
    var post_receiptline = "/receiptline";
    var post_resultcols = "/resultcols"
  
    

            const update_path = () => {
                var url = `${server_address}${post_path}`;
                fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        "path": state.pathText // body data type must match "Content-Type" header)
                    })
                })
                .then(res => res.text())
                .then(data => {
                    console.log("path updated");
                })
            }

            const update_receipt = () => {
                var url = `${server_address}${post_receiptline}`;
                fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        "receiptline": receiptline, // body data type must match "Content-Type" header)
                    })
                })
                .then(res => res.text())
                .then(data => {
                    console.log("receiptline updated");
                })
            }

            const update_sheetinfo = () => {
                var url = `${server_address}${post_sheetinfo}`;
                fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        "sheetname": sheetname, // body data type must match "Content-Type" header)
                        "sheetaddress": sheetaddress
                    })
                })
                .then(res => res.text())
                .then(data => {
                    console.log("sheet updated");
                })
            }

            const update_resultscol = () => {
                var url = `${server_address}${post_resultcols}`;
                fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        "report": reportcol, // body data type must match "Content-Type" header)
                        "passfail": passfailcol
                    })
                })
                .then(res => res.text())
                .then(data => {
                    console.log("resultcols updated");
                })
            }

            const update_tlogname = () => {
                var url = `${server_address}${post_tlogname}`;
                fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        "tlogname": tlogname // body data type must match "Content-Type" header)
                    })
                })
                .then(res => res.text())
                .then(data => {
                    console.log("tlogname updated");
                })
            }
    
    const fetch_json = (file_filename) => {
        
        console.log("fetch_json", file_filename);
        var url = `${server_address}${post_json}`;

        setState({
            filename: file_filename
        });
        fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({
                    "filename": file_filename // body data type must match "Content-Type" header)
                })            
            })
            .then(res => res.text())
            .then(data => {
                console.log("fetch_json", data);
                setState({json: data}); 
            })
    };

    const input_style = {
        marginBottom: '0.5em',
        marginTop: '0.5em',
        marginLeft: '1em'
    }

    const input_container_style = {
        textAlign: 'right',
        display: 'block'
    }

    const button_container_style = {
        textAlign: 'right'
    }

    const form_container_style = {
        width: '95%', 
        margin: '0.5em'
    }

    const label_container_style = {
        marginLeft: '1em'
    }

    
    const set_input = (name, value) => {
      
        if(name == "sheetname"){
            sheetname = value
        }
        if(name == "tlogname"){
            tlogname = value
        }
        if(name == "receiptline"){
            receiptline = value
        }
        if(name == "passfailcol"){
            passfailcol = value
        }
        if(name == "sheetaddress"){
            sheetaddress = value
        }
        if(name == "reportcol"){
            reportcol = value
        }
    }

    return (
        <div>
            <FilePond 
                name={"file"} 
                server={`${server_address}${post_xml}`} 
                onerror={(error) => (console.error(error))} 
                acceptedFileTypes={['text/xml']}
                onprocessfile={(error, files) => {
                    if(!error){
                        console.log(files);
                            fetch_json(files.filename) 
                        }
                    }
                }
            />
                <div style={{width:'50%',float:'left',boxSizing:'border-box',paddingLeft:'2em', paddingTop:"2em"}}>
                    <input
                        style={{width:'80%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                        onChange={(e)=> {
                            setState({
                                pathText: e.target.value
                            })
                        }}
                        value={state.pathText || ''}
                    readOnly />
                    <div>
                        <Button style={{marginBottom: "1em", marginTop: "1em"}} onClick={update_path}>Import selected value</Button>
                    </div>
                    <JsonPathPickerComp
                        json={state.json}
                        path={state.path}
                        onChoose={(path, json)=> setState({path, pathText:path, json, json:state.json})}
                        showOnly={false} 
                    />
                </div>
                <div style={{width: '50%', float:'right', paddingTop: '2em'}} className="input-fields">
                    <div style={form_container_style}>
                       <div style={input_container_style} className="sheetinfo">
                           <label style={label_container_style} htmlFor="sheetname">Sheet Name: </label>
                           <input onChange={(e) => {set_input("sheetname", e.target.value)}} style={input_style} name="sheetname">
                           </input>
                           <label style={label_container_style} htmlFor="sheetaddress">Sheet Address: </label>
                           <input onChange={(e) => {set_input("sheetaddress", e.target.value)}} style={input_style} name="sheetaddress">
                           </input>
                       </div> 
                       <div style={button_container_style}>
                            <Button onClick={() => {console.log(sheetname, sheetaddress)}}>Update</Button>
                       </div>
                    </div>
                    <div style={form_container_style}>
                       <div style={input_container_style} className="resultcolsinfo">
                           <label style={label_container_style} htmlFor="reportcol">Report Column: </label>
                           <input  onChange={(e) => {set_input("reportcol", e.target.value)}} style={input_style} name="reportcol">
                           </input>
                           <label style={label_container_style} htmlFor="passfailcol">Pass/Fail Column: </label>
                           <input onChange={(e) => {set_input("passfailcol", e.target.value)}}  style={input_style} name="passfailcol">
                           </input>
                       </div> 
                       <div style={button_container_style}>
                            <Button onClick={() => {console.log(passfailcol, reportcol)}}>Update</Button>
                            
                       </div>
                    </div>
                    <div style={form_container_style}>
                       <div style={input_container_style} className="receiptlineinfo">
                           <label style={label_container_style} htmlFor="receiptline">Tag: </label>
                           <input  onChange={(e) => {set_input("receiptline", e.target.value)}} style={input_style} name="receiptline">
                           </input>
                       </div> 
                       <div style={button_container_style}>
                            <Button onClick={() => {console.log(receiptline)}}>Update</Button>
                       </div>
                    </div>
                    <div style={form_container_style}>
                       <div style={input_container_style} className="tlognameinfo">
                           <label style={label_container_style} htmlFor="tlogleading">Tlog [______]_1883_002_4784.xml: </label>
                           <input onChange={(e) => {set_input("tlogname", e.target.value)}} style={input_style} name="tlogleading">
                           </input>
                       </div> 
                       <div style={button_container_style}>
                            <Button onClick={() => {console.log(tlogname)}}>Update</Button>
                       </div>
                    </div>
                </div>
                
        </div>
    )
}
var TlogPathfinderSectionMemo;

export default TlogPathfinderSectionMemo = React.memo(TlogPathfinderSection);
/*

                onload = {
                    fetch(`${server_address}${get_json}`)
                    .then(res => setState({
                            json: res.json
                        })
                    )
                }*/
                
