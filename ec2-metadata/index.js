const axios = require('axios');

const path = require('path');
const express = require('express')
const app = express()
const port = 3000
const BASE_URL = 'http://169.254.169.254/latest/meta-data'

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/metadata', async (req, res) => {

  try {
    const response = await axios.all([
      axios.get(`${BASE_URL}/instance-id`),
      axios.get(`${BASE_URL}/hostname`),
      axios.get(`${BASE_URL}/local-hostname`) ,
      axios.get(`${BASE_URL}/public-hostname`) ,
      axios.get(`${BASE_URL}/public-ipv4`),
      axios.get(`${BASE_URL}/placement/availability-zone`)

    ]);
    let json = {
      instance_id: response[0].data,
      hostname: response[1].data,
      local_hostname: response[2].data,
      public_hostname: response[3].data,
      public_ipv4: response[4].data,
      availability_zone: response[5].data
    }


    console.log(json);
    res.send(json)

  } catch (error) {
    console.error(error);
    res.send(error)

  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

