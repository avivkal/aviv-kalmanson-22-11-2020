function userExists(user) {
    return user !== undefined && user !== null && user !== '';
}

module.exports = {
    userExists: userExists
}