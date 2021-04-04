# 🍕 VYXINHGAIS-BLOG



Welcome to my page 😎. I'm hoping you find anything interesting you in my repository.

## ⚙️ INSTALLATION

***

Before installing, **download and install Nodejs.**\
Then use `npm install` command

```console
$ npm install
```

Then, preparing a google account wthich is disable lesssecureapps following [this guide](https://myaccount.google.com/lesssecureapps). And edit 2 env variables(`MAIL_ACCOUNT`, `MAIL_PASSWORD`) as your google accout.

If you haven't installed knex as global, please run this command:

```console
$ npm i -g knex
```

This app use [cloudinary](https://cloudinary.com/) as storage to store images that user upload. So you have to edit env variables (`CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) as information you can get in your cloudinary account

Finally, create new database named `node_s_group` in your **MySQL**
## 🎉 FEATURES

***

- CRUD Post, Tag, Category, User
- CRUD User Profile
- Dont allow multiple login from one account
- After 30m unactive, the account will log out
- Role based authorization
  -   Customer: can write a new post and view our posts
  -   Admin: can CRUD post, users, tag, category...
  -   Moderator: updating ...
## 🚀 GETTING STARTED

***

Seeding data into `node_s_group` database

```console
$ knex seed:run --specific=users.js
$ knex seed:run --specific=post.js
$ knex seed:run --specific=tags.js
$ knex seed:run --specific=users.js
```

Start the server

```console
$ npm start
```

This app's listening on port **3000**\

You can access url `localhost:3000/admin` to view the login page\

This app provied 2 accounts:

- Admin account: `hovanvydut@gmail.com`; password: `abcdef123A!`

- Customer account: `nguyenvanan@gmail.com`; password: `abcdef123A!`
## 👨‍🔧 CONTRIBUTORS

***

💀None

## 🎖 LICENSE