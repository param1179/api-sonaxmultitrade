import { config } from "../config";
import axios from "axios";
import qs from "qs";

const apiKey = config.TWO_FACTOR_API_KEY;

export const sendOtp = async (toMobile: string, msg: string) => {
  var data = qs.stringify({
    module: "TRANS_SMS",
    apiKey,
    to: toMobile,
    from: "Sonaxm",
    msg: msg,
  });
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://2factor.in/API/R1/",
    headers: {},
    data: data,
  };

  axios(config)
    .then(function (response: any) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error: any) {
      console.log(error);
    });
};
