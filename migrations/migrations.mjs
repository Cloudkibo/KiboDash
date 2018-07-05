import { PlatformAggregate } from './PlatformAggregate'




sync function runMigrations() {

	console.log("Starting Migrations....")
	await PlatformAggregate.sync({force: true})
	console.log("PlatformAggregate Table Created")
	console.log("Migrations Completed")

}

runMigrations()
