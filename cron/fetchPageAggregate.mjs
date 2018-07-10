import MongoClient  from 'mongodb'
import { joinPageWithSubscribers, selectPageFields, broadcastPageCount,
		 filterZeroPageCount, countResults,
		 selectPageIdAndPageCount, getPageCountGreaterThanZero,
		 expandPageIdArray, countByPageId } from './pipeline'


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


	// Broadcast Count Start
	data  = await getBroadcastCount(db, data)

	// Poll Count Start
	data  = await getPollCount(db, data)	

	// Survey Count Start
	data  = await getSurveyCount(db, data)	


	console.log("Done fetching page aggregate data")
	return data
}


async function getBroadcastCount(db, data){
	let numberOfBroadcast = await db.collection('broadcasts').aggregate([ broadcastPageCount, filterZeroPageCount, countResults]).toArray()
	numberOfBroadcast = numberOfBroadcast[0].count

	data = data.map((page) => {
		page.numberOfBroadcasts = numberOfBroadcast
		return page
	})

	let pageWiseBroadcast = await db.collection('broadcasts').aggregate([ selectPageIdAndPageCount, getPageCountGreaterThanZero, expandPageIdArray, countByPageId ]).toArray()
	
	data = data.map((page) => {
		pageWiseBroadcast.forEach((item) => {
			if (page.pageId == item._id) page.numberOfBroadcasts += item.count
		})
		return page
	})

	return data
}

async function getPollCount(db, data){
	let numberOfPoll = await db.collection('polls').aggregate([ broadcastPageCount, filterZeroPageCount, countResults]).toArray()
	numberOfPoll = numberOfPoll[0].count

	data = data.map((page) => {
		page.numberOfPolls = numberOfPoll
		return page
	})

	let pageWisePoll = await db.collection('polls').aggregate([ selectPageIdAndPageCount, getPageCountGreaterThanZero, expandPageIdArray, countByPageId ]).toArray()
	
	data = data.map((page) => {
		pageWisePoll.forEach((item) => {
			if (page.pageId == item._id) page.numberOfPolls += item.count
		})
		return page
	})

	return data
}

async function getSurveyCount(db, data){
	let numberOfSurvey = await db.collection('surveys').aggregate([ broadcastPageCount, filterZeroPageCount, countResults]).toArray()
	numberOfSurvey = numberOfSurvey[0].count

	data = data.map((page) => {
		page.numberOfSurveys = numberOfSurvey
		return page
	})

	let pageWiseSurvey = await db.collection('surveys').aggregate([ selectPageIdAndPageCount, getPageCountGreaterThanZero, expandPageIdArray, countByPageId ]).toArray()
	
	data = data.map((page) => {
		pageWiseSurvey.forEach((item) => {
			if (page.pageId == item._id) page.numberOfSurveys += item.count
		})
		return page
	})

	return data
}
