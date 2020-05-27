import React, { useState } from 'react'
import { Button } from "react-bootstrap"


export default function PathDisplayComp(props) {

    const [state, setState] = useState({pathText: props.pathText})

    var server_address = "https://localhost:8090";
    var post_path = "/path";
    
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


    return (
        <div style={{width:'50%',float:'left',boxSizing:'border-box',paddingLeft:'2em', paddingTop:"2em"}}>
                <input
                    style={{width:'80%',minHeight:'10px',boxSizing:'border-box',border:'1px solid #108ee9',paddingTop:'0.2em',paddingBottom:"0.2em",paddingLeft:"0.3em", paddingRight:"0.3em"}}
                    value={props.pathText || ''}
                readOnly />
                <div>
                    <Button style={{marginBottom: "1em", marginTop: "1em"}} onClick={update_path}>Import selected value</Button>
                </div>
        </div>
    )
}
