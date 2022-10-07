const Joi = require('joi')
module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        })
        const {error,value} = schema.validate(req.body)
        
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1.It must be contain ONLY the following characters: lower case, upper case
                        <br>
                        2.It must be at least 8 charactrs in length and not grater then 32 characters
                        `
                    })
                    break
                default:
                    res.status(400).send({
                        error:'Invalid registration error'
                    })
            }
        } else {
            next()
        }

    }
}