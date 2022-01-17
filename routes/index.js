var express = require('express');
const { exec } = require("child_process");


var router = express.Router();
const { DVR_HOST, DVR_PORT, DVR_USER, DVR_PASS } = process.env;
const CMD_UPDATE_TIME = `./sofiactl.pl -u ${DVR_USER} -p ${DVR_PASS} -host ${DVR_HOST} -port ${DVR_PORT} -jp --c OPTimeSetting`;
const CMD_RE_ENCODE = `./sofiactl.pl -u ${DVR_USER} -p ${DVR_PASS} -host ${DVR_HOST} -port ${DVR_PORT} -jp  --c ConfigSet --co AVEnc --if ./AVEnc_default.json`;
const CMD_GET_CONFIG= `./sofiactl.pl -u ${DVR_USER} -p ${DVR_PASS} -host ${DVR_HOST} -port ${DVR_PORT} -jp -of ./result_tmp.json --c ConfigGet --co AVEnc`;
router.get('/test', function(req, res, next) {
	exec(`cd ../dvr && ${CMD_GET_CONFIG}`, (error, stdout, stderr) => {
     if (error) {
       console.log(`=========error: ${error.message}`);
       res.json(`=========error: ${error.message}`);
       return;
     }
     if (stderr) {
       exec(CMD_UPDATE_TIME);
       return;
     }
     console.log(`===============stdout: ${stdout}`);
     res.json(stdout);
   });

});

router.get('/sync-all', function(req, res, next) {
  exec(`cd ../dvr && ${CMD_RE_ENCODE}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`=========error: ${error.message}`);
      return;
    }
    if (stderr) {
      exec(CMD_UPDATE_TIME);
      return;
    }
    console.log(`===============stdout: ${stdout}`);
  });
  res.json('');
});
/* GET home page. */
router.get('/sync-time', function(req, res, next) {
  exec(`cd ../dvr && ${CMD_UPDATE_TIME}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`=========error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`============stderr: ${stderr}`);
      return;
    }
    console.log(`===============stdout: ${stdout}`);
  });
  res.json('');
});

router.get('/re-encode', function(req, res, next) {
  exec(`cd ../dvr && ${CMD_RE_ENCODE}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`=========error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`============stderr: ${stderr}`);
      return;
    }
    console.log(`===============stdout: ${stdout}`);
  });
  res.json('');
});

module.exports = router;
