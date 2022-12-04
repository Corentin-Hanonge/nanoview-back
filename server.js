

const express = require('express')

      peersService = require('./services/peersService.js')
      dbService = require('./services/DBfill-update.js')

      repService = require('./services/getRepresentative.js')

      coordinatesCalc = require('./services/CoordinatesCalculator.js')

      app = express()

      mongoose = require('mongoose')

      cors = require('cors')

      PORT = process.env.PORT || 3000


const uri = "mongodb+srv://choco:lQ6K9Itmh4ATvsaZ@nano-fr.qnidto0.mongodb.net/?retryWrites=true&w=majority"

//CONNECT TO MONGOOSE DATABASE
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> console.log("database connected"));

//ALOW CROSS-ORIGIN-REQUESTS FOR ALL ENDPOINTS : requests comming from another domain
app.use(cors())

//INCOMING GET : FOR NODE COORDINATES
app.get('/nano-nodes', (req,res) => {

    let peers = peersService.getPeersInfo().then((response) => {
      res.json(response)
    })
  })

app.get('/representative/:account', (req,res) => {


  let peers = repService.getRep(req.params.account).then((response) => {
    res.json(response)
    console.log(response)
    console.log(req.params.account)
  })

})

//repService.getRep("nano_3bywqxjuiz4qa65za3z9r61x6wsazz5i5kd55f174s6r8w8pgoxt9zgkew96").then(console.log)

//INCOMING GET : FOR PROJECTS INFO
//peersService.getPeersInfo().then(console.log)

// 1. 
dbService.insertNodesInDb()

//dbService.sendQuorumRequest().then(console.log)

//dbService.fetchLocationFromIp("52.24.24.124").then(console.log)
//app.get...

//2.
//coordinatesCalc.insertSpherical()

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
