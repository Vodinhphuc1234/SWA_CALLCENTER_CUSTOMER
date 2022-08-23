import getInstance from "../BaseAPI";

const logout = async () => {
  const instance = await getInstance();
  var data;
  try {
    const result = await instance.delete("/rider/login/", {});
    data = result.data;
  } catch (err) {
    data = null;
  }

  return data;
};

export default logout;
