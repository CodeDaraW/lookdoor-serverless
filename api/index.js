const { openDoor } = require('../src/index');

export default function handler(request, response) {
  openDoor()
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((err) => {
      response.status(500).json({ msg: String(err) });
    });
}
