const { Router } = require("express")
const express = require("express")
const router = express.Router()
const homeController = require("../controllers/homeController")
const {checkAuthentication}=require("../middlewares/authenticatingMiddleware")


router.get("/Create",checkAuthentication, homeController.createView)

router.post("/Create/Save",checkAuthentication, homeController.createRecord)

router.get("/Read",checkAuthentication, homeController.readView)

router.post("/Read/Search", homeController.searchedRecords)

router.get("/Update",checkAuthentication, homeController.updateView)

router.get("/Update/:id",checkAuthentication, homeController.getUpdateRecord)

router.patch("/Update/:id&:name&:phno&:emailid",checkAuthentication, homeController.updateRecord)

router.get("/Delete",checkAuthentication, homeController.deleteView)

router.delete("/Delete/:id",checkAuthentication, homeController.deleteRecords)

router.get("/",checkAuthentication, (req, res) => {

    // console.log(req.session)
    // console.log(req.user)
    res.render("home")
})


module.exports = router