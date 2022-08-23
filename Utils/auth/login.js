import getInstance from "../BaseAuthApi";

const login = async (username, password) => {
  console.log(username, password);
  const instance = await getInstance();

  var data;
  try {
    const result = await instance.post("/rider/login/", {
      username,
      password,
    });
    data = result.data;
  } catch (err) {
    data = err.response;
  }

  return data;
};

export default login;
