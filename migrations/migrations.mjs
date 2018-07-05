import { PlatformAggregate } from './PlatformAggregate'

console.log("Starting Migrations....")
PlatformAggregate.sync({force: true}).then(() => {
  console.log("PlatformAggregate Table Created")
});
console.log("Migrations Completed")
