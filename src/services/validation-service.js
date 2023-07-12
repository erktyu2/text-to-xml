const ERROR_NON_STRING_TYPE = 'ERROR: NON_STRING_TYPE';
const ERROR_EMPTY = 'ERROR: EMPTY';
const ERROR_HAS_INVALID_ROW = 'ERROR: HAS_INVALID_ROW';
const ERROR_FIRST_TAG_IS_NOT_P = 'ERROR: FIRST_TAG_IS_NOT_P';

module.exports = ValidationService  = {
     ValidatePipedTextRows : (text) => {
         if (typeof text !== "string"){
             return ERROR_NON_STRING_TYPE;
         }
         const trimmedText = text.trim();
         if (trimmedText.length === 0){
             return ERROR_EMPTY;
         }

         if (trimmedText[0] !== 'P'){
             return ERROR_FIRST_TAG_IS_NOT_P;
         }

         const hasInvalidRow = trimmedText.split('\n').find(r => !_isRowValid(r));
         if (hasInvalidRow){
             return ERROR_HAS_INVALID_ROW + ' at ' + hasInvalidRow;
         }

         return null;
    }
}

const _isRowValid = (row) => {
    const splitRow = row.split('|');
    if (splitRow.length === 0 || !['P', 'T', 'A', 'F'].find(char => char === splitRow[0])){
        return false;
    }

    switch (splitRow[0]) {
        case 'P':
            if (splitRow.length !== 3 || !_hasOnlySwedishLetters(splitRow[1]) || !_hasOnlySwedishLetters(splitRow[2])){
                return false;
            }
            break;
        case 'T':
            if (splitRow.length === 1 || splitRow.slice(1).find(t => !_isTelephoneNumberValid(t))){
                return false;
            }
            break;
        case 'A':
            if (splitRow.length > 4 || splitRow.length === 1 ||
                !splitRow[1] || !splitRow[1].trim() ||
                (splitRow.length >= 3 && (!splitRow[2] || !splitRow[2].trim())) ||
                (splitRow.length === 4 && !_hasOnlyDigit(splitRow[3]))
            ){
                return false;
            }
            break;
        case 'F':
            if (splitRow.length > 3 || splitRow.length === 1 ||
                !splitRow[1] || !splitRow[1].trim() || !_hasOnlySwedishLetters(splitRow[1]) ||
                (splitRow.length === 3 && !_hasOnlyDigit(splitRow[2]))
            ){
                return false;
            }
            break;
        default:
            return false;
    }
    return true;
}


const _hasOnlySwedishLetters = (text) => {
    if (!text) {
        return false;
    }
    return !!text.match(/^[a-zA-ZäöåÄÖÅ]+$/);
}

const _isTelephoneNumberValid = (text) => {
    if (!text || text.split('-').length > 2) {
        return false;
    }
    return !isNaN(Number(text.split('-').join('')));
}

const _hasOnlyDigit = (text) => {
    if (!text) {
        return false;
    }
    return !!text.match(/^[0-9]*$/);
}

