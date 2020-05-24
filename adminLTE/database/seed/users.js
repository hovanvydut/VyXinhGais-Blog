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
                    avatar:
                        'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289422/VyXinhGais-Blog/avatar/default/default-avatar-6_hy6odx.png',
                    introduce: 'Chưa vợ, chưa con',
                    role: 'admin',
                    is_active_email: 1,
                },
            ]);
        });
};
