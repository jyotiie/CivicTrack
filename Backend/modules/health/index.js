/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const mongoose             = require('mongoose')

router.get('/ping', function (req, res) {
  res.send("Pong!");
});

router.get('/ping/redis', async function (req, res) {
  let ping = await redisCon.ping();
  if (ping != null) { 
    res.send("Pong!");
  } else {
    res.status(401);
    res.send("Connection Failed");
  }
})

router.get('/ping/mongo', async function (req, res) {
  let ping = await Number(mongoose.connection.readyState);
  if (ping == 1) { 
    res.send("Pong!");
  } else {
    res.status(401);
    res.send("Connection Failed");
  }
})