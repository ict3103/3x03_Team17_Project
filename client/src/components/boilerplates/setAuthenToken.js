import axios from 'axios';
 

//setAuthToken() = helper method
// In order to use JWT on each private request, we need to add them to the request header Axios has a header common set option
export const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}
