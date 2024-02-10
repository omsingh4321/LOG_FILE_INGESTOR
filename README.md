# Log File Ingestor and Searching
## Introduction
Welcome to the MERN Log Ingestor and searching, a powerful solution for handling and managing high volumes of data seamlessly. This cutting-edge application, built on the MERN (MongoDB, Express.js, React.js, Node.js) technology stack, provides a robust and scalable infrastructure for efficiently ingesting and processing log data.
## Getting Started
-->Simply Clone the project from git clone and run it on vs code<br>
-->Then install all dependencies using npm install on frontend and backend both<br>
-->In backend i have added RabbitMq open-source message broker software to handle the large amount of data at once which generally stores the data on queue and pushes on mongo db one by one so that the database should not be overloaded at once
-->I've integrated pagination into the MERN stack application, enhancing user experience by efficiently managing large datasets. This feature enables users to navigate through content seamlessly, improving accessibility and performance. With pagination, users can access specific portions of data without overwhelming the interface, promoting a smoother browsing experience.
### TO install RabbitMq Follow THese Steps
 ##### Run Following Commands in Ubuntu terminal
     1) sudo apt update (To update the package list)
     2) sudo apt install rabbitmq-server (Install RabbitMQ Server)
     3) sudo service rabbitmq-server start (Start the RabbitMQ service)
     4) sudo systemctl enable rabbitmq-server (Enable the rabbit mq sevice)
     5) sudo service rabbitmq-server status (To check the service status)
## Setting of env file 
DBURL=Use your database Mongo URL<br>
RABITMQ_CON_URL=amqp://localhost(By default)<br>
dbName=Your db name<br>
QUEUE=DyteQueue<br>
PORT=3000<br>
limit=10<br>
## For Searching Logs
The user has to search a keyword and then click on the search button to get  the belong data
![image](https://github.com/dyte-submissions/november-2023-hiring-omsingh4321/assets/110286904/54525053-6ee2-4b6b-a760-ebc58a5fd275)
