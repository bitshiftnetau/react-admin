import React, { useState, useRef } from 'react'
import { Button } from 'react-bootstrap'
import config from "../../config"
import JsonPathPickerComp from "../JsonPathPicker/JsonPathPickerComp"
import { AgGridReact } from 'ag-grid-react';
import { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid } from 'ag-grid-community';

export default function ConfigFileDisplayComp(props) {
 
    const agGrid = useRef(null)

    var json_pathpicker_style = {
        width: "100%",
        marginLeft: "2em",
        marginTop: "1em"
    }; 

    const deleteValue = () => {
       
        var rows = agGrid.current.api.getSelectedRows();

        var server_address = config.app_info.server_address;
        var post_config = config.app_info.endpoints.config_delete;
        
        var url = `${server_address}${post_config}`;

        console.log(rows);

        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                "value_array": rows // body data type must match "Content-Type" header)
            })            
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
            props.loadConfig && props.loadConfig();
            props.showToast && props.showToast();
        });
    }

    return (
        <div 
            className="ag-theme-alpine"
            style={{
            height: '600px',
            width: '100%' }}
        >
            <Button onClick={deleteValue}>Delete</Button>
            <AgGridReact
                ref={agGrid}
                columnDefs={props.columnDefs}
                rowData={props.rowData}
                rowSelection="multiple">
            </AgGridReact>
        </div>
    )
}
