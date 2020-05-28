import React from 'react'

export default function ConfigFileDisplayComp(props) {
   
    const component_style ={
        width: '30%', 
        float:'right',
        paddingTop: "1em"
    }
    return (
        <div style={component_style}>
            {props.configFile}
            TEST
        </div>
    )
}
