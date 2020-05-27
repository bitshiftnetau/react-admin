import React, { useState, useEffect } from 'react'
import { BsFillBackspaceFill } from "react-icons/bs";
import JsonPathPickerComp from "../JsonPathPicker/JsonPathPickerComp.js";
import Button from 'react-bootstrap/Button';
import { FilePond, File, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import ResponseToast from "../Toast/UpdateResponseToastComp";
import UpdateFieldsComp from "../UpdateFields/UpdateFieldsComp";
import PathDisplayComp from "../PathDisplay/PathDisplayComp";


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


 
    var server_address = "https://localhost:8090";
    var post_xml = "/xml";
    var post_json = "/json";
   
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

    return (
        <div>
            <ResponseToast />
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
            <UpdateFieldsComp />
            <PathDisplayComp props={state.pathText} />
            <JsonPathPickerComp
                json={state.json}
                path={state.path}
                onChoose={(path)=> setState({path, pathText:path})}
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
                
