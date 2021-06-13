var express = require('express');
const fs = require("fs");
const ChildProcess = require("child_process");
const { DVRIPClient } = require("../index");


var router = express.Router();
const { DVR_HOST, DVR_PORT, DVR_USER, DVR_PASS } = process.env;
const CMD_UPDATE_TIME = `./sofiactl.pl -u ${DVR_USER} -p ${DVR_PASS} -host ${DVR_HOST} -port ${DVR_PORT} -jp --c OPTimeSetting`;
const CMD_RE_ENCODE = `./sofiactl.pl -u ${DVR_USER} -p ${DVR_PASS} -host ${DVR_HOST} -port ${DVR_PORT} -jp  --c ConfigSet --co AVEnc --if ./AVEnc_default.json`;

router.get('/test', async function(req, res, next) {
  try {

    const options = {
      camIp: DVR_HOST,
      camMediaPort: DVR_PORT,
      user: DVR_USER,
      pass: DVR_PASS,
      log 	: true,
    };

    let cam = new DVRIPClient(options);

    await cam.connect();
    console.log("Connected!");

    await cam.login({ Username: DVR_USER, Password: DVR_PASS });
    console.log("Logged in!");
    let encParams = await cam.getEncodeParam();
    // encParams.data[0].ExtraFormat[0].AudioEnable = false;
    // encParams.data[0].ExtraFormat[0].VideoEnable = true;
    // encParams.data[0].ExtraFormat[0].Video.BitRate = 68;
    // encParams.data[0].ExtraFormat[0].Video.BitRateControl = "VBR";
    // encParams.data[0].ExtraFormat[0].Video.Compression = "H.264",
    // encParams.data[0].ExtraFormat[0].Video.FPS = 23;
    // encParams.data[0].ExtraFormat[0].Video.GOP = 2;
    // encParams.data[0].ExtraFormat[0].Video.Quality = 4;
    // encParams.data[0].ExtraFormat[0].Video.Resolution = 'D1';
    //
    // encParams.data[0].MainFormat[0].AudioEnable = false;
    // encParams.data[0].MainFormat[0].VideoEnable = true;
    // encParams.data[0].MainFormat[0].Video.BitRate = 2708;
    // encParams.data[0].MainFormat[0].Video.BitRateControl = "VBR";
    // encParams.data[0].MainFormat[0].Video.Compression = "H.264",
    // encParams.data[0].MainFormat[0].Video.FPS = 25;
    // encParams.data[0].MainFormat[0].Video.GOP = 2;
    // encParams.data[0].MainFormat[0].Video.Quality = 4;
    // encParams.data[0].MainFormat[0].Video.Resolution = '720P';
    //
    // const Command = 'CONFIG_SET';
    // const MessageName = 'AVEnc.Encode';
    // const MessageData = JSON.parse(JSON.stringify(encParams.data));
    // const result = await cam.sendMessage({ Command, MessageName, MessageData })
    // const setHelper = await cam.setHelper(MessageName, MessageData, Command)
    // const executeHelper = await cam.executeHelper(Command, MessageName, MessageData);
    // encParams = await cam.getEncodeParam();

    // const result = await cam.rebootDevice().catch(e => {
    //   res.send(e || 'ERROR');
    // });
    res.send(encParams);
  }catch(err) {
    console.log('======err========', err)
  }

});

module.exports = router;
