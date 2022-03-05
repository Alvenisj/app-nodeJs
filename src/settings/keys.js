
let host = 'boihcpo7soy87gt-mongodb.services.clever-cloud.com'
let db = 'boihcpo7soy87gt'
let user = 'uwr6qf1gtg0i03kvzlue'
let port = 27017
let password = 'qgVXIL90vHqbaiDme8md'

const database = `mongodb://${user}:${password}
@${host}:${port}/${db}`;


export {database};