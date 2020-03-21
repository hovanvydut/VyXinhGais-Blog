const TABLE_NAME = 'posts';

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex(TABLE_NAME)
        .del()
        .then(() => {
            console.log('posts seed');
            // Inserts seed entries
            return knex(TABLE_NAME).insert([
                {
                    id: '5b78-1796-d46a-5b20-9e62',
                    title: 'Create random number or string',
                    content: `<p><img src="/static/uploads/seed-imageUpload5177-07d2-acd8-9621-3c1f1584689541488.jpg" width="200" height="200" /></p>
                <p>&nbsp;</p>
                <pre class="language-javascript"><code>const express = require('express');
z
                const router = express.Router();
                const controller = require('../../controller/accounts.controlelr');
                const middleware = require('../../middleware/accounts.middleware');
                const verify = require('../../middleware/verify');

                router.get('/signin', verify.signedIn, controller.renderSignInView);

                router.post('/signin', verify.signedIn, controller.handleSignIn);

                router.get('/signup', controller.renderSignUpView);

                router.post('/signup', middleware.validateSignUp, controller.handleSignUp);

                router.get('/signout', controller.signout);

                module.exports = router;
                </code></pre>`,
                    author: '4d89-745a-78bc-7c9c-1175',
                    linkPost:
                        'create-random-number-or-string-5b78-1796-d46a-5b20-9e62',
                    description: 'description enf',
                    imgThumb: 'link img thumb',
                },
            ]);
        });
};
