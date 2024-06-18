import { connection } from "../../db/conection.js";

// Encontrar todos los empleados que trabajan en la oficina de 'San Francisco':

export const getAllEmployeesFromSanFrancisco = async() => {
    let [result] = await connection.query(
    `SELECT employeeNumber, firstName, lastName,officeCode, city FROM employees
    INNER JOIN offices USING (officeCode)
    WHERE officeCode = 1;
    `);
    return result;
}

// Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:

export const getAllEmployeesEmailAndAddressThatReportEmployee1143 = async() => {
    let [result] = await connection.query(
    `SELECT firstName, lastName, email, reportsTo FROM employees WHERE reportsTo = 1143;
    `);
    return result;
}

// Con un empleador cualquiera

export const getAllEmployeesEmailAndAddressThatReportEmployeeN = async(employeeNumber) => {
    let [result] = await connection.query(
    `SELECT firstName, lastName, email, reportsTo FROM employees WHERE reportsTo = ${employeeNumber};
    `);
    return result;
}

// Obtener la cantidad total de empleados:

export const getAllEmployeesCount = async() => {
    let [result] = await connection.query(
    `SELECT COUNT(employeeNumber) AS total_employees FROM employees;
    `);
    return result;
}

// Contar la cantidad de empleados por título de trabajo:

export const getAllEmployeesCountByJobtitle = async() => {
    let [result] = await connection.query(
    `SELECT COUNT(employeeNumber) AS number_employees, jobTitle FROM employees GROUP BY jobTitle;
    `);
    return result;
}

// Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado

export const getAllSalesByEachEmployee = async() => {
    let [result] = await connection.query(`
    SELECT e.employeeNumber, e.firstName, e.lastName, SUM(od.quantityOrdered * od.priceEach) AS total_sales FROM employees AS e 
    JOIN orders AS o USING (employeeNumber)
    JOIN orderdetails AS od USING (orderNumber)
    GROUP BY e.employeeNumber;
    `);
    return result;
}

// Calcular el total de pagos recibidos por cada vendedor:

export const getAllPaymentsReceivedByEachEmployee = async() => {
    let [result] = await connection.query(`
    SELECT e.employeeNumber, e.firstName, e.lastName, SUM(pay.amount) AS  total FROM employees AS e 
    JOIN payments AS pay ON e.employeeNumber = pay.employeeNumber
    GROUP BY e.employeeNumber;
    `);
    return result;
}