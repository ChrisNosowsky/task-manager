const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require('./fixtures/db')


beforeEach(setupDatabase)

test('should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Chris Nosowsky',
        email: 'nosowsky@gmail.com',
        password: 'Admin1234!'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about response
    expect(response.body).toMatchObject({
        user: {
            name: 'Chris Nosowsky',
            email: 'nosowsky@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Admin1234!')
})

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user =  await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login wrong credentials', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrong'
    }).expect(400)
})

test('should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('should delete profile for user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOne)
    expect(user).toBeNull()
})


test('should not delete profile for unauthenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})


test('should upload avatar images', async () => {
    await request(app).post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatars', 'tests/fixtures/profile-pic.jpg')
    .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('should update valid user fields', async () => {
    const response = await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "Kick Buttowski"
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe(response.body.name)
})

test('should not update invalid user fields', async () => {
    await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: "East Lansing"
    })
    .expect(400)
})
