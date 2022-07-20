const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool({
    connectionString: 'postgresql://chileno:roger153462@localhost:5432/chileno', 
    max: 100
})

const client = new Client({
    connectionString: 'postgresql://chileno:roger153462@localhost:5432/chileno'
})

client.connect()
module.exports = {
    pool,
    client
}

