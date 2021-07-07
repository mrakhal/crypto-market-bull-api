const express = require("express");
const router = express.Router();
const { readToken } = require("../config");
const { cryptoController } = require("../controller");

router.get("/getMapCoin", cryptoController.getMapCoin);
router.get("/getPushToMysql", cryptoController.getPushToMysql);
router.get("/getTickers", cryptoController.getTickers);
router.get("/getAllCrypto", cryptoController.getAllCrypto);

module.exports = router;
