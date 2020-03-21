# START

-   \$ npm i
-   create database named `node_s_group`
-   \$ knex seed:run --specific=users.js
-   \$ knex seed:run --specific=post.js
-   \$ knex seed:run --specific=tags.js
-   \$ knex seed:run --specific=users.js
-   \$ cd adminlte
-   \$ npm start
-   port 3000
-   account: admin -> hovanvydut@gmail.com ; customer -> nguyenvanan@gmail.com
-   password for all user is : `abcdef123A!`

# LOGIN/LOGOUT FEATURE

-   Dont allow multiple login from one account
-   After 30m unactive, the account will log out
