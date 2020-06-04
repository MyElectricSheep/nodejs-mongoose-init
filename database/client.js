const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true})
    .then(() => console.log('Connected successfully to the db!'))
    .catch(err => console.error(err))

const client = mongoose.connection;

client.on('error', (err) => {
    console.error(err)
})

module.exports = client