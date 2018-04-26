import * as request from 'superagent'
const baseUrl = process.env.SERVER_URL || 'http://localhost:4001'
request
  .post(`${baseUrl}/teachers`)
  .send({email:'super@example.com', password:'SuperUser'})
  .then(result=>{
    console.log('Successfully created')
  })
  .catch(err=>{
    console.error(err)
  })
