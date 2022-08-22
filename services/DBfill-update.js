const axios = require("axios")

      Nodes = require('../schemas/nodeSchema.js')

      url = "https://coco-node.fr:443/proxy"



//Send a request to a public node to get :
//{peers:[
//        {
//            "account": "nano_1k5fqb5q6t44tsd13ziny66w6mxbya6x397g7tkz7hnkcpppofuojzs7qmik",
//            "ip": "[::ffff:89.58.8.22]:7075",
//            "weight": "69808257810963247968409035752360833"
//        }, ...
//]}


async function sendQuorumRequest(){

  const data = {
  "action": "confirmation_quorum",
  "peer_details": "true"
}
  const config = {
      headers: { "Content-Type" : "application/json" }
  }

  let res = await axios.post(url, data, config)

  return res.data.peers;

}

//sendQuorumRequest().then(console.log)
//Insert all nodes address and IP in our database, clean IP address

async function insertNodesInDb(){


try {

  sendQuorumRequest().then(async (nodeInfoList) => {

//    console.log(nodeInfoList)


    for (let i= 0; i<nodeInfoList.length; i++) {
  //  nodeInfoList.forEach(async(node) => {

    //clean IP address : remove the fffff::...
     let iPWithBracket = nodeInfoList[i].ip.split(":")[3]
     let ip = iPWithBracket.substring(0,iPWithBracket.length-1)

    //look for a node with same ip in db


       let nodeExists = await Nodes.exists({ip : ip})

       if (nodeExists){
         console.log("node already in db")
       }

       else{

                   let fetchedNodeInfo = await fetchLocationFromIp(ip)


                  let insertInfo = await Nodes.create({
                  ip: ip,
                  nanoAddress : nodeInfoList[i].account,
                  country: fetchedNodeInfo.country,
                  coordinates:[{
                    long: fetchedNodeInfo.lon,
                    lat: fetchedNodeInfo.lat
                  }],
                  coordinatesXYZ:[]
                }).then(console.log("node inserted"))

       }


      setTimeout(() => {}, 500);

  }


  })



} catch (e) {

  console.log(e);

}



}


// Use a free API to get location from IP,
// expected answer format :
// {
//   status: 'success',
//   country: 'United States',
//   countryCode: 'US',
//   region: 'OR',
//   regionName: 'Oregon',
//   city: 'Portland',
//   zip: '97207',
//   lat: 45.5235,
//   lon: -122.676,
//   timezone: 'America/Los_Angeles',
//   isp: 'Amazon.com, Inc.',
//   org: 'AWS EC2 (us-west-2)',
//   as: 'AS16509 Amazon.com, Inc.',
//   query: '52.24.24.124'
// }


async function fetchLocationFromIp(ip){

  let request = await axios.get('http://ip-api.com/json/'+ip);
  return request.data

}


//insertNodesInDb()

//sendQuorumRequest().then(console.log)


module.exports = {
    sendQuorumRequest,
  	insertNodesInDb,
    fetchLocationFromIp

  }
