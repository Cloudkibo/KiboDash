import { PlatformAggregate } from './PlatformAggregate'

PlatformAggregate.sync({force: true}).then(() => {
  console.log("PlatformAggregate Table Created")
});
