const Nodes = require('../schemas/nodeSchema')
      peersService = require('./peersService.js')

    const longoffset = 90;
    const latoffset = 0;

    const R = 42;


async function insertSpherical(){

  let nodes = await Nodes.find()

  nodes.forEach(async(node) => {

    let coords = await toXYZ(node.coordinates[0].long,node.coordinates[0].lat, R)

       let currentNode = await Nodes.findOneAndUpdate({ ip:node.ip},

			 {$push : { XYZcoordinates : coords}})

   });


}

function toXYZ(long, lat, r){

  let y =  Math.round(10* r * Math.sin(toRadians(lat + latoffset)))/10

  let z =   Math.round(10* r * Math.cos(toRadians(long + longoffset)) *  Math.cos(toRadians(lat + latoffset)))/10

  let x =  Math.round(10* r * Math.sin(toRadians(long + longoffset))*  Math.cos(toRadians(lat + latoffset)))/10

  return ({x: x, y:y, z:z})

}



function toRadians (angle) {
  return angle * (Math.PI / 180);
}

module.exports = {
  	insertSpherical
  }
