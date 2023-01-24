export const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
export const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
export const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
export const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
export const eightCharsOrMore= /.{8,}/g; // eight characters or more

/**
    This regular expression will require that the password:
    Is at least 10 characters long
    Contains at least one lowercase letter (?=.*[a-z])
    Contains at least one uppercase letter (?=.*[A-Z])
    Contains at least one number (?=.*\d)
    Contains at least one special character (!@#$%^&*).
 */
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{10,}$/
