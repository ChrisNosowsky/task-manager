const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = "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"

sgMail.setApiKey(sendgridAPIKey)

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