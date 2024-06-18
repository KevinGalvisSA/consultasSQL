import { connection } from "../../db/conection.js";

// Recuperar todas las líneas de productos con sus descripciones:
export const getAllProductsDescriptions = async() =>{
    let [result] = await connection.query(`SELECT productLine, productDescription FROM products`);
    return result;
}

// Listar todos los productos junto con las descripciones de sus líneas de productos:

export const getAllProductsAndDescriptions = async() => {
    let [result] = await connection.query(
        `SELECT pd.productCode, pd.productName, pd.productLine, pl.textDescription FROM products AS pd 
        INNER JOIN productlines AS pl USING (productLine);
    `);
    return result;
}

// Calcular el total de productos en stock:

export const getAllProductsInStock = async() => {
    let [result] = await connection.query(
        `SELECT SUM(quantityInStock) AS total_products FROM products;
    `);
    return result;
}

// Encontrar el precio medio de compra de todos los productos:

export const getAveragePriceOfAllProducts = async() => {
    let [result] = await connection.query(
        `SELECT AVG(buyPrice) AS average_price FROM products;
    `);
    return result;
}

// Encontrar el precio total de todos los productos:

export const getTotalPriceOfAllProducts = async() => {
    let [result] = await connection.query(
        `SELECT SUM(buyPrice) AS total_product_price FROM products;
    `);
    return result;
}

// Calcular el promedio del precio sugerido (MSRP) de los productos:

export const getAverageMSRPOfAllProducts = async() => {
    let [result] = await connection.query(
        `SELECT AVG(MSRP) AS suggested_average_price FROM products;
    `);
    return result;
}

// Obtener el promedio de la cantidad de productos en stock por línea de productos:

export const getAverageProductsInStockByProductLine = async() => {
    let [result] = await connection.query(`
    SELECT p.productLine, AVG(p.quantityInStock) AS average_products_in_stock FROM products AS p 
    GROUP BY p.productLine;
    `);
    return result;
}

// Obtener la cantidad total de productos vendidos por cada línea de productos:

export const getAllProductsSoldByProductLine = async() => {
    let [result] = await connection.query(`
    SELECT p.productLine, SUM(od.quantityOrdered) AS total_products_sold FROM products AS p 
    JOIN orderdetails AS od USING (productCode)
    GROUP BY p.productLine;
    `);
    return result;
}

// Obtener el promedio del precio de compra de los productos por línea de productos:

export const getAverageBuyPriceByProductLine = async() => {
    let [result] = await connection.query(`
    SELECT p.productLine, AVG(p.buyPrice) AS average_buy_price FROM products AS p 
    GROUP BY p.productLine;
    `);
    return result;
}

// Encontrar la cantidad total de productos vendidos por cada vendedor:

export const getAllProductsSoldBySalesRep = async() => {
    let [result] = await connection.query(`
    SELECT e.firstName, e.lastName, SUM(od.quantityOrdered) AS total_products_sold FROM employees AS e 
    JOIN customers AS c USING (salesRepEmployeeNumber)
    JOIN orders AS o USING (customerNumber)
    JOIN orderdetails AS od USING (orderNumber)
    GROUP BY e.employeeNumber;
    `);
    return result;
}