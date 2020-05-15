import React, { useState, useEffect, useRef, useCallback} from 'react'
import "./style.css";

export const JsonPathPickerComp = React.memo((P) => {

    var _s = {
        choosen: ""
    };

    var props = P;
    console.log("P", P);
    
    const [state, setState] = useState(_s);

    /*
    useEffect(() => {
        console.log("useEffect 1");
        if(state.choosen != null){
            let pathText = state.choosen
            pathText = pathText.replace(/ /g, '')
            props.onChoose && props.onChoose(pathText)
        }
    }, [state.choosen]);
    */

    const nextp = useRef();
    const nexts = useRef();
    useEffect(() => {
        console.log("useEffect 2");
        if (nextp.json !== props.json) { // string compare
            setState({
                choosen: null // reset choosen
            })
            console.log("nextp.json !== props.json");
        }
        if (nextp.path !== undefined) {
            let nextPath;
            if (!nextp.path) { // '' | null
                nextPath = nextp.path
            } else {
                nextPath = nextp.path.replace(/\./g, ' .')
                nextPath = nextPath.replace(/\[/g, ' [')
            }
            setState({
                choosen: nextPath
            })
        }
    }, []);

    
    let jsonObj;
    if(props.json != null){
        console.log("props.json != null");
        try {
            jsonObj = JSON.parse(props.json)
        } catch (error) {
            console.log(error)
            return <div>Wrong json string input</div>
        }
    } else {
        console.log("props.json == null");
        return <div>Please upload a file</div>
    }


   /* 
    const update = useCallback(
        () => {
            if (nextp.json !== props.json) {
                return true
            } else if (nexts.choosen !== state.choosen) {
                return true
            } else {
                return false
            }
        },
        [nextp, nexts],
    );
    */

    const choose = (e) => {
        let target = e.target
        console.log("choose");
        if (target.hasAttribute('data-pathkey')) {
            
            console.log("target.hasAttribute('data-pathkey')");

            let pathKey = target.getAttribute('data-pathkey')
            let choosenPath

            if (target.hasAttribute('data-choosearr')) {

                console.log("target.hasAttribute('data-choosearr')");
            
                choosenPath = state.choosen
                let tmp = choosenPath.split(' ')
                let idx = pathKey.split(' ').length
                tmp[idx] = '[*]'
                choosenPath = tmp.join(' ')

            } else {
                choosenPath = pathKey
            }

            if(choosenPath !== null){

                console.log("choosenPath !== null");
                setState({
                    choosen: choosenPath
                })

                console.log("choosenPath: ", choosenPath);
                
                    let pathText = choosenPath
                    pathText = pathText.replace(/ /g, '')
                    props.onChoose && props.onChoose(pathText, props.json)
                    console.log("pathText", pathText);
                }
        }
    }
    /*
    render() {
        let jsonObj: any
        try {
            jsonObj = JSON.parse(this.props.json)
        } catch (error) {
            console.log(error)
            return <div>Wrong json string input</div>
        }*/
        return (<div onClick={props.showOnly ? null : choose}>
            {props.showOnly ? json2Jsx_onlyForShow(jsonObj) : json2Jsx(state.choosen, jsonObj) }
        </div>)
    //}
}); 

/**
 * Check if a string represents a valid url
 * @return boolean
 */
function isUrl(str){
    let regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(str)
}

function escape(str){
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}


/**
 * recursively generate jsxs by json data
 * @param choosenPath
 * @param jsonObj 
 * @param isLast :is the last child or not
 * @param pathKey :now json path from root
 * @return reactElements
 */
function json2Jsx(choosenPath, jsonObj, isLast = true, pathKey = ''){

    console.log("json2Jsx");
    if (jsonObj === null) {
        return renderNull(choosenPath, isLast, pathKey)
    } else if (jsonObj === undefined) {
        return renderUndefined(choosenPath, isLast, pathKey)
    } else if (Array.isArray(jsonObj)) {
        return renderArray(choosenPath, isLast, pathKey, jsonObj)
    } else if (typeof jsonObj == 'string') {
        return renderString(choosenPath, isLast, pathKey, jsonObj)
    } else if (typeof jsonObj == 'number') {
        return renderNumber(choosenPath, isLast, pathKey, jsonObj)
    } else if (typeof jsonObj == 'boolean') {
        return renderBoolean(choosenPath, isLast, pathKey, jsonObj)
    } else if (typeof jsonObj == 'object') {
        return renderObject(choosenPath, isLast, pathKey, jsonObj)
    } else {
        return null
    }

}

// various types' render
function renderNull(choosenPath, isLast, pathKey) {
    console.log("renderNull");
    return (<span className="json-literal">
        <i data-pathkey={pathKey} className={getPickerStyle(getRelationship(choosenPath, pathKey))}>📋</i>
        <span>{'null'} {isLast?'':','}</span>
    </span>)
}

function renderUndefined(choosenPath, isLast, pathKey) {
    console.log("renderUndefined");
    return (<span className="json-literal">
        <i data-pathkey={pathKey} className={getPickerStyle(getRelationship(choosenPath, pathKey))}>📋</i>
        <span>{'undefined'} {isLast?'':','}</span>
    </span>)
}

function renderString(choosenPath, isLast, pathKey, str) {
    console.log("renderString");
    str = escape(str)
    if (isUrl(str)) {
        return (<span>
            <i data-pathkey={pathKey} className={getPickerStyle(getRelationship(choosenPath, pathKey))}>📋</i>
            <a target="_blank" href={str} className="json-literal">
                <span>"{str}" {isLast?'':','}</span>
            </a>
        </span>)
    } else {
        return (<span className="json-literal">
            <i data-pathkey={pathKey} className={getPickerStyle(getRelationship(choosenPath, pathKey))}>📋</i>
            <span>"{str}" {isLast?'':','}</span>
        </span>)
    }
}

function renderNumber(choosenPath, isLast, pathKey, num) {
    console.log("renderNumber");
    return (<span className="json-literal">
        <i data-pathkey={pathKey} className={getPickerStyle(getRelationship(choosenPath, pathKey))}>📋</i> 
        <span>{num} {isLast?'':','}</span>
    </span>)
}

function renderBoolean(choosenPath, isLast, pathKey, bool) {
    console.log("renderBoolean");
    return (<span className="json-literal">
        <i data-pathkey={pathKey} className={getPickerStyle(getRelationship(choosenPath, pathKey))}>📋</i>
        <span>{bool} {isLast?'':','}</span>
    </span>)
}

function renderObject(choosenPath, isLast, pathKey, obj) {
    console.log("renderObject");
    let relation = getRelationship(choosenPath, pathKey)

    let keys = Object.keys(obj)
    let length = keys.length
    if (length > 0) {
        return (<div className={relation==1 ? "json-picked_tree" : ''}>
            <div>
                <span>{'{'}</span>
                <i data-pathkey={pathKey} className={getPickerStyle(relation)}>📋</i>
            </div>
            <ul className="json-dict">
                {
                    keys.map((key, idx) => {
                        let nextPathKey = `${pathKey} .${key}`
                        return (<li key={nextPathKey}>
                            <span className="json-literal json-key">{key}</span>
                            <span> : </span>
                            { json2Jsx(choosenPath, obj[key], idx == length-1 ? true : false, nextPathKey) }
                        </li>)
                    })
                }
            </ul>
            <div>{'}'} {isLast?'':','}</div>
        </div>)
    } else {
        return (<span>
            <i data-pathkey={pathKey} className={getPickerStyle(relation)}>📋</i>
            <span>{"{ }"} {isLast?'':','}</span>
        </span>)
    }
}

function renderArray(choosenPath, isLast, pathKey, arr) {
    console.log("renderArray");
    let relation = getRelationship(choosenPath, pathKey)

    let length = arr.length
    if (length > 0) {
        return (<div className={relation==1 ? "json-picked_tree" : ''}>
            <div>
                { relation==2 ? <i data-pathkey={pathKey} data-choosearr="1" className={getPickArrStyle(choosenPath, pathKey)}>[✚]</i> : null }
                <span>{'['}</span>
                <i data-pathkey={pathKey} className={getPickerStyle(relation)}>📋</i>
            </div>
            <ol className="json-array">
                {
                    arr.map((value, idx) => {
                        let nextPathKey = `${pathKey} [${idx}]`
                        return (<li key={nextPathKey}>
                            { json2Jsx(choosenPath, value, idx == length-1 ? true : false, nextPathKey) }
                        </li>)
                    })
                }
            </ol>
            <div>{']'} {isLast?'':','}</div>
        </div>)
    } else {
        return (<span>
            <i data-pathkey={pathKey} className={getPickerStyle(relation)}>📋</i>
            <span>{"[ ]"} {isLast?'':','}</span>
        </span>)
    }
}

/**
 * get the relationship between now path and the choosenPath
 * 0 other
 * 1 self
 * 2 ancestor
 */
function getRelationship(choosenPath, path) {
    if (choosenPath === null) return 0

    let choosenAttrs = choosenPath.split(' ')
    choosenAttrs.shift()
    let choosenLen = choosenAttrs.length

    let nowAttrs = path.split(' ')
    nowAttrs.shift()
    let nowLen = nowAttrs.length

    if (nowLen > choosenLen) return 0

    for (let i=0; i<nowLen; i++) {
        let ok = '';
        
        if (nowAttrs[i] === choosenAttrs[i]) {
            ok = true
        } else if (nowAttrs[i][0] === '[' && choosenAttrs[i][0] === '[' && choosenAttrs[i][1] === '*') {
            ok = true
        } else {
            ok = false
        }

        if (!ok) return 0
    }

    return nowLen == choosenLen ? 1 : 2
}

/**
 * get picker's className, for ditinguishing picked or not or ancestor of picked entity
 */
function getPickerStyle(relation) {
    if (relation == 0) {
        return "json-pick_path"
    } else if (relation == 1) {
        return "json-pick_path json-picked"
    } else {
        return "json-pick_path json-pick_path_ancestor"
    }
}

function getPickArrStyle(choosenPath, nowPath) {
    let csp = choosenPath.split(' ')
    let np = nowPath.split(' ')
    if (csp[np.length] == '[*]') {
        return "json-pick_arr json-picked_arr"
    } else {
        return "json-pick_arr"
    }
}


/**
 * only for show json data
 */
function json2Jsx_onlyForShow(jsonObj, isLast = true) {
    console.log("json2Jsx_onlyforShow");
    if (jsonObj === null) {
        return (<span className="json-literal">
            <span>{'null'} {isLast?'':','}</span>
        </span>)
    } else if (jsonObj === undefined) {
        return (<span className="json-literal">
            <span>{'undefined'} {isLast?'':','}</span>
        </span>)
    } else if (Array.isArray(jsonObj)) {
        let arr = jsonObj
        let length = arr.length
        return (<div>
            <div>
                <span>{'['}</span>
            </div>
            <ol className="json-array">
                {
                    arr.map((value, idx) => {
                        return (<li key={idx}>
                            { json2Jsx_onlyForShow(value, idx == length-1 ? true : false) }
                        </li>)
                    })
                }
            </ol>
            <div>{']'} {isLast?'':','}</div>
        </div>)
    } else if (typeof jsonObj == 'string') {
        let str = escape(jsonObj)
        if (isUrl(str)) {
            return (<span>
                <a target="_blank" href={str} className="json-literal">
                    <span>"{str}" {isLast?'':','}</span>
                </a>
            </span>)
        } else {
            return (<span className="json-literal">
                <span>"{str}" {isLast?'':','}</span>
            </span>)
        }
    } else if (typeof jsonObj == 'number') {
        return (<span className="json-literal">
            <span>{jsonObj} {isLast?'':','}</span>
        </span>)
    } else if (typeof jsonObj == 'boolean') {
        return (<span className="json-literal">
            <span>{jsonObj} {isLast?'':','}</span>
        </span>)
    } else if (typeof jsonObj == 'object') {
        let keys = Object.keys(jsonObj)
        let length = keys.length
        if (length > 0) {
            return (<div>
                <div>
                    <span>{'{'}</span>
                </div>
                <ul className="json-dict">
                    {
                        keys.map((key, idx) => {
                            return (<li key={idx}>
                                <span className="json-literal json-key">{key}</span>
                                <span> : </span>
                                { json2Jsx_onlyForShow(jsonObj[key], idx == length-1 ? true : false) }
                            </li>)
                        })
                    }
                </ul>
                <div>{'}'} {isLast?'':','}</div>
            </div>)
        } else {
            return (<span>
                <span>{"{ }"} {isLast?'':','}</span>
            </span>)
        }
    } else {
        return null
    }
}

export default JsonPathPickerComp;