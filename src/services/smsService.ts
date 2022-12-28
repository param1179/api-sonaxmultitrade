import { Twilio } from "twilio";
import { config } from "../config";

const client = new Twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

export const sendOtp = async (toMobile: string, msg: string) => {
  client.messages
    .create({
      body: msg,
      messagingServiceSid: "MG6bf08449937b06568fb14bae589edf0f",
      shortenUrls: true,
      to: toMobile,
    })
    .then((message) => message.sid)
    .catch((err) => console.log(err));
};
