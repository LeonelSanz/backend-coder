import CartsContainerFS from './FileSystem/cart.js';
import ProductsContainerFS from './FileSystem/products.js';

import ContenedorCartsMongo from './MongoDB/ContenedorCartsMongo.js';
import ContenedorProductsMongo from './MongoDB/ContenedorProductsMongo.js';

export default function setPersistance(pers) {
    switch (pers) {
        case 'mongo' :
            console.log('Conectado a MongoDB');
            return {
                products: new ContenedorProductsMongo,
                carts: new ContenedorCartsMongo
            };
        case 'filesystem' : 
            console.log('Conectado a FileSystem');
            return {
                products: new ProductsContainerFS('./DAO/FileSystem/products.json'),
                carts: new CartsContainerFS('./DAO/FileSystem/cart.json')
            };
        default: 
            return false
    };
}