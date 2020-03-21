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
                {
                    id: 'fa70-c6b7-5244-41a8-0224',
                    name: 'Nguyen Van An',
                    email: 'nguyenvanan@gmail.com',
                    password:
                        '$2a$10$a7p7/H7At0EovkRqkV713uCS24jZAsXFAVSCR4JxUFsQUh0/1mQiC',
                    avatar: '/static/uploads/default-avatar.png',
                    role: 'customer',
                },
            ]);
        });
};
