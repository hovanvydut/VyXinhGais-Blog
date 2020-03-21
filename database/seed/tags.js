const TABLE_NAME = 'tags';

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex(TABLE_NAME)
        .del()
        .then(() => {
            console.log('tags seed');
            // Inserts seed entries
            return knex(TABLE_NAME).insert([
                { id: '286b-e86b-62fd-9a29-d850', name: 'C#' },
                { id: '3ca1-8d52-5362-00aa-f603', name: 'Javacripts' },
                { id: 'dcd9-e37f-9f2a-eebf-7b61', name: 'Ruby' },
                { id: 'f32f-82f7-c7cf-1c8c-ec3e', name: 'JS' },
            ]);
        });
};
