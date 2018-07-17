import MongoClient from 'mongodb'
import {
  joinPageWithSubscribers, selectPageFields, pageWiseAggregate
} from './pipeline'

export async function fetchPageAggragateData () {
  console.log('Connecting with mongodb')
  let client
  try {
    client = await MongoClient.connect(process.env.MONGO_URL)
    const db = client.db(process.env.MONGO_DB)
    console.log('Connected mongodb successfully')
    const data = await getData(db)
    client.close()

    return data
  } catch (err) {
    console.log(err.stack)
  }
  if (client) {
    client.close()
    console.log('Closed connection with MongoDB')
  }
}
async function getData (db) {
  let data = {}
  console.log('Fetching page aggregate data')

  let results = await db.collection('pages').aggregate([joinPageWithSubscribers, selectPageFields]).toArray()
  data = results
  // Broadcast Count Start
  data = await getBroadcastCount(db, data)
  // Poll Count Start
  data = await getPollCount(db, data)
  // Survey Count Start
  data = await getSurveyCount(db, data)
  console.log('Done fetching page aggregate data')
  return data
}
async function getBroadcastCount (db, data) {
  let numberOfBroadcasts = await db.collection('page_broadcasts').aggregate([pageWiseAggregate]).toArray()
  data = data.map((page) => {
    numberOfBroadcasts.forEach((item) => {
      if (page.pageId == item._id.pageId) {
        page['numberOfBroadcasts'] = item.totalCount
      }
    })
    return page
  })
  return data
}

async function getPollCount (db, data) {
  let numberOfPolls = await db.collection('page_polls').aggregate([pageWiseAggregate]).toArray()
  data = data.map((page) => {
    numberOfPolls.forEach((item) => {
      if (page.pageId == item._id.pageId) {
        page['numberOfPolls'] = item.totalCount
      }
    })
    return page
  })
  return data
}

async function getSurveyCount (db, data) {
  let numberOfSurveys = await db.collection('page_surveys').aggregate([pageWiseAggregate]).toArray()
  data = data.map((page) => {
    numberOfSurveys.forEach((item) => {
      if (page.pageId == item._id.pageId) {
        page['numberOfSurveys'] = item.totalCount
      }
    })
    return page
  })
  return data
}
