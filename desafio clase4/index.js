const fs = require('fs');

class Contenedor {
    constructor(filename) {
        this.filename = filename ?? 'data.json';
        fs.writeFileSync(this.filename, '[]');
    }

    async save(object) {
        const objects = await this.getAll();
        const id = (objects[objects.length - 1]?.id ?? 0) + 1;

        const objectToSave = { id, ...object };
        const objectsToSave = JSON.stringify([...objects, objectToSave]);

        try {
            await fs.promises.writeFile(this.filename, objectsToSave);
            return id;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        const objects = await this.getAll();
        return objects.find(object => object.id === id);
    }

    async getAll() {
        try {
            const objects = await fs.promises.readFile(this.filename);
            return JSON.parse(objects);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        const objects = await this.getAll();
        const newObjectsArray = objects.filter(object => object.id !== id);

        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(newObjectsArray));
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.filename, '[]');
        } catch (error) {
            throw new Error(error);
        }
    }
}

(async () => {
    let contenedor = new Contenedor('productos.txt')

    let product1 = await contenedor.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    });
    console.log(`Se agrego el producto con id: ${product1}`)

    let product2 = await contenedor.save({                                                                                                                                                    
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    });
    console.log(`Se agrego el producto con id: ${product2}`)

    let product3 = await contenedor.save({                                                                                                                                                    
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    });
    console.log(`Se agrego el producto con id: ${product3}`)

    console.log(await contenedor.getAll())
    console.log(await contenedor.getById(2))

    await contenedor.deleteById(2)
    console.log(await contenedor.getAll())

    await contenedor.deleteAll()
    console.log(await contenedor.getAll())
})();