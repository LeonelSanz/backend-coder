class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
        void this.mascotas;
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({
            nombre: nombre,
            autor: autor
        });
        void this.libros;
    }

    getBookNames(){
        let nombreLibros = [];
        this.libros.forEach(libro => nombreLibros.push(libro.nombre));
        return nombreLibros;
    }
}

let usuario1 = new Usuario("Leonel", "Sanz");

console.log(usuario1.getFullName());
usuario1.addMascota("Lara");
usuario1.addMascota("Brisa");
console.log(`Cantidad de mascotas: ${usuario1.countMascotas()}`);
usuario1.addBook("Harry Potter", "J.K. Rowling");
usuario1.addBook("El Señor de los Anillos", "J. R. R. Tolkien");
console.log(`Nombres de Libros agregados : ${usuario1.getBookNames()}`);
console.log(usuario1);