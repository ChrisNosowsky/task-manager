const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = "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"

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'chrisnosowsky@gmail.com',
    from: 'chrisnosowsky@gmail.com',
    subject: 'Test email',
    text: 'test email'
})