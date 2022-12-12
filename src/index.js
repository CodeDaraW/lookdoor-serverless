const crypto = require("crypto");
const axios = require("axios");

const PHONE = process.env.PHONE;
const PASSWORD_MD5 = process.env.PASSWORD_MD5;
const DEVICE_ID = process.env.DEVICE_ID;
const EQUIPMENT_ID = process.env.EQUIPMENT_ID;

const encrypt = (key, msg) => {
  const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
  cipher.setAutoPadding(true);
  const m = cipher.update(msg, "utf8", "base64");
  const f = cipher.final("base64");
  const crypted = m + f;
  return crypted;
};

const openDoor = async (equipment_id = EQUIPMENT_ID) => {
  try {
    const keyRes = await axios.post(
      "https://api.lookdoor.cn:443/func/hjapp/user/v2/getPasswordAesKey.json?"
    );
    const cookie = keyRes.headers["set-cookie"];
    const aesKey = keyRes.data.data.aesKey;

    console.log("keyRes.data", keyRes.data);
    console.log("cookie", cookie);
    console.log("aesKey", aesKey);

    const encyptedPassword = encrypt(aesKey, PASSWORD_MD5);

    const loginRes = await axios.post(
      `https://api.lookdoor.cn:443/func/hjapp/user/v2/login.json?password=${encyptedPassword}&deviceId=${DEVICE_ID}&loginNumber=${PHONE}&equipmentFlag=1`,
      null,
      {
        headers: {
          cookie,
        },
      }
    );
    console.log("loginRes.data", loginRes.data);

    const openRes = await axios.post(
      `https://api.lookdoor.cn:443/func/hjapp/house/v1/pushOpenDoorBySn.json?equipmentId=${equipment_id}`,
      null,
      {
        headers: {
          cookie,
        },
      }
    );
    console.log("openRes.data", openRes.data);
    return openRes.data;
  } catch (err) {
    console.log(err);
  }
};

module.exports.openDoor = openDoor;
