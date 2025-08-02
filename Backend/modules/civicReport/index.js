"use strict";


const civicController = require("./controllers/civicController");
const civicReportValidator = require("./validators/civicReportValidator");



router.post("/v1/civic-reports/register", civicReportValidator.register, civicController.createReport);
router.get("/v1/civic-reports", civicController.getAllReports);
router.get("/v1/civic-reports/where?Distance=1km", civicController.getReportById);

