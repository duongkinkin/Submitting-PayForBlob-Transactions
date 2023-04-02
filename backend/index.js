var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

var jsonParser = bodyParser.json();

var app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/create", jsonParser, async function (req, res, next) {
  try {
    const { data } = await axios.post("http://localhost:26659/submit_pfb", {
      namespace_id: req.body.namespace_id,
      gas_limit: Number(req.body.gas_limit),
      fee: Number(req.body.fee),
      data: Buffer.from(req.body.data).toString("hex"),
    });
    res.write(JSON.stringify(data));
  } catch (error) {
    console.log(error)
    next(error);
  } finally {
    res.end();
  }
});

app.listen(30000, () => {
  console.log(`Now listening on port ${30000}`);
});

