import React, { useState } from 'react'
import { Button, Dropdown } from "react-bootstrap"
import config from "../../config"

export default function PathDisplayComp(props) {

    var server_address = config.app_info.server_address;
    var post_path = config.app_info.endpoints.path;

    var value_name;

    const [state, setState] = useState({
       value_type: '',
       name: "Data-type",
    });

    const update_path = () => {
        if(props.pathText && value_name && state.value_type){
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
                    "newproperty": {
                        "new_value": value_name,
                        "new_path": props.pathText,
                        "new_type": state.value_type
                    }  // body data type must match "Content-Type" header)
                })
            })
            .then(res => res.text())
            .then(data => {
                props.showToast && props.showToast();
                props.loadConfig && props.loadConfig()
            })
        }
    }

    return (
        <div style={{width:'40%',float:'left',boxSizing:'border-box',paddingLeft:'2em', paddingTop:"1em", marginBottom: "1em"}}>

                <input
                    style={{marginBottom: '0.5em', width:'90%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                    value={props.pathText || ''}
                readOnly />
                <div style= {{width: '100%', display: 'flex', justifyContent: 'left'}} >
                    <label style={{
                        marginBottom: "0px", 
                        marginBottom: "0px",
                        marginRight: "0.5em",
                        marginTop: "0.3em"
                    }}
                    for="column-name">Sheet Col Name: </label>
                    <input name="column-name" style={{marginRight: '0.5em'}} 
                        onChange={(e) => {
                            value_name = e.target.value
                        }}
                    />
                    <Dropdown style={{marginRight: '0.5em'}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" name="test">
                            {state.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => {
                                    e.preventDefault();
                                    setState({
                                        value_type: "number",
                                        name: "Number"
                                    })
                                }}
                            >Number</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {
                                    e.preventDefault();
                                    setState({
                                        value_type: "string",
                                        name: "String"
                                    })
                                }}
                            >String</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button onClick={update_path}>Import selected value</Button>
                </div>
        </div>
    )
}
