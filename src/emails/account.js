const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chrisnosowsky@gmail.com',
        subject: 'Welcome to the Task App!',
        text: `Welcome to the Task App, ${name}. Let me know how it goes!`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chrisnosowsky@gmail.com',
        subject: 'Sad to See you Go!',
        text: `We are sad to see you go, ${name}.`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}