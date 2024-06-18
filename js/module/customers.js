import { connection } from "../../db/conection.js";

// Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:

export const getAllPaymentsFromCustomer103 = async() => {
    let [result] = await connection.query(
    `SELECT customerNumber, checkNumber, paymentDate, amount FROM payments
    INNER JOIN customers USING (customerNumber)
    WHERE customerNumber = 103;
    `);
    return result;
}

// Utilizando cualquier numero

export const getAllPaymentsFromCustomerN = async(customerNumber) => {
    let [result] = await connection.query(
    `SELECT customerNumber, checkNumber, paymentDate, amount FROM payments
    INNER JOIN customers USING (customerNumber)
    WHERE customerNumber = ${customerNumber};
    `);
    return result;
}

// Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:

export const getAllCustomersWithCreditLimitGreaterThan50000 = async() => {
    let [result] = await connection.query(
    `SELECT customerNumber, customerName, country, creditLimit FROM customers WHERE creditLimit > 50000 AND country = 'USA';
    `);
    return result;
}

// Encontrar todas las órdenes realizadas por clientes de 'Francia':

export const getAllOrdersFromFrance = async() => {
    let [result] = await connection.query(
    `SELECT orderDate, requiredDate, shippedDate, status, country FROM orders INNER JOIN customers USING (customerNumber) WHERE country = 'France';
    `);
    return result;
}

// Listar el monto total de los pagos recibidos de cada cliente:

export const getAllPaymentsByEachCustomer = async() => {
    let [result] = await connection.query(`
    SELECT ctm.customerNumber, ctm.customerName, SUM(pay.amount) AS total FROM customers AS ctm 
    JOIN payments AS pay ON ctm.customerNumber = pay.customerNumber
    GROUP BY ctm.customerNumber;
    `);
    return result;
}

// Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente 103:

export const getAllOrdersDetailsFromCustomer103 = async() => {
    let [result] = await connection.query(`
    SELECT ctm.customerNumber, o.orderNumber, p.productCode, p.productName, od.quantityOrdered, od.priceEach
    FROM customers AS ctm
    JOIN orders AS o USING (customerNumber)
    JOIN orderdetails AS od USING (orderNumber)
    JOIN products AS p USING (productCode)
    WHERE ctm.customerNumber = 103;
    `);
    return result;
}

// Obtener el promedio del límite de crédito de todos los clientes:

export const getAverageCreditLimitOfAllCustomers = async() => {
    let [result] = await connection.query(`
    SELECT AVG(creditLimit) AS average_credit FROM customers;
    `);
    return result;
}

// Obtener el promedio del límite de crédito de los clientes por país:

export const getAverageCreditLimitOfAllCustomersByCountry = async() => {
    let [result] = await connection.query(`
    SELECT country, AVG(creditLimit) AS average_credit FROM customers GROUP BY country;
    `);
    return result;
}

// Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:

export const getAllSalesByEachCustomer = async() => {
    let [result] = await connection.query(`
    SELECT c.customerNumber, c.customerName, SUM(od.quantityOrdered * od.priceEach) AS total_sales FROM customers AS c 
    JOIN orders AS o USING (customerNumber)
    JOIN orderdetails AS od USING (orderNumber)
    GROUP BY c.customerNumber;
    `);
    return result;
}
