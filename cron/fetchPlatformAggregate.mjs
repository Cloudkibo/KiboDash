import MongoClient  from 'mongodb'
import { filterConnectedPages, countResults } from './pipeline'


export async function fetchPlatformAggragateData(){
	
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
	console.log("Fetching platform aggregate data")

	let totalConnetedPages = await db.collection('pages').aggregate([ filterConnectedPages, countResults]).toArray()
	data['totalConnetedPages'] = totalConnetedPages[0].count

	let totalPages = await db.collection('pages').aggregate([ countResults ]).toArray()
	data['totalPages'] = totalPages[0].count

	let totalUsers = await db.collection('users').aggregate([ countResults ]).toArray()
	data['totalUsers'] = totalUsers[0].count

	let totalSubscribers = await db.collection('subscribers').aggregate([ countResults ]).toArray()
	data['totalSubscribers'] = totalSubscribers[0].count

	let totalBroadcasts = await db.collection('broadcasts').aggregate([ countResults ]).toArray()
	data['totalBroadcasts'] = totalBroadcasts[0].count

	let totalPolls = await db.collection('polls').aggregate([ countResults ]).toArray()
	data['totalPolls'] = totalPolls[0].count

	let totalSurveys = await db.collection('surveys').aggregate([ countResults ]).toArray()
	data['totalSurveys'] = totalSurveys[0].count

	console.log("Done fetching platform aggregate data")
	return data
}

