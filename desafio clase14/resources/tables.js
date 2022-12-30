import {promises as fs} from 'fs';
import config from '../options/config.js';
import knex from 'knex';

console.log('Running tables.js');

const arrProducts = JSON.parse(await fs.readFile('./resources/products.json'));
const arrMessages = JSON.parse(await fs.readFile('./resources/messages.json'));

//Usamos MariaDB para los productos
try {
    const knexMariaDB = knex(config.mariaDB);
    await knexMariaDB.schema.dropTableIfExists('products');
    await knexMariaDB.schema.createTable('products', table => {
        table.increments('id'),
        table.string('title'),
        table.integer('price'),
        table.string('thumbnail'),
        table.integer('stock')
    })
    await knexMariaDB('products').insert(arrProducts)
        .then(() => console.log('Productos agregados.'))
        .catch(err => {console.log(err); throw err})
        .finally(() => {
            knexMariaDB.destroy();
        });
} catch(error) {
    console.log(error);
    throw error;
}
//Usamos SQLite3 para los mensajes
try {
    const knexSQLite = knex(config.sqlite3);
    await knexSQLite.schema.dropTableIfExists('messages');
    await knexSQLite.schema.createTable('messages', table => {
        table.string('date'),
        table.string('name'),
        table.string('email').notNullable(),
        table.string('message').notNullable()
    });
    await knexSQLite('messages').insert(arrMessages)
        .then(() => {console.log('Mensajes agregados.')})
        .catch(err => {console.log(err); throw err})
        .finally(() => {
            knexSQLite.destroy();
        });
} catch (error) {
    console.log(error);
    throw error;
}