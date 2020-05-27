import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function UpdateFieldsComp() {

    var server_address = "https://localhost:8090";
    var post_sheetinfo = "/sheetinfo";
    var post_tlogname = "/tlogname";
    var post_receiptline = "/receiptline";
    var post_resultcols = "/resultcols"

    const [input, setInput] = useState({
        tlogname: '',
        reportcol: '',
        passfailcol: '',
        sheetaddress: '',
        sheetname: '',
        receiptline: ''       
    })

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
            setInput({ sheetname: value})
        }
        if(name == "tlogname"){
            setInput({ tlogname: value})
        }
        if(name == "receiptline"){
            setInput({ receiptline: value})
        }
        if(name == "passfailcol"){
            setInput({ passfailcol: value})
        }
        if(name == "sheetaddress"){
            setInput({ sheetaddress: value})
        }
        if(name == "reportcol"){
            setInput({ reportcol: value})
        }
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
                "receiptline": input.receiptline, // body data type must match "Content-Type" header)
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
                "sheetname": input.sheetname, // body data type must match "Content-Type" header)
                "sheetaddress": input.sheetaddress
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
                "report": input.reportcol, // body data type must match "Content-Type" header)
                "passfail": input.passfailcol
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
                "tlogname": input.tlogname // body data type must match "Content-Type" header)
            })
        })
        .then(res => res.text())
        .then(data => {
            console.log("tlogname updated");
        })
    }
 
    return (
        <div>
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
                        <Button onClick={update_sheetinfo}>Update</Button>
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
                        <Button onClick={update_resultscol}>Update</Button>
                        
                   </div>
                </div>
                <div style={form_container_style}>
                   <div style={input_container_style} className="receiptlineinfo">
                       <label style={label_container_style} htmlFor="receiptline">Tag: </label>
                       <input  onChange={(e) => {set_input("receiptline", e.target.value)}} style={input_style} name="receiptline">
                       </input>
                   </div> 
                   <div style={button_container_style}>
                        <Button onClick={update_receipt}>Update</Button>
                   </div>
                </div>
                <div style={form_container_style}>
                   <div style={input_container_style} className="tlognameinfo">
                       <label style={label_container_style} htmlFor="tlogleading">Tlog [______]_1883_002_4784.xml: </label>
                       <input onChange={(e) => {set_input("tlogname", e.target.value)}} style={input_style} name="tlogleading">
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
