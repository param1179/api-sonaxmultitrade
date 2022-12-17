var https = require("follow-redirects").https;
var fs = require("fs");

var options = {
  method: "POST",
  hostname: "lzenzj.api.infobip.com",
  path: "/sms/2/text/advanced",
  headers: {
    Authorization:
      "App 7d4fc5bb86423cffac5fd9e97aac6c82-94a4806a-c634-4def-b4f0-50b96f882c8b",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  maxRedirects: 20,
};
export const sendSms = () => {
  var req = https.request(options, function (res: any) {
    var chunks: any = [];

    res.on("data", function (chunk: any) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk: any) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error: any) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({
    messages: [
      {
        destinations: [
          {
            to: "9988171179",
          },
        ],
        from: "sonax",
        text: "This is a sample message",
      },
    ],
  });

  req.write(postData);

  req.end();
};
