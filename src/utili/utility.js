export function dataCheck(inputValue) {
    if (inputValue === null || undefined === inputValue) {
        return false;
    } else if (inputValue.toString().trim() == '') {
        return false;
    } else {
        return true;
    }
}