## Windows installation

Download the MongoDB Community MSI installer from the following link

https://www.mongodb.com/download-center/community?tck=docs_server

- In the Version dropdown, select the version of MongoDB to download.
- In the OS dropdown, select Windows x64.
- In the Package dropdown, select MSI.
- Click Download.

### Run the MongoDB installer 
Follow the MongoDB Community Edition installation wizard

### Choose Setup Type
You can choose either the Complete (recommended for most users) or Custom setup type. The Complete setup option installs MongoDB and the MongoDB tools to the default location. The Custom setup option allows you to specify which executables are installed and where.

### Create database directory
Create the data directory where MongoDB stores data. MongoDB’s default data directory path is the absolute path \data\db on the drive from which you start MongoDB.

```text
cd C:\
md "\data\db"
```

```text
"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"
```

### Connect to MongoDB

```text
"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
```

[Additional windows support](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

## To use the command mongoretore:
[Visit](https://docs.mongodb.com/database-tools/mongorestore/)

Copy The dump folder from the repo to your "bin" folder in MongoDB directory,
And then open two terminal windows:
Create a folder named 'data' and inside data create a folder named 'db' in the drive where you have installed MongoDB
Open one of the terminals and type the command 
```text
mongod 
```
to start the MongoDB Server

Open the second terminal in the "bin" folder with administrative access and type the command
```text
mongorestore
``` 
to restore the DB files from the dump folder.


## To restore a single database you need to provide the path to the dump directory as part of the mongorestore command line.

For example:

# Backup the training database
mongodump --db training

# Restore the training database to a new database called training2
mongorestore --db training2 dump/training
The --db option for mongodump specifies the source database to dump.

The --db option for mongorestore specifies the target database to restore into.
