import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const addPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const deletePerson = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`).then(response => response.data)
}

const phonebookService = {
    getAll,
    addPerson,
    deletePerson
}

export default phonebookService