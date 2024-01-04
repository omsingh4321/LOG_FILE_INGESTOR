# Log File Ingestor and Searching
## Introduction
Welcome to the MERN Log Ingestor and searching, a powerful solution for handling and managing high volumes of data seamlessly. This cutting-edge application, built on the MERN (MongoDB, Express.js, React.js, Node.js) technology stack, provides a robust and scalable infrastructure for efficiently ingesting and processing log data.
## Getting Started
-->Simply Clone the project from git clone and run it on vs code<br>
-->Then install all dependencies using npm install on frontend and backend both<br>
-->In backend i have added RabbitMq open-source message broker software to handle the large amount of data at once which generally stores the data on queue and pushes on mongo db one by one so that the database should not be overloaded at once
### TO install RabbitMq Follow THese Steps
 ##### Run Following Commands in Ubuntu terminal
     1) sudo apt update (To update the package list)<br>
     2) sudo apt install rabbitmq-server (Install RabbitMQ Server)<br>
     3) sudo service rabbitmq-server start (Start the RabbitMQ service)<br>
     4) sudo systemctl enable rabbitmq-server (Enable the rabbit mq sevice)<br>
     5) sudo service rabbitmq-server status (To check the service status)
## Setting of env file 
DBURL=Use your database Mongo URL<br>
RABITMQ_CON_URL=amqp://localhost(By default)<br>
dbName=Your db name<br>
QUEUE=DyteQueue<br>
PORT=3000<br>
limit=10<br>
## PostMan Link
https://api.postman.com/collections/25682727-9f340ad3-4e9a-4d7f-99a4-e4bda1fdeeef?access_key=PMAT-01HFKXHW6457ZDJQY7Z89RCM9F
## Log Ingestor
Use api provided to ingest data in the mongo db
## For Searching Logs
The user has to search a keyword and then click on the search button to get  the belong data
![image](https://github.com/dyte-submissions/november-2023-hiring-omsingh4321/assets/110286904/54525053-6ee2-4b6b-a760-ebc58a5fd275)
