import React from "react";

const Person = ({person, handleDelete}) => {
    return(
        <div>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></div>
    )
}

const Persons = ({persons, filter, handleDelete}) => {
    return (
        <div>
            {
                persons
                    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(
                        person =>
                            <Person
                                key={person.name}
                                person={person}
                                handleDelete={handleDelete}/>
                    )
            }
        </div>
    )
}

export default Persons