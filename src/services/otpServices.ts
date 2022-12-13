import { Twilio } from "twilio";
import { config } from "../config";

const client = new Twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

export const sendOtp = async (toMobile: string, msg: string) => {
    client.messages 
    .create({ 
       body: msg,  
       messagingServiceSid: 'MGd40118b386ad537cfcb6249f0f52806b',      
       to: toMobile 
     }) 
    .then(message => message.sid)
    .catch(err => console.log(err)) 
};
