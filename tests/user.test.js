const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    'name': 'Mariah',
    'email': 'mariah@gmail.com',
    'password': 'Test123!'
}

beforeEach(async () => { // Setup
    await User.deleteMany()
    await new User(userOne).save()
})

test('should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Chris Nosowsky',
        email: 'nosowsky@gmail.com',
        password: 'Admin1234!'
    }).expect(201)
})

test('should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('should not login wrong credentials', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrong'
    }).expect(400)
})