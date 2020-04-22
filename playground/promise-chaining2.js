require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndRemove('5e968f08a7f19e3648839d41').then((user) => {
//     console.log(user)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const findIdAndRemove = async (id) => {
    const user = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

findIdAndRemove('5e968e6fa7f19e3648839d3f').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})