const axios = require("axios")

    //  url = "http://104.238.189.164:8080/proxy"
    url = "https://coco-node.fr:443/proxy"



      async function getRep(account){

        const data = {
  "action": "account_representative",
  "account": account
}
        const config = {
            headers: { "Content-Type" : "application/json" }
        }

        let res = await axios.post(url, data, config)

        return res.data;

      }





      module.exports = {
        getRep

        }
