const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['body'](req, res),
    ].join(' ')
}))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateId() {
    return getRandomInt(Number.MAX_SAFE_INTEGER)
}

app.get('/info', (req, res) => {
    const count = persons.length
    res.send(`
    <div>
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
    </div>
    `)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).json({'error': 'Name required'})
    }
    if (!body.number) {
        return res.status(400).json({'error': 'Number required'})
    }
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({'error': `${body.name} already exists in the phonebook`})
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)

    res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Endpoint not found' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => console.log(`Running on port ${PORT}`))