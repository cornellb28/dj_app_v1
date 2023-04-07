import React from 'react'

function Input(props) {
    return (
        <>

            {props.title && <label className="text-white" htmlFor=''>{props.title} {props.required && <span className="required">*</span>}</label>}
            <input {...props} />
            <small  className="form-text text-muted">We'll never share your email with anyone else.</small>
        </>
    )
}

export default Input