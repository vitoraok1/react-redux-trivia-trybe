import md5 from 'crypto-js/md5';

const hashEmail = (email) => md5(email).toString();

export const generateUrl = (email) => `https://www.gravatar.com/avatar/${hashEmail(email)}`;
