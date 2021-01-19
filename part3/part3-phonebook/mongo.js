const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Usage:\n\nnode mongo.js <password> <optional:<name> <number>>")
    process.exit(1)
}

const password = process.argv[2]
const dbName = "phonebook"
const url = `mongodb+srv://phonebook-user:${password}@phonebook.eupwo.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
    console.log("phonebook:")
    Person.find({}).then(persons => {
        persons.forEach(person => console.log(`${person.name} (${person.number})`))
        mongoose.connection.close()
    })
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`Added ${result.name} (${result.number}) to phonebook`)
        mongoose.connection.close()
    })
}