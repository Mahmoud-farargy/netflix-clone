import React from "react";
import PropTypes from "prop-types";
import "./InputEl.scss";

const InputEl = (props) => {
    let inputItem;
    switch(props.type) {
        case "text":
            return (
                <input type="text" name={props.name} placeholder={props.placeholder} value={props.val} onChange={(e) => props.changeInput(e.target.value, props.name )} className="input__style" />
            )
        case "password":
            return (
                <input type="password" autoComplete="on" name={props.name} placeholder={props.placeholder} value={props.val} onChange={(e) => props.changeInput(e.target.value, props.name)} className="input__style" />
            )
        case "email":
            return (
                    <input type="email" name={props.name} placeholder={props.placeholder} value={props.val} onChange={(e) => props.changeInput(e.target.value, props.name)} className="input__style" />
            )

    }
    return (
        { inputItem }
    )
}

InputEl.propTypes = { 
    val: PropTypes.string,
    changeInput: PropTypes.func.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
}
export default InputEl;