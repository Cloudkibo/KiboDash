# KiboDash

Project Structure:
==================

CRON MONITORING: https://cronhub.io/

Link to design document: https://docs.google.com/document/d/1yHdFMtfpfqd23zgaNM7Zo2s90dXZGChN_6Wg6_A8ZBg/edit#heading=h.7ouuetv9kjq4

For Database With Sync and Await

 - dashboard.py  //Main File
 - setup.sh // Pip install dependencies and configure the system
 - model //Folder
 	- database.py //Connect with MySQL which will export the connector
 	- PlatformAggregate.py
 	- UserAggregate.py
 	- PageAggregate.py
 	- History.py
 - view //Folder
 	- PlatformAggregateView.py
 	- UserAggregateView.py
 	- PageAggregateView.py
 	- HistoryView.py
 - cron //Folder
 	- fetch.js //Main Script 
	- database.js //Connect with MySQL and MongoDB
	- fetchPlatformAggregate.js
	- fetchUserAggregate.js
	- fetchPageAggregate.js
- server
	- app.js //Main File Starting Point
	- config.js //Configuration File
	- routes.js //Define the routes
	- api
		- admin
			- index.js
			- controller.js
		- v1
			- moduleName // Module Wise Folder
				- index.js
				- controller.js
				- model.js