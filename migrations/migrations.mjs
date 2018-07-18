import { PlatformAggregate } from './PlatformAggregate'
import { PageAggregate } from './PageAggregate'
import { UserAggregate } from './UserAggregate'
import { HistoryData } from './History'



async function runMigrations() {

	console.log("Starting Migrations")

	await PlatformAggregate.sync()
	await PageAggregate.sync()
	await UserAggregate.sync()
	await HistoryData.sync()
	
	console.log("Migrations Completed")

}

runMigrations()
