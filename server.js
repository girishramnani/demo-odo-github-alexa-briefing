const express = require('express');
const axios = require("axios");
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;
const helmet = require('helmet');
const compression = require('compression');
const uuidv4 = require('uuid/v4');
const server = express();

server.use(compression());
server.use(helmet());

const repo_identifier = "openshift/odo"
const repo_name = "odo"

function get_repo_and_issues() {
  return axios.get(`http://${process.env.COMPONENT_PYTHON_REPO_ISSUE_A_NBXM_HOST}:${process.env.COMPONENT_PYTHON_REPO_ISSUE_A_NBXM_PORT}/${repo_identifier}`)
}

server.get("/", (req, res) => {

    get_repo_and_issues().then((response) => {
      res.json({
        "uid": `urn:uuid:odo-${uuidv4()}`,
        "updateDate": new Date().toISOString(), // we set this as latest for now
        "titleText": `Github Issues for ${repo_name} on ${new Date().toDateString()}`,
        "mainText": `There were ${response.data.last7days} issues opened in ${repo_name} since last 7 days`,
        "redirectionUrl": `https://github.com/${repo_identifier}/issues`
      })
    })
  
})

server.listen(port, () =>
console.log(`Listening on port ${port}`)
);
