
import axios from "axios";

// get Token
const getToken = () => {
    const user = localStorage.getItem("userInfo");
    const parseUser = JSON.parse(user);
    return parseUser?.jwtToken;
}
const token = getToken();

// insert data
const insertFormData = async (url , data) => {

    const res = await axios({
        method: "post",
        url: url,
        data: data,
        headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${token}`,
        },
    });
    return res;

}


// delete data by id
const deleteById = async (url) => {
   const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   return res;
}

export {deleteById, insertFormData}