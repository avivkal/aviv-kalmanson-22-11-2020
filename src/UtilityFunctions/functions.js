const userExists = (user) => {
    return user !== undefined && user !== null && user !== '';
}
const isPartOfString = (main, partOfMain, isReceiver) => {
    const mainStr = isReceiver ? main.receiver : main.sender;
    if (mainStr.indexOf(partOfMain) >= 0)
        return true
    return false
}

const messagesExist = (messages) => {
    return messages !== undefined && messages !== null && messages.length > 0;
}

const setCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user))
}
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'))
}

export {
    userExists,
    isPartOfString,
    setCurrentUser,
    getCurrentUser,
    messagesExist
}