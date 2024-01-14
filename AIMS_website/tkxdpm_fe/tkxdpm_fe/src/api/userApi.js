import axios from "../setup/CustomAxios";

const register = async ({
  fullname,
  email,
  gender,
  phonenumber,
  username,
  password,
}) => {
  try {
    // make axios post request
    const res = await axios.post(`users/customer`, {
      fullname,
      email,
      gender,
      phonenumber,
      username,
      password,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (formValue) => {
  if (formValue.username === "" || formValue.password === "") {
    return;
  }

  try {
    // make axios post request
    const res = await axios.post(`users/login`, formValue);
    return res;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const userInfo = async () => {
  try {
    // make axios post request
    const res = await axios.get("whoAmI");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default register;
