
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bismosioma:Student1@cluster0.9bg1vbh.mongodb.net/test?authSource=admin&replicaSet=atlas-mkd3oa-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;