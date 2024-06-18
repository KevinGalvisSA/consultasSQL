import { connection } from "../../db/conection.js";

// Calcular el total de pagos recibidos:

export const getAllPaymentsReceived = async() => {
    let [result] = await connection.query(
        `SELECT SUM(amount) AS total_payments FROM payments;
    `);
    return result;
}

// Calcular el total de pagos recibidos por cada cliente:

export const getAllPaymentsReceivedByEachCustomer = async() => {
    let [result] = await connection.query(`
    SELECT ctm.customerNumber, ctm.customerName, SUM(pay.amount) AS  total FROM customers AS ctm 
    JOIN payments AS pay ON ctm.customerNumber = pay.customerNumber
    GROUP BY ctm.customerNumber;
    `);
    return result;
}

// Calcular el total de pagos recibidos por cada país:

export const getAllPaymentsReceivedByEachCountry = async() => {
    let [result] = await connection.query(`
    SELECT ctm.country, COUNT(pay.amount) AS total FROM customers AS ctm 
    JOIN payments AS pay ON ctm.customerNumber = pay.customerNumber
    GROUP BY ctm.country;
    `);
    return result;
}

// Obtener el total de pagos realizados en cada año:

export const getAllPaymentsReceivedByEachYear = async() => {
    let [result] = await connection.query(`
    SELECT YEAR(paymentDate) AS year, SUM(amount) AS total FROM payments
    GROUP BY YEAR(paymentDate);
    `);
    return result;
}