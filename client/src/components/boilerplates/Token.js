import axios from 'axios';
 

//setAuthenToken() = helper method
// In order to use JWT on each private request, we need to add them to the request header Axios has a header common set option
const setAuthenToken = token => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}

const IsValidJWT= () =>{
    let flag = false
    localStorage.getItem("token")?flag=true:flag=false
    console.log(flag)
    return flag
}

export {setAuthenToken,IsValidJWT}
