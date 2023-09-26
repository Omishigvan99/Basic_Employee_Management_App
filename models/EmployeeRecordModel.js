const mongoose=require("mongoose")
const Schema=mongoose.Schema

const recordSchema=new Schema(
    {
        empid:{
            type:"string",
            required:true
        },
        name:{
            type:"string",
            required:true
        },
        phno:{
            type:"string",
            required:true
        },
        emailid:{
            type:"string",
            required:true
        }
    },

    {
        timestamps:true,     
    }
)

const EmpRecordModel=mongoose.model("Employee_Record",recordSchema)

module.exports={
    EmpRecordModel
}