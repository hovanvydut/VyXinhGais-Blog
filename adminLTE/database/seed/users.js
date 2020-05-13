const TABLE_NAME = 'users';

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex(TABLE_NAME)
        .del()
        .then(() => {
            console.log('user seed');
            // Inserts seed entries
            return knex(TABLE_NAME).insert([
                {
                    id: '4d89-745a-78bc-7c9c-1175',
                    name: 'Ho Van Vy',
                    email: 'hovanvydut@gmail.com',
                    password:
                        '$2a$10$YVthGtXDiVDi.kYgW.oilOf6M6QjpSjSDDp7qMEPyxTCYa9tBDpki',
                    avatar: '/static/uploads/default-avatar.png',
                    role: 'admin',
                },
            ]);
        });
};
