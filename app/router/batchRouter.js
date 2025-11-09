const express = require('express')
const BatchController=require("../controllers/BatchController")
const AdminAuthCheck=require("../middleware/AdminAuthCheck")
const router = express.Router()

router.post("/create",AdminAuthCheck,BatchController.addBatch)
router.put("/assign-students",AdminAuthCheck,BatchController.assignStudentsToBatch)
router.get("/list/:courseId",BatchController.listBatches)
router.put('/edit/:id',AdminAuthCheck,BatchController.updateBatch)
router.delete("/delete/:id",AdminAuthCheck,BatchController.deleteBatch)
module.exports = router