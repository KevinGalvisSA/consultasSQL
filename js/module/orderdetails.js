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