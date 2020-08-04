const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {userOneId, userOne, userTwoId, userTwo, setupDatabase, taskOne, taskTwo, taskThree} = require('./fixtures/db')

beforeEach(setupDatabase)

test('can create tasks for user', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'Finish GM Internship'
    })
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})


test('gets all tasks for user', async () => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)

    expect(response.body.length).toEqual(2)
})

test('Should delete user task', async () => {
    const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('User two deleting user one first task should fail', async () => {
    const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)
    
    const task = Task.findById(userOne._id)
    expect(task).not.toBeNull()
})