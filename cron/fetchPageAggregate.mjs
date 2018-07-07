import MongoClient  from 'mongodb'
import { joinPageWithSubscribers, selectPageFields } from './pipeline'


export async function fetchPageAggragateData(){
	
	console.log("Connecting with mongodb")
	let client;
	try {
	  client = await MongoClient.connect(process.env.MONGO_URL)
	  const db = client.db(process.env.MONGO_DB)
	  console.log("Connected mongodb successfully")
	  const data = await getData(db)
	  client.close()
	  return data
	} catch (err) {
	  console.log(err.stack);
	}
	if (client) {
	  client.close();
	  console.log("Closed connection with MongoDB")
	}
}


async function getData(db){
	let data = {}
	console.log("Fetching page aggregate data")

	let results = await db.collection('pages').aggregate([ joinPageWithSubscribers, selectPageFields]).toArray()
	data = results



	console.log("Done fetching page aggregate data")
	return data
}

