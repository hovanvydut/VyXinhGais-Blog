# Feature
## Admin
SignIn/SignUp:
- Active email by nodemailer, if user dont active email, user only access home page (After 30m, active email will expire, so user must login to home page to request resend active email)
- Dont allow multiple sign in to the same account. If so, destroy all session of that account (logout);
- Forgot password: one reset password email will be send when request
- 
Manager users:
- When admin CRUD infomation of user, its session will be destroyed
- Write new Post: use tinyMCE

Manager tags
- CRUD

Manager categories
- CRUD
- 
## Blog
- use React + Redux saga


# Contact
- Email: hovanvydut@gmail.com
- Fb: fb.com/hovanvydut
