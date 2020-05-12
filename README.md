- admin: https://vyxinhgaisblog.herokuapp.com/
- client: https://vyxinhgaisblog.netlify.app/
- account admin: hovanvydut@gmail.com password: abcdef123A!

# SETUP

- Clone my project
- Prerequisite: installed XAMP (this project uses MySQL), one google account, one cloudinary account(to free uploading image);, one account tinyMCE, one remote mysql (I'm using free remotemysql.com);

---

adminLTE

- \$ cd adminLTE
- \$ npm i
- config file env, use your email (remember enable less-sercure app --> [https://myaccount.google.com/lesssecureapps](https://myaccount.google.com/lesssecureapps)) , display unlock capcha(https://accounts.google.com/DisplayUnlockCaptcha) and config cloudinary. Recommend use port 3000 for this.
- \$ knex migrate:latest
- access localhost:3000/admin/signup to register account, then verify your account and go to database, re-edit `users` table at `role`column with `admin` value to get full accessable feature
- Remember create tags and category before you create your posts

---

blog

- \$ cd blog
- \$ npm i
- \$ npm start
- This use port 3001

# Feature

## Admin

SignIn/SignUp:

- Active email by nodemailer, if user dont active email, user only access home page (After 30m, active email will expire, so user must login to home page to request resend active email)
- Dont allow multiple sign in to the same account. If so, destroy all session of that account (logout);
- Forgot password: one reset password email will be send when request
- destroy session's user when admin update information of users
  Manager users:
- When admin CRUD infomation of user, its session will be destroyed
- Write new Post: use tinyMCE
- Reset password

Write new post

- Upload thumbnail for post
- Write post by use tinyMCE editor

Manager tags

- CRUD

Manager categories

- CRUD

## Blog

- use React + Redux saga

# Contact

- Email: hovanvydut@gmail.com
- Fb: fb.com/hovanvydut
