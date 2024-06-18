import { connection } from "../../db/conection.js";

// Contar la cantidad de oficinas en cada país:

export const getCountOfAllOfficesByCountry = async() => {
    let [result] = await connection.query(
        `SELECT COUNT(officeCode) AS number_offices, country FROM offices GROUP BY country;
    `);
    return result;
}

// Encontrar el total de ventas realizadas por cada oficina:

export const getAllSalesByEachOffice = async() => {
    let [result] = await connection.query(`
        SELECT SUM(quantityOrdered * priceEach) AS total_sales, officeCode FROM orderdetails
        INNER JOIN orders USING (orderNumber)
        INNER JOIN customers USING (customerNumber)
        INNER JOIN employees ON employeeNumber = salesRepEmployeeNumber 
        INNER JOIN offices USING (officeCode)
        GROUP BY officeCode;
    `);
    return result;
}