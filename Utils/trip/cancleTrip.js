import getInstance from "../BaseAPI";

const CancleTrip = async (url) => {
  const instance = await getInstance();

  var data;

  try {
    const ret = await instance.patch(url, { status: "canceled" });
    data = ret.data;
  } catch (e) {
    if (e.response) {
      data = e.response.data;
    }
  }

  console.log(data);
  return data;
};

export default CancleTrip;
