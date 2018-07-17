## Operations Guide

#### Setup Database

You should have MySql installed on your system.

#### Setup Nodejs and NPM

You should have Nodejs and NPM installed on your system.

#### Install Forever

To install forever run the following command:

    npm install forever -g

#### Install Git

    sudo apt-get update
    sudo apt-get install git

#### Clone

Now, clone the project:

    git clone https://github.com/Cloudkibo/KiboDash.git

#### Redirect the ports to our application ports
Now on terminal, set the environment variables in /etc/environment.

    nano /etc/environment

We need to set the following variables: (Just copy paste and then change the values)

    DB_MYSQL =<PATH TO MYSQL DB>
    CRON_SCRIPT_PATH =<PATH TO CRON SCRIPT>
    DOMAIN=<YOUR DOMAIN>
    NODE_PATH =<NODE INSTALLATION PATH>

Now, run the following command to install dependencies:

    npm install

Now, we need to run npm script to add cron job into crontab of server.

    npm run start:cron_script

We can check if the service is added correctly or not by following command.

    crontab -l                 
        
        if the output is of the following form
            * * * * * /some/path/to/node /root/KiboPush/scripts/mongodb_script.js
        then the service has been added, otherwise service is not added correctly.


## CRONJOB GUIDE
In order to remove the cronjobs, we can run the following command.

    crontab -r

    now run the following command to check that cronjob is indeed deleted

        crontab -l

    output will be "no cronjobs for <USERNAME>"

In order to check when was the last time crontab file was edited

    crontab -v

#### Finding the NODE_PATH and CRON_SCRIPT_PATH

To find the NODE_PATH, run the following command.

    which node          (make sure that you have node installed)

    output will be like below
    /root/.nvm/something/path

CRON_SCRIPT_PATH is as below

    /path/to/cron/scripts

#### CHANGING THE TIME IN CRON SCRIPT

In cron job, "* * * * *" is responsible for the time interval.
All stars means that script will run after 1 minute forever.


    *     *     *   *    *        command to be executed
    -     -     -   -    -
    |     |     |   |    |
    |     |     |   |    +----- day of week (0 - 6) (Sunday=0)
    |     |     |   +------- month (1 - 12)
    |     |     +--------- day of        month (1 - 31)
    |     +----------- hour (0 - 23)
    +------------- min (0 - 59)


There is a detailed guide for this time interval phrase in below link:

    https://crontab.guru/

The decided time frame can be added in cronjob_script file.

#### ADDING CRONJOB MANUALLY IN THE CRONTAB------(BUT DON'T DO THIS)

In order to add cronjob manually, run the following script

    crontab -e 

    this opens a secure copy of original crontab file in the default editor

    add the cronjob in the following order.

    * * * * * /path/to/node /path/to/script

    above will run the script after every minute using node


#### PATH TO CRONTAB FILE IS AS FOLLOWING

User crontab files are stored by the login names in different locations in different Unix and Linux flavors. These files are useful for backing up, viewing and restoring but should be edited only with crontab command by the users.

    BSD Unix 
    /var/cron/tabs/

    Solaris, HP-UX, Debian, Ubuntu
    /var/spool/cron/crontabs/

    AIX, Red Hat Linux, CentOS, Ferdora
    /var/spool/cron/

