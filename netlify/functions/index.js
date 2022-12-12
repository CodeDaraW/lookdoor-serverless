const { builder } = require("@netlify/functions");
const { openDoor } = require('../../src/index');

const handler = async (event, context) => {
  try {
    const res = await openDoor();
    console.log('openDoor', res);
    return {
      statusCode: 200,
      body: JSON.stringify({ openDoorRes: res }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ err: String(error) }),
    };
  }
};

exports.handler = builder(handler);
