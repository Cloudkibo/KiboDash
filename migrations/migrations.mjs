import { PlatformAggregate } from './PlatformAggregate'




async function runMigrations() {

	console.log("Starting Migrations....")
	await PlatformAggregate.sync({force: true})
	console.log("PlatformAggregate Table Created")
	console.log("Migrations Completed")

}

runMigrations()
