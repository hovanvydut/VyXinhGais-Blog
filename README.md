# Feature

-   Profile (Click avatar after login);
-   Write new post
-   CRUD post, user, tag, category
-   ...updating

# START

-   \$ npm i
-   create database named `node_s_group` in phpMyadmin
-   \$ knex seed:run --specific=users.js
-   \$ knex seed:run --specific=post.js
-   \$ knex seed:run --specific=tags.js
-   \$ knex seed:run --specific=users.js
-   \$ cd adminlte
-   \$ npm start
-   port 3000
-   NOTE: account: admin -> hovanvydut@gmail.com ; customer -> nguyenvanan@gmail.com
-   password for all user is : `abcdef123A!`

# LOGIN/LOGOUT FEATURE

-   Dont allow multiple login from one account
-   After 30m unactive, the account will log out

# Role based authorization

-   Customer: can write a new post and view our posts
-   Admin: can CRUD post, users, tag, category...
-   Moderator: updating ...
