
const Nodes = require('../schemas/nodeSchema')

async function getPeersInfo() {

  let res = await Nodes.find()
  return res

}

module.exports = {
  	getPeersInfo
  }
