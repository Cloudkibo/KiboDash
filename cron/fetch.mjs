import { } from 'dotenv/config'
import { fetchPlatformAggragateData } from './fetchPlatformAggregate'
import { fetchPageAggragateData } from './fetchPageAggregate'
import { fetchUserAggregateData } from './fetchUserAggregate'
fetchPlatformAggragateData().then((data) => {
  console.log(data)
}).catch((err) => {
  console.log('ERROR', err)
})
fetchPageAggragateData().then((data) => {
  console.log(data)
}).catch((err) => {
  console.log('ERROR', err)
})

fetchUserAggregateData().then((data) => {
  console.log(data)
}).catch((err) => {
  console.log('ERROR', err)
})
