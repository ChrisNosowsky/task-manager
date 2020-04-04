// CRUD create read update and delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    
    const db = client.db(databaseName)

    // db.collection('users').findOne({_id: new ObjectID("5e88e7f3232f252f845a1129")}, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({age: 20}).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection('users').find({age: 20}).count((error, count) => {
    //     console.log(count)
    // })
    db.collection('tasks').findOne({_id: new ObjectID("5e88e5559145ab2b2099a7bd")}, (error, task) => {
        if(error) {
            return console.log('Unable to fetch')
        }
        console.log(task)
    })

    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        if(error) {
            return console.log('Unable to fetch')
        }
        console.log(tasks)
    })
})