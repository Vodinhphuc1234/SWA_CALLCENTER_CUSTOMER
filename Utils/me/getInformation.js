import getInstance from "../BaseAPI";

const getInformation = async () => {
  const instance = await getInstance();

  var data;
  try {
    const result = await instance.get("/rider/me/");
    data = result.data;
  } catch (err) {
    if (err.response) {
      data = err.response;
    }
  }

  return data;
};

export default getInformation;
