const { AppUser } = require("../models/AppUserModel")
const { hash } = require("bcrypt")
async function registeruser(req, res) {
    try {
        result = await AppUser.findOne({ username: req.body.username })
        if (result) {
            res.send("<script>alert('user already exist try different user name'); window.location.href='/register'</script>")
        } else {
            console.log(req.body)
            let appuser = new AppUser({
                username: req.body.username,
                password: await hash(req.body.password, 2)
            })

            result = await appuser.save()
            res.send("<script> alert('Successfully registered'); window.location.href='/login'</script>")
        }
    } catch (err) {
        console.log(err)
        res.send("caused error")
    }
}

module.exports = {
    registeruser
}