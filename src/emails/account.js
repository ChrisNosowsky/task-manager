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


module.exports = {
    sendWelcomeEmail
}