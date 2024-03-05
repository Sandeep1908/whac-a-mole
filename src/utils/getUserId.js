export const getUserId=()=>{

    if(localStorage.getItem('userId')){
        const userId=localStorage.getItem('userId')
        return userId
    }

    const Id= Math.random().toString(36).substring(2,9)
    localStorage.setItem('userId',Id)
    return Id
}