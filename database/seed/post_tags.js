const TABLE_NAME = 'post_tags';

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex(TABLE_NAME)
        .del()
        .then(() => {
            console.log('post_tags seed');
            // Inserts seed entries
            return knex(TABLE_NAME).insert([
                {
                    id: 'ef5d-6eb7-d8ce-04e6-9c8a',
                    post_id: '5b78-1796-d46a-5b20-9e62',
                    tag_id: '286b-e86b-62fd-9a29-d850',
                },
                {
                    id: 'fe8b-5f84-c6c5-19dc-5f22',
                    post_id: '5b78-1796-d46a-5b20-9e62',
                    tag_id: 'f32f-82f7-c7cf-1c8c-ec3e',
                },
            ]);
        });
};
