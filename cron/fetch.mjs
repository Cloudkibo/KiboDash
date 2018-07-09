import {} from 'dotenv/config'
import { fetchPlatformAggragateData } from './fetchPlatformAggregate'
import { fetchPageAggragateData } from './fetchPageAggregate'



fetchPlatformAggragateData().then((data) => {
	console.log(data)
}).catch((err) => {
	console.log("ERROR", err)
})


fetchPageAggragateData().then((data) => {
	console.log(data)
}).catch((err) => {
	console.log("ERROR", err)
})
