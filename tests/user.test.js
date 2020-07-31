const request = require('supertest')
const app = require('../src/app')

test('should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Chris Nosowsky',
        email: 'nosowsky@gmail.com',
        password: 'Admin1234!'
    }).expect(201)
})