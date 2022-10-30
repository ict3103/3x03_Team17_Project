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
    return localStorage.getItem("token")
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export {setAuthenToken,IsValidJWT,getCookie}
