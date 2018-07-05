import { PlatformAggregate } from './PlatformAggregate'
import { sequelize } from './../cron/database'

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



console.log("Starting Migrations....")
PlatformAggregate.sync({force: true}).then(() => {
  console.log("PlatformAggregate Table Created")
}).catch((err) => {
	console.log("Some Error Occured", err)
})
console.log("Migrations Completed")
