import { connection } from "../../db/conection.js";

// Calcular la cantidad media de productos pedidos en las órdenes:

export const getAverageProductsOrdered = async() => {
    let [result] = await connection.query(
        `SELECT AVG(quantityOrdered) AS average_products_ordered FROM orderdetails;
    `);
    return result;
}

// Encontrar la cantidad total de productos pedidos por cada cliente:

export const getAllProductsOrderedByEachCustomer = async() => {
    let [result] = await connection.query(`
    SELECT c.customerNumber, c.customerName, SUM(od.quantityOrdered) AS ordered_products FROM customers AS c 
    JOIN orders AS o USING (customerNumber)
    JOIN orderdetails AS od USING (orderNumber)
    GROUP BY c.customerNumber;
    `);
    return result;
}

// Calcular el total de ventas realizadas en cada país:

export const getAllSalesByEachCountry = async() => {
    let [result] = await connection.query(`
    SELECT c.country, SUM(od.quantityOrdered * od.priceEach) AS total_sales FROM customers AS c 
    INNER JOIN orders AS o USING (customerNumber)
    INNER orderdetails AS od USING (orderNumber)
    GROUP BY c.country;
    `);
    return result;
}

// Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:

export const getAveragePriceEachByProductLine = async() => {
    let [result] = await connection.query(`
    SELECT productLine, AVG(priceEach) AS average_price_each FROM orderdetails
    INNER JOIN products USING (productCode)
    GROUP BY productLine;
    `);
    return result;
}