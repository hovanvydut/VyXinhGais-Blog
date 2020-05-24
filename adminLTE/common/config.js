const defaultAvtLink = [
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289423/VyXinhGais-Blog/avatar/default/default-avatar-8_tzlnmq.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289422/VyXinhGais-Blog/avatar/default/default-avatar-6_hy6odx.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289422/VyXinhGais-Blog/avatar/default/default-avatar-1_e8giie.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289422/VyXinhGais-Blog/avatar/default/default-avatar-2_poacpz.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289422/VyXinhGais-Blog/avatar/default/default-avatar-5_jvqma8.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289422/VyXinhGais-Blog/avatar/default/default-avatar-9_mwetwf.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289422/VyXinhGais-Blog/avatar/default/default-avatar-3_dh1jvk.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289421/VyXinhGais-Blog/avatar/default/default-avatar-10_iz0nfy.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289421/VyXinhGais-Blog/avatar/default/default-avatar-7_bptoqz.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1590289421/VyXinhGais-Blog/avatar/default/default-avatar-4_kvblgd.png',
];
const defaultPostThumb = () =>
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1587889327/VyXinhGais-Blog/thumbnail/default-post-thumbnail_hsmmwv.png';

const defaultAvatar = () => {
    const randomIdx = Math.floor(Math.random() * 11);
    console.log(randomIdx);
    return defaultAvtLink[randomIdx];
};

module.exports = {
    defaultPostThumb,
    defaultAvatar,
};
