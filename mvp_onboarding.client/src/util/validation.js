export const idValidation = (id) => {
    if (Number.isInteger(id) && id > 0) {
        return true;
    }
    else {
        return false;
    }
};