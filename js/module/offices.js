import { connection } from "../../db/conection.js";

// Contar la cantidad de oficinas en cada país:

export const getCountOfAllOfficesByCountry = async() => {
    let [result] = await connection.query(
        `SELECT COUNT(officeCode) AS number_offices, country FROM offices GROUP BY country;
    `);
    return result;
}