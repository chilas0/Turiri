function isEmpty(value){
    if(value == "" || value == null || value == undefined){
        return true;
    }
    return false;
}

function isEmptyUpdate(value){
    if(value == ""){
        return true;
    }
    return false;
}

module.exports = {
    isEmpty,
    isEmptyUpdate,
}