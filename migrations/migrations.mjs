import { PlatformAggregate } from './PlatformAggregate'



console.log("Starting Migrations....")
PlatformAggregate.sync({force: true}).then(() => {
  console.log("PlatformAggregate Table Created")
}).catch((err) => {
	console.log("Some Error Occured", err)
})
console.log("Migrations Completed")
