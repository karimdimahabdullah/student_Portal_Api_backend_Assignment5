// FORMAT OF REGISTRATION NUMBER
// e.g techcrush/7/2026/00147
export const registrationNumberRegex = /^techcrush\/\d{1,2}\/\d{4}\/\d{5}$/;
export const  registrationNumberFormatHint = 'techcrush/cohortNumber/year/number (e.g. techcrush/7/2026/00147)';


// Normalize the registration number by converting it to lowercase and trimming whitespace
 export function normalizeRegistrationNumber(registrationNumber) {
    return typeof registrationNumber === 'string' ? registrationNumber.trim().toLowerCase() : registrationNumber;
}

// Validate the registration number format
export function isValidRegistrationFormat(registrationNumber) {
    return typeof registrationNumber === 'string' && registrationNumberRegex.test(registrationNumber);  
}


