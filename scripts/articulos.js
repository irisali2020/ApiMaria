import fs from 'fs';

// 1. Leemos el archivo JSON y lo convertimos a un array
const archivoRaw = fs.readFileSync('./productos.json', 'utf-8');
const productos = JSON.parse(archivoRaw);

// 2. Recorremos el array y eliminamos el par clave-valor "id"
productos.forEach(producto => delete producto.id);

// 3. Guardamos el resultado en un nuevo archivo JSON
fs.writeFileSync('./productos_sin_id.json', JSON.stringify(productos, null, 2));

// 4. Verificamos la cantidad de objetos
console.log(`¡Listo! Se guardó el nuevo archivo 'productos_sin_id.json'.`);
console.log(`Total de productos procesados: ${productos.length}`); // <- Esto imprimirá el número
