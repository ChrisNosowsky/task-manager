require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5e968c7f299bdf08585cde55', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})





