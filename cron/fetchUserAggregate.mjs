import MongoClient from 'mongodb'
import {
    selectCompanyFields, companyWisePageCount, filterConnectedPages,
    companyWiseAggregate, joinCompanyWithSubscribers
} from './pipeline'
export async function fetchUserAggregateData () {
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
  console.log('Fetching user wise aggregates')
  data = await db.collection('companyusers').aggregate([joinCompanyWithSubscribers, selectCompanyFields]).toArray()
  data = await getBroadcastCount(db, data)
  data = await getPollCount(db, data)
  data = await getSurveyCount(db, data)
  data = await getTotalPageCount(db, data)
  data = await getConnectedPageCount(db, data)
  return data
}

async function getBroadcastCount (db, data) {
  let numberOfBroadcast = await db.collection('broadcasts').aggregate([companyWiseAggregate]).toArray()
  data = data.map((company) => {
    numberOfBroadcast.forEach((broadcast) => {
      if (company.companyId.toString() === broadcast._id.toString()) {
        company['numberOfBroadcasts'] = broadcast.totalCount
      }
    })
    return company
  })

  return data
}

async function getPollCount (db, data) {
  let numberOfPolls = await db.collection('polls').aggregate([companyWiseAggregate]).toArray()
  data = data.map((company) => {
    numberOfPolls.forEach((poll) => {
      if (poll._id.toString() === company.companyId.toString()) {
        company['numberOfPolls'] = poll.totalCount
      }
    })
    return company
  })
  return data
}

async function getSurveyCount (db, data) {
  let numberOfSurveys = await db.collection('surveys').aggregate([companyWiseAggregate]).toArray()
  data = data.map((company) => {
    numberOfSurveys.forEach((survey) => {
      if (survey._id.toString() === company.companyId.toString()) {
        console.log('surevy', survey)
        company['numberOfSurveys'] = survey.totalCount
      }
    })
    return company
  })
  return data
}

async function getTotalPageCount (db, data) {
  let companyPagesCount = await db.collection('pages').aggregate([companyWisePageCount]).toArray()
  data = data.map((company) => {
    companyPagesCount.forEach((page) => {
      if (company.companyId.toString() === page._id.toString()) {
        console.log('page' + page)
        company['numberOfPages'] = page.totalPages
      }
    })
    return company
  })

  return data
}

async function getConnectedPageCount (db, data) {
  let companyConnectedPagesCount = await db.collection('pages').aggregate([filterConnectedPages, companyWisePageCount]).toArray()
  data = data.map((company) => {
    companyConnectedPagesCount.forEach((page) => {
      if (company.companyId.toString() === page._id.toString()) {
        console.log('page' + page)
        company['numberOfConnectedPages'] = page.totalPages
      }
    })
    return company
  })

  return data
}
