 

const getUserId=()=>{
    return Math.random().toString(36).substring(1,10)
}


export {
    getUserId
}