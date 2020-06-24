import React, { useState, useEffect } from 'react'
import JsonPathPickerComp from "../JsonPathPicker/JsonPathPickerComp.js";
import { FilePond, File, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import ResponseToast from "../Toast/UpdateResponseToastComp";
import UpdateFieldsComp from "../UpdateFields/UpdateFieldsComp";
import PathDisplayComp from "../PathDisplay/PathDisplayComp";
import ConfigFileDisplay from "../ConfigFileDisplay/ConfigFileDisplayComp"
import config from "../../config"
import 'bootstrap/dist/css/bootstrap.css';

registerPlugin(FilePondPluginFileValidateType);


function TlogPathfinderSection(props) {
 
    const [state, setState] = useState({
        json: null,
        path: null,
        pathText: '',
        filename: '',
        report_columns: {
            results_name: '',
            report_name: ''
        },
        tlog_filename: {
            leading_name: '',
            a: '',
            b: '',
            c: ''
        },
        tlog_fileinfo : {
            receipt_image: ''
        },
        runtime_sheet_info: {
            spreadsheet_id: '',
            sheet_name: ''
        },
        columnDefs: [{
            headerName: "Field Name", field: "name", checkboxSelection: true
        }, {
            headerName: "Path", field: "path" 
        }, {
            headerName: "Type", field: "type"
        }],
        rowData: [],
        toast_show: false
    });

    var server_address = config.app_info.server_address;
    var post_xml = config.app_info.endpoints.xml;
    var post_json = config.app_info.endpoints.json;
    var post_config = config.app_info.endpoints.config;

    const fetch_json = (file_filename) => {
        
        var url = `${server_address}${post_json}`;

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
                setState((state) => {
                    return {...state, json: data}; 
                }
            )
        });
    }

    const loadConfig = () => {

        var url = `${server_address}${post_config}`;
         fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: { 
                  'Content-Type': 'application/json'
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({
                    "request": "pleaseCanHasConfig?"
                })            
            })
            .then(res => res.text())
            .then(data => {
    
                var configFile;

                try {
                    configFile = JSON.parse(data)
                } catch (e) {
                    console.log(e);
                }

                //rowData (array of objects)
                var row_array = [];

                for(const property in configFile.fields){
                    row_array.push({
                        name: property,
                        path: configFile.fields[property].path,
                        type: configFile.fields[property].type
                    })
                }

                const report_columns = {
                    results_name: configFile.report_columns.results_name,
                    report_name: configFile.report_columns.report_name
                }

                const tlog_filename = {
                    leading_name: configFile.tlog_filename.LeadingName,
                    a: configFile.tlog_filename.a,
                    b: configFile.tlog_filename.b,
                    c: configFile.tlog_filename.c
                }

                const runtime_sheet_info = {
                    spreadsheet_id: configFile.runtime_sheet_info.spreadsheet_id,
                    sheet_name: configFile.runtime_sheet_info.sheet_name
                }

                const tlog_fileinfo = configFile.tlog_fileinfo;

                console.log(configFile.tlog_filename.LeadingName)
                setState((state) => {
                    return {...state, 
                        rowData: row_array,
                        report_columns: report_columns,
                        tlog_filename: tlog_filename,
                        tlog_fileinfo: tlog_fileinfo,
                        runtime_sheet_info: runtime_sheet_info
                    }
                }); 
            })       
    }

    const config_file_display_style ={
        width: '30%', 
        float:'right',
        paddingTop: "1em"
    }

    var json_pathpicker_style = {
        width: "35%",
        marginLeft: "2em",
        marginTop: "1em"
    } 

 
    useEffect(() => {
        loadConfig();
    },[]);

    return (
        <div>
            <FilePond 
                name={"file"} 
                server={`${server_address}${post_xml}`} 
                onerror={(error) => (console.error(error))} 
                acceptedFileTypes={['text/xml']}
                onprocessfile={(error, files) => {
                    if(!error){
                            fetch_json(files.filename) 
                        }
                    }
                }
                labelIdle={'Drag & Drop Tlog file or <span class="filepond--label-action"> Browse </span>'}
            />
            <UpdateFieldsComp  
                loadConfig={() => {loadConfig()}}
                report_columns={state.report_columns}
                tlog_filename={state.tlog_filename}
                tlog_fileinfo={state.tlog_fileinfo}
                runtime_sheet_info={state.runtime_sheet_info}
            />

            <div style={config_file_display_style}>
                <ConfigFileDisplay
                    loadConfig={() => {loadConfig()}}
                    columnDefs={state.columnDefs} 
                    rowData={state.rowData}
                />
            </div>
            
            <PathDisplayComp 
                loadConfig={() => {loadConfig()}}
                pathText={state.pathText} 
            />

            <JsonPathPickerComp
                style={json_pathpicker_style}
                json={state.json}
                path={state.path}
                onChoose={(path)=> {setState((state) => {
                        return {...state, pathText:path}
                    })
                }
            }
                showOnly={false} 
            />
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
                
