import fs from 'fs/promises';

export default class ProductsContainerFS{
    constructor(route){
        this.route = route
    };

    checkId(product, arr){
        arr.forEach(element => {
            if(element.id == product.id){
                console.warn('El id del elemento ya existe, se le asignara uno nuevo.');
                return this.newId(product, arr);
            } 
        });
        return product.id;
    };

    newId(product, arr){
        arr.sort((a, b) => {return a - b});
        product.id = parseInt(arr[arr.length - 1].id) + 1;
        console.log(`Nuevo id del producto : ${product.id}`);
        return product.id;
    };

    async getAll(){
        try {
            let products = await fs.readFile(this.route, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.error('Error de lectura.');
            console.error(error);
            return [];
        }
    };

    async getById(id){
        const products = await this.getAll();
        let product = products.find(element => element.id == id);
        return product ? product : null;
    };

    async saveProduct(obj){
        const products = await this.getAll();
        obj.id = parseInt(obj.id);
        obj.id = this.checkId(obj, products);
        obj.price = parseInt(obj.price);
        try {
            console.log(`New element : \n${JSON.stringify(obj)}`);
            products.push(obj);
            await fs.writeFile(this.route, JSON.stringify(products, null, 2));
            console.log('Guardado exitoso');
            return obj
        } catch (error) {
            console.error('Error de escritura');
            console.error(error);
        }
    };

    async updateProduct(obj){
        const products = await this.getAll();
        let index = products.map(element => element.id).indexOf(obj.id);
        if (index >= 0) {
            try {
                products.splice(index, 1, obj);
                await fs.writeFile(this.route, JSON.stringify(products, null, 2));
            } catch (error) {
                console.error('Failed to update.');
                console.error(error);
            }            
        } else {
            console.log('NO index.');
        }
    };

    async deleteById(id) {
        const products = await this.getAll();
        if (!products.length) {
            console.error('No products.');
        } else {
            try {
                const delProd = products.find(prod => prod.id == id);
                if (delProd === undefined) {
                    console.error('Unexistent ID');
                } else {
                    let newArr = products.filter(element => element != delProd);
                    await fs.writeFile(this.route, JSON.stringify(newArr, null, 2));
                    console.log(`Deleted product: ${JSON.stringify(delProd)}`);
                    return delProd;
                }
            } catch (error) {
                console.error('Failed to delete.');
                console.error(error);
            }
        }
    };
};