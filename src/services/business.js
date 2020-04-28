import axios from "axios";
import queryString from "query-string";

const baseUrl = "http://localhost:3001";

const getIceCreamBusinessesFromAlpharetta = async () => {
  const { data: businesses } = await axios.get(
    `${baseUrl}/businesses/top?${queryString.stringify({
      location: "Alpharetta, GA",
      businessType: "Ice Cream",
    })}`
  );

  return businesses;
};

export { getIceCreamBusinessesFromAlpharetta };
