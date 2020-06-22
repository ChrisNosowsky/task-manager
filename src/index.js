const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('Get requests are disabled')
//     } else {
//         next()
//     }
//     next()
// })

// app.use((req, res, next) => {
//     res.send('Site currently under maintenance. Please check back later.').status(503)
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


// without middleware: new request -> run route handler
// with middleware: new request -> do something -> run route handler



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})