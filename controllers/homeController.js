const EmpRecordModel = require("../models/EmployeeRecordModel").EmpRecordModel

function createView(req, res) {
    console.log(req.session)
    console.log(req.user)
    res.render("create")
}

function createRecord(req, res) {
    console.log(req.body)
    var recordmodel = new EmpRecordModel({
        empid: req.body.empid.trim(),
        name: req.body.name.trim(),
        phno: req.body.phno.trim(),
        emailid: req.body.emailid.trim()
    })

    recordmodel.save().then((result) => {
        console.log("Saved document: " + result)
        res.redirect("/Home/Create")
    }).catch((err) => {
        console.log(err)
    })
}

function readView(req, res) {
    res.render("read", { array: null })
}

function searchedRecords(req, res) {
    console.log(req.body)

    switch (req.body.search) {
        case "empid":
            EmpRecordModel.find({ empid: req.body.inText }).then((result) => {
                res.render("read.ejs", { array: result })
            }).catch((err) => {
                console.log(err)
            })

            break;

        case "name":
            EmpRecordModel.find({ name: req.body.inText }).then((result) => {
                res.render("read.ejs", { array: result })
            }).catch((err) => {
                console.log(err)
            })
            break;

        case "phno":
            EmpRecordModel.find({ empid: req.body.inText }).then((result) => {
                res.render("read.ejs", { array: result })
            }).catch((err) => {
                console.log(err)
            })
            break;

        case "emailid":
            EmpRecordModel.find({ empid: req.body.inText }).then((result) => {
                res.render("read.ejs", { array: result })
            }).catch((err) => {
                console.log(err)
            })
            break;

        default:
            EmpRecordModel.find().sort({empid:1}).then((result)=>{
                res.render("read.ejs", { array: result })
            })
            break;
    }
}

function deleteView(req, res) {
    res.render("delete")
}

function deleteRecords(req,res){
    var id=req.params.id.trim()
    EmpRecordModel.deleteMany({empid:id}).then((result)=>{
        //console.log(result)
        if(result.deletedCount>0)
            res.json({message:"Record Deleted Succesfully"})
        else
            res.json({message:"No Records Found operation unsuccessful"})
    }).catch((err)=>{
        console.log(err)
    })
}

function updateView(req, res) {
    res.render("update")
}

function getUpdateRecord(req,res){
    var id=req.params.id.trim()
    // console.log(id)
    EmpRecordModel.findOne({empid:id}).then((result)=>{
        //console.log(result)
        res.json({message:"getUpdateRecordMethod",record:result})
    }).catch((err)=>{
        console.log(err)
    })
}

function updateRecord(req,res){
    //console.log(req.params)
    EmpRecordModel.findOneAndUpdate({empid:req.params.id},{name:req.params.name,phno:req.params.phno,emailid:req.params.emailid},{new:true}).then((result)=>{
        //console.log(result)
        res.json({message:"updated record successfully",redirect:"/Home/Update"})
    }).catch((err)=>{
        console.log(err)
        res.json({message:"update operation failed",redirect:"/Home/Update"})
    })
}

module.exports = {
    createView,
    createRecord,
    readView,
    searchedRecords,
    deleteView,
    deleteRecords,
    updateView,
    getUpdateRecord,
    updateRecord
}