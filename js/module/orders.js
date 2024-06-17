import { connection } from "../../db/conection.js";

// Listar todas las órdenes que tienen un estado de 'Enviado':

export const getAllOrdersWithStatusShipped = async() => {
    let [result] = await connection.query(
    `SELECT orderDate, requiredDate, shippedDate, status FROM orders WHERE status = 'Shipped';`
    );
    return result;
}

// Calcular el total de órdenes realizadas por cada cliente:

export const getAllOrdersByEachCustomer = async() => {
    let [result] = await connection.query(`
    SELECT ctm.customerNumber, ctm.customerName, COUNT(o.orderNumber) AS total FROM customers AS ctm 
    JOIN orders AS o ON ctm.customerNumber = o.customerNumber 
    GROUP BY ctm.customerNumber;
    `);
    return result;
}