import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteEntry = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
        const request = axios.delete(`${baseUrl}/${id}`)
        return request.then(response => response.data)
    }
}

const update = (name, number, id) => {
    const url = `${baseUrl}/${id}`
    const changedPerson = {name, number}
    const request = axios.put(url, changedPerson)
    return request.then(response => response.data)
}

export default {getAll, create, deleteEntry, update}