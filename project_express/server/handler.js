const fs = require('fs');
const cart = require('./cart');
const stat = require('./stat');

const actions = {
  add: cart.add,
  change: cart.change,
  delete: cart.del,
};

const handler = (req, res, action, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      const cart = JSON.parse(data);
      const newCart = actions[action](cart, req);
      fs.writeFile(file, newCart, (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
      stat(req, res, cart, action); // запишем статистику
    }
  });
};

module.exports = handler;
