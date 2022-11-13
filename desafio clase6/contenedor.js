const fs = require('fs');

class Contenedor {
    constructor(filename) {
        this.filename = filename ?? 'productos.txt';
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

module.exports = Contenedor;