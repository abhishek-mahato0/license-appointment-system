export const Updatelocalstorage= ( {info}:any) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if(userInfo){
       localStorage.setItem("userInfo", JSON.stringify(userInfo.map((item:any)=>({
            ...item, info 
        }))));
    }
}