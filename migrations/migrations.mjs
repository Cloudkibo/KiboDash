import { PlatformAggregate } from './PlatformAggregate'
import { PageAggregate } from './PageAggregate'
import { UserAggregate } from './UserAggregate'




async function runMigrations() {

	console.log("Starting Migrations")

	await PlatformAggregate.sync()
	await PageAggregate.sync()
	await UserAggregate.sync()
	
	console.log("Migrations Completed")

}

runMigrations()
