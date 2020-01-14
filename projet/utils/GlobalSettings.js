export function countElement(array) {
    return array.length;
}


export const burl = '';

export function testEmail(email) {
    return REGEX_EMAIL.test(email);
}

const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;