# TRIPTEC - API

MongoDB config
------------------------------------------------------------------
Start your mongod service
´´´
$ sudo systemctl start mongod.service
´´´
then create your mongod host 
´´´
$ mongo --host localhost:27017
´´´

API config
------------------------------------------------------------------
´´´
$ sudo npm install body-parsercors express mongoose neo4j-driver nodemon
´´´

NEO4j config
------------------------------------------------------------------
you can follow the next link to start your neo4j 
https://github.com/neo4j-examples/neo4j-movies-template

First thing to do is to download the neo4j community
´´´
https://neo4j.com/download-center/
´´´
then extract the tar
´´´
$ tar -xf ne4j....tar.gz
´´´

then move the folder to whee you wanted to be
the, from your project create a path var to get access, lets take for example
´´´
$ export NEO4J_HOME=/home/jairo-mm26/Documents/Jairo/Documents/BasesAvanzadas/neo4j-enterprise-3.4.10
$ $NEO4J_HOME/bin/neo4j console
´´´
Once you run this, config your user and password to get access from nodejs app
then go to the temote interface to loggin or register, then you must be able to run your node app