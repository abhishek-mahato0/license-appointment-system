export const Updatelocalstorage= ( info:any) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if(userInfo){
        const newUserInfo = {...userInfo, ...info};
        console.log(newUserInfo);
       localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    }
}