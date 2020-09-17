## Setup PostGreSQL (Locally)

#### Step 1: Install PostGreSQL

You should have PostGreSQL installed on your system.

For MacOs you can install it using Homebrew:

    brew update
    brew install postgresql
    postgres --version

#### Step 2: Create a physical PostGreSQL database

You need to initialize the physical space on your hard-disk to allocate databases. To do this, create a default postgres database on the command line in case it didn't happen automatically:

    initdb /usr/local/var/postgres // For MacOs

#### Step 3: Start/Stop PostGreSQL database

Use the following commands to start/stop PostGreSQL database:

    pg_ctl -D /usr/local/var/postgres start
    pg_ctl -D /usr/local/var/postgres stop

#### Step 4: Create PostGreSQL database

You need to craete a PostGreSQL database that can be used for your application.

Use the following commands to create and remove database

    createdb mydatabasename
    dropdb mydatabasename

#### Step 5: Enter psql shell to list all your databases and users

Enter psql shell using the following command:

    psql [databasename]

After entering the shell enter:

    /list - To list all databases
    /du - To list all users
    CTRL + d - To exit psql shell
