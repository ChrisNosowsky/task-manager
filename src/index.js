const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000
const multer = require('multer')

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a PDF'))
        }
        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

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


// const main = async () => {
//     // const task = await Task.findById('5ef2b54d26444f23c8c906da')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5ef2b53826444f23c8c906d6')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

// }

// main()