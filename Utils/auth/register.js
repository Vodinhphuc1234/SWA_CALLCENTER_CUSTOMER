import getInstance from "../BaseAuthApi";

const register = async ({
  email,
  phone_number,
  first_name,
  last_name,
  password,
}) => {
  console.log(email, phone_number, first_name, last_name, password);
  const instance = await getInstance();

  var data;
  try {
    const result = await instance.post("/rider/register/", {
      email,
      phone_number,
      first_name,
      last_name,
      password,
    });
    data = result.data;
    data.password = password;
  } catch (err) {
    if (err.response) {
      data = err.response;
    }
  }

  return data;
};

export default register;
