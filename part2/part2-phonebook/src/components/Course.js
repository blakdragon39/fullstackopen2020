import React from "react";

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}


const Course = ({course}) => {
    const total = course.parts
        .map(part => part.exercises)
        .reduce((total, current) => total + current)

    return(
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
            <p><b>total of {total} exercises</b></p>
        </div>
    )
}

export default Course