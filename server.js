const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;
const helmet = require('helmet');
const compression = require('compression');
const uuidv4 = require('uuid/v4');
const server = express();

server.use(compression());
server.use(helmet());

server.get("/", (req, res) => {
    res.json({
        "uid": `urn:uuid:odo-${uuidv4()}`,
        "updateDate": new Date().toISOString(), // we set this as latest for now
        "titleText": `Github Issues for odo at ${new Date().toDateString()}`,
        "mainText": "Currently you have no issues in odo",
        "redirectionUrl": "https://github.com/openshift/odo/issues"
      })
})

server.listen(port, () =>
console.log(`Listening on port ${port}`)
);
