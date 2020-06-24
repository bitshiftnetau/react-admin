import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import config from "../../config"

export default function UpdateFieldsComp(props) {

    var server_address = config.app_info.server_address;
    var post_sheetinfo = config.app_info.endpoints.sheetinfo;
    var post_tlogname = config.app_info.endpoints.tlogname;
    var post_receiptline = config.app_info.endpoints.receiptline;
    var post_resultcols = config.app_info.endpoints.resultcols;

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
        width: '100%' 
    }

    const label_container_style = {
        marginLeft: '1em'
    }
    
    const component_style = {
        width: '30%', 
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
                props.loadConfig && props.loadConfig();
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
                props.loadConfig && props.loadConfig();
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
                props.loadConfig && props.loadConfig();
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
                props.loadConfig && props.loadConfig();
            })
        }
    }
 
    return (
        <div>
            <div style={component_style} className="input-fields">
                <div style={form_container_style}>
                   <div style={input_container_style} className="sheetinfo">
                   <div>Sheet Address:</div>   
                   <input
                        style={{marginBottom: '0.5em', width:'80%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                        value={props.runtime_sheet_info.spreadsheet_id || ''}
                    readOnly />
                       <input onChange={(e) => {sheetaddress = e.target.value}} style={input_style} name="sheetaddress" required placeholder="input new address">
                       </input>
                   </div> 
                   <div style={input_container_style} className="sheetinfo">
                   <div>Sheet Name:</div>
                   <input
                        style={{marginBottom: '0.5em', width:'80%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                        value={props.runtime_sheet_info.sheet_name || ''}
                    readOnly />
                       <input onChange={(e) => {sheetname = e.target.value}} style={input_style} name="sheetname" required placeholder="input new name">
                       </input>
                   </div>
                   <div style={button_container_style}>
                        <Button onClick={update_sheetinfo}>Update</Button>
                   </div>
                </div>
                <div style={form_container_style}>
                   <div style={input_container_style} className="resultcolsinfo">
                   <div>Pass/Fail Column:</div>
                        <input
                            style={{marginBottom: '0.5em', width:'80%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                            value={props.report_columns.results_name || ''}
                        readOnly />
                        <input onChange={(e) => {passfailcol = e.target.value}}  style={input_style} name="passfailcol" required placeholder="input runtime sheet column">
                        </input>
                   </div> 
                   <div style={input_container_style} className="resultcolsinfo">
                   <div>Report Column:</div>
                        <input
                            style={{marginBottom: '0.5em', width:'80%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                            value={props.report_columns.report_name || ''}
                        readOnly />
                       <input  onChange={(e) => {reportcol = e.target.value}} style={input_style} name="reportcol" required placeholder="input runtime sheet column">
                       </input>
                   </div>
                   <div style={button_container_style}>
                        <Button onClick={update_resultscol}>Update</Button>
                        
                   </div>
                </div>
                <div style={form_container_style}>
                   <div style={input_container_style} className="receiptlineinfo">
                       <div>Tag:</div>
                        <input
                            style={{marginBottom: '0.5em', width:'80%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                            value={props.tlog_fileinfo.receipt_image || ''}
                        readOnly />
                       <input  onChange={(e) => {receiptline = e.target.value}} style={input_style} name="receiptline" required placeholder="input the new tag">
                       </input>
                   </div> 
                   <div style={button_container_style}>
                        <Button onClick={update_receipt}>Update</Button>
                   </div>
                </div>
                <div style={form_container_style}>
                   <div style={input_container_style} className="tlognameinfo">
                        Tlog:
                        <input
                            style={{marginBottom: '0.5em', width:'27%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                            value={props.tlog_filename.leading_name || ''}
                        readOnly />
                        _
                        <input
                            style={{marginBottom: '0.3em', width:'13%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                            value={props.tlog_filename.a || ''}
                        readOnly />
                        _
                        <input
                            style={{marginBottom: '0.3em', width:'13%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                            value={props.tlog_filename.b || ''}
                        readOnly />
                        _
                        <input
                            style={{marginBottom: '0.5em', width:'23%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                            value={props.tlog_filename.c || ''}
                        readOnly />
                        .xml
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
