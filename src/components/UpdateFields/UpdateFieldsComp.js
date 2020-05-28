import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import config from "../../config"

export default function UpdateFieldsComp() {

    var server_address = config.app_info.server_address;
    var post_sheetinfo = config.app_info.endpoints.sheetinfo;
    var post_tlogname = config.app_info.endpoints.tlogname;
    var post_receiptline = config.app_info.endpoints.receiptline;
    var post_resultcols = config.app_info.endpoints.resultcols;

    const [input, setInput] = useState({
        tlogname: '',
        reportcol: '',
        passfailcol: '',
        sheetaddress: '',
        sheetname: '',
        receiptline: ''       
    })

    var tlogname = '';
    var reportcol = '';
    var passfailcol = '';
    var sheetaddress = '';
    var sheetname = '';
    var receiptline = '';
    
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
    
    const component_style = {
        width: '20%', 
        float:'right', 
        paddingTop: '1em'
    }

    const update_receipt = () => {

        if(receiptline){
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
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
    }

    const update_sheetinfo = () => {
        if(sheetname && sheetaddress){
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
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
    }

    const update_resultscol = () => {
        if(reportcol && passfailcol){
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
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
    }

    const update_tlogname = () => {
        if(tlogname){
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
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
    }
 
    return (
        <div>
            <div style={component_style} className="input-fields">
                <div style={form_container_style}>
                   <div style={input_container_style} className="sheetinfo">
                       <label style={label_container_style} htmlFor="sheetaddress">Sheet Address: </label>
                       <input onChange={(e) => {sheetaddress = e.target.value}} style={input_style} name="sheetaddress" required>
                       </input>
                   </div> 
                   <div style={input_container_style} className="sheetinfo">
                       <label style={label_container_style} htmlFor="sheetname">Sheet Name: </label>
                       <input onChange={(e) => {sheetname = e.target.value}} style={input_style} name="sheetname" required>
                       </input>
                   </div>
                   <div style={button_container_style}>
                        <Button onClick={update_sheetinfo}>Update</Button>
                   </div>
                </div>
                <div style={form_container_style}>
                   <div style={input_container_style} className="resultcolsinfo">
                      <label style={label_container_style} htmlFor="passfailcol">Pass/Fail Column: </label>
                       <input onChange={(e) => {passfailcol = e.target.value}}  style={input_style} name="passfailcol" required>
                       </input>
                   </div> 
                   <div style={input_container_style} className="resultcolsinfo">
                       <label style={label_container_style} htmlFor="reportcol">Report Column: </label>
                       <input  onChange={(e) => {reportcol = e.target.value}} style={input_style} name="reportcol" required>
                       </input>
                   </div>
                   <div style={button_container_style}>
                        <Button onClick={update_resultscol}>Update</Button>
                        
                   </div>
                </div>
                <div style={form_container_style}>
                   <div style={input_container_style} className="receiptlineinfo">
                       <label style={label_container_style} htmlFor="receiptline">Tag: </label>
                       <input  onChange={(e) => {receiptline = e.target.value}} style={input_style} name="receiptline" required>
                       </input>
                   </div> 
                   <div style={button_container_style}>
                        <Button onClick={update_receipt}>Update</Button>
                   </div>
                </div>
                <div style={form_container_style}>
                   <div style={input_container_style} className="tlognameinfo">
                       <label style={label_container_style} htmlFor="tlogleading">Tlog [______]_1883_002_4784.xml: </label>
                       <input onChange={(e) => {tlogname = e.target.value}} style={input_style} name="tlogleading" required>
                       </input>
                   </div> 
                   <div style={button_container_style}>
                        <Button onClick={update_tlogname}>Update</Button>
                   </div>
                </div>
            </div>
            
        </div>
    )
}
