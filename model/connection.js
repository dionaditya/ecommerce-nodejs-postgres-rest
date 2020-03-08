const slonik = require('slonik')

const pool = slonik.createPool("postgres://newadmin:semarang@localhost:5432/newdb")

pool.connect(async (connection) => {
    try {
        console.log('connection succesfully')
        
    } catch(error) {
        console.log('error', error)
    }
})

module.exports = pool