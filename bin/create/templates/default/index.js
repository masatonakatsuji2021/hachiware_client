const client = require("hachiware_client");
const path = require("path");
client(path.dirname(__dirname), ["build"]);