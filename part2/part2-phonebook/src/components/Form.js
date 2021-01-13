import React from "react";

const Form = ({newName, handleNameChange, newPhone, handlePhoneChange, submitNewPhone}) => {
    return (
        <form onSubmit={submitNewPhone}>
            <div>name: <input value={newName} onChange={handleNameChange}/></div>
            <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default Form