const fs = require('fs');
const statFile = './server/db/stat.json';

const getStatLine = ((req, res, cart, action) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);

    return [{
        'action': action,
        'product_name': find.product_name,
        'date': new Date(),
    }];
});

const stat = ((req, res, cart, action) => {

    const statLine = getStatLine(req, res, cart, action);

    fs.readFile(statFile, 'utf-8', (err, data) => {
        if (err) {
            fs.writeFile(statFile, JSON.stringify(statLine), (err) => {
                // вызовем компонент ошибки!!!
            });

        } else {
            const statData = JSON.parse(data);
            statData.push(statLine);
            fs.writeFile(statFile, JSON.stringify(statData), (err) => {
                // вызовем компонент ошибки!!!
            });
        }
    });
});

module.exports = stat;