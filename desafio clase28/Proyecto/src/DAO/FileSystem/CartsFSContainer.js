import fs from 'fs/promises';

export default class CartsContainerFS{
    constructor(route){
        this.route = route
    };
    newId(arr, cart = false){
        if (cart) {
            arr.sort((a, b) => {return a - b});
            cart.id = parseInt(arr[arr.length - 1].id) + 1;
            console.log(`Cart's new ID: ${cart.id}`);
            return cart.id;
        }
        return parseInt(arr[arr.length - 1].id + 1);
    };

    async updateCart(cart){
        let carts = await this.getAll();
        let index = carts.map(element => element.id).indexOf(cart.id);
        carts.splice(index, 1);
        console.log(cart);
        cart.push(cart);
        await this.saveCarts(carts);
        return true;
    };

    async saveCarts(carts){
        try {
            await fs.writeFile(this.route, JSON.stringify(carts, null, 2));
        } catch (error) {
            console.log(error);
        }
    };
    
    async getAll(){
        try {
            let products = await fs.readFile(this.route, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.error('Error de lectura.');
            console.error(error);
        }
    };

    async getById(id){
        let carts = await this.getAll();
        let cart = carts.find(element => element.id == id);
        return cart ? cart : null;
    };

    async saveCart(){
        try {
            let carts = await this.getAll();
            let id;
            if (carts.length > 0) {
                id = this.newId(carts);
            } else {
                id = 1;
            }
            let products = [];
            let timestamp = Date.now()

            let cart = {id, products, timestamp};

            carts.push(cart);
            await fs.writeFile(this.route, JSON.stringify(carts, null, 2));
            return cart;
        } catch (error) {
            console.log('Failed to create.');
            console.error(error);
        }
    };

    async deleteById(id){
        let carts = await this.getAll();
        if (!carts.length) {
            console.log("No cart");
        } else {
            try {
                const delCart = carts.find(cart => cart.id == id);
                if (delCart === undefined) {
                    console.log("Non-existent ID");
                } else {
                    let newArr = carts.filter(element => element != delCart);
                    await fs.writeFile(this.route, JSON.stringify(newArr, null, 2));
                    console.log(`Deleted cart: ${JSON.stringify(delCart)}`);
                    return delCart;
                }
            } catch (error) {
                console.error('Error de lectura.');
                console.error(error);
            }
        }
    };

    async deleteCartProduct(cart, product){
        let prodIndex = cart.products.map(elem => elem.id).indexOf(product.id);
        cart.products.splice(prodIndex, 1);
        let updatedCart = await this.updateCart(cart.id, cart);
        return updatedCart;
    };
};