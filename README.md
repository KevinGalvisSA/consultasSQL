
## Parte 1/2



### Consultas de una sola tabla

1. **Recuperar todas las líneas de productos con sus descripciones:**

   ```sql
   SELECT productLine, productDescription FROM products;
   ```

2. **Encontrar todos los empleados que trabajan en la oficina de 'San Francisco':**

   ```sql
   SELECT employeeNumber, firstName, lastName,officeCode, city FROM employees
   INNER JOIN offices USING (officeCode)
   WHERE officeCode = 1;
   ```

3. **Listar todas las órdenes que tienen un estado de 'Enviado':**

   ```sql
   SELECT orderDate, requiredDate, shippedDate, status FROM orders WHERE status = 'Shipped';
   ```

4. **Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**

   ```sql
   SELECT * FROM payments WHERE customerNumber = 103;
   ```

5. **Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**

   ```sql
   SELECT customerNumber, customerName, phone, country, creditLimit FROM customers WHERE creditLimit > 50000 AND country = 'USA';
   ```

### Consultas de múltiples tablas

1. **Listar todos los productos junto con las descripciones de sus líneas de productos:**

   ```sql
   SELECT pd.productCode, pd.productName, pd.productLine, pl.textDescription FROM products AS pd INNER JOIN productlines AS pl USING (productLine);
   ```

2. **Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**

   ```sql
   SELECT firstName, lastName, email, reportsTo FROM employees WHERE reportsTo = 1143;
   ```

3. **Encontrar todas las órdenes realizadas por clientes de 'Francia':**

   ```sql
   SELECT orderDate, requiredDate, shippedDate, status, country FROM orders INNER JOIN customers USING (customerNumber) WHERE country = 'France';
   ```

4. **Listar el monto total de los pagos recibidos de cada cliente:**

   ```sql
   SELECT c.customerNumber, c.customerName, SUM(pay.amount) AS total FROM customers AS c 
   JOIN payments AS pay ON c.customerNumber = pay.customerNumber
   GROUP BY c.customerNumber;
   ```

5. **Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente 103:**

   ```sql
   SELECT c.customerNumber, o.orderNumber, p.productCode, p.productName, od.quantityOrdered, od.priceEach
   FROM customers AS c
   JOIN orders AS o USING (customerNumber)
   JOIN orderdetails AS od USING (orderNumber)
   JOIN products AS p USING (productCode)
   WHERE c.customerNumber = 103;
   ```



-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



## Parte 2/2

### Consultas de una sola tabla

1. **Obtener el promedio del límite de crédito de todos los clientes:**

   ```sql
   SELECT AVG(creditLimit) AS average_credit FROM customers;
   ```

2. **Calcular el total de productos en stock:**

   ```sql
   SELECT SUM(quantityInStock) AS total_products FROM products;
   ```

3. **Encontrar el precio medio de compra de todos los productos:**

   ```sql
   SELECT AVG(buyPrice) AS average_price FROM products;
   ```

4. **Contar la cantidad de oficinas en cada país:**

   ```sql
   SELECT COUNT(officeCode) AS number_offices, country FROM offices GROUP BY country;
   ```

5. **Calcular el total de pagos recibidos:**

   ```sql
   SELECT SUM(amount) AS total_payments FROM payments;
   ```

6. **Obtener la cantidad total de empleados:**

   ```sql
   SELECT COUNT(employeeNumber) AS total_employees FROM employees;
   ```

7. **Calcular la cantidad media de productos pedidos en las órdenes:**

   ```sql
   SELECT AVG(quantityOrdered) AS average_product_orders FROM orderdetails;
   ```

8. **Encontrar el precio total de todos los productos:**

   ```sql
   SELECT SUM(buyPrice) AS total_product_price FROM products;
   ```

9. **Calcular el promedio del precio sugerido (MSRP) de los productos:**

   ```sql
   SELECT AVG(MSRP) AS suggested_average_price FROM products;
   ```

10. **Contar la cantidad de empleados por título de trabajo:**

```sql
SELECT COUNT(employeeNumber) AS number_employees, jobTitle FROM employees GROUP BY jobTitle;
```

### Consultas de múltiples tablas

1. **Calcular el total de pagos recibidos por cada cliente:**

   ```sql
   SELECT c.customerNumber, c.customerName, SUM(pay.amount) AS  total FROM customers AS c 
   JOIN payments AS pay ON c.customerNumber = pay.customerNumber 
   GROUP BY c.customerNumber;
   ```

2. **Obtener el promedio del límite de crédito de los clientes por país:**

   ```sql
   SELECT country, AVG(creditLimit) AS average_credit FROM customers GROUP BY country;
   ```

3. **Calcular el total de órdenes realizadas por cada cliente:**

   ```sql
  SELECT c.customerNumber, c.customerName, COUNT(o.orderNumber) AS total FROM customers AS c 
  JOIN orders AS o ON c.customerNumber = o.customerNumber 
  GROUP BY c.customerNumber;
   ```

4. **Encontrar la cantidad total de productos pedidos por cada cliente:**

   ```sql
   SELECT c.customerNumber, c.customerName, SUM(od.quantityOrdered) AS ordered_products FROM customers AS c 
   JOIN orders AS o USING (customerNumber) 
   JOIN orderdetails AS od USING (orderNumber) 
   GROUP BY c.customerNumber;
   ```

5. **Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:**

   ```sql
   SELECT c.customerNumber, c.customerName, SUM(od.quantityOrdered * od.priceEach) AS total_sales FROM customers AS c 
   JOIN orders AS o USING (customerNumber) 
   JOIN orderdetails AS od USING (orderNumber) 
   GROUP BY c.customerNumber;
   ```

6. **Obtener el promedio de la cantidad de productos en stock por línea de productos:**

   ```sql
   SELECT p.productLine, AVG(p.quantityInStock) AS average_products_in_stock FROM products AS p 
   GROUP BY p.productLine;
   ```

7. **Calcular el total de pagos recibidos por cada país:**

   ```sql
   SELECT ctm.country, COUNT(pay.amount) AS total FROM customers AS ctm 
   JOIN payments AS pay ON ctm.customerNumber = pay.customerNumber 
   GROUP BY ctm.country;
   ```

8. **Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:**

   ```sql
   SELECT employeeNumber, SUM(od.quantityOrdered * od.priceEach) AS total_sales
   FROM orderdetails AS od
   JOIN orders AS o ON od.orderNumber = o.orderNumber
   JOIN customers AS c ON o.customerNumber = c.customerNumber
   JOIN employees AS e ON e.employeeNumber = c.salesRepEmployeeNumber
   GROUP BY employeeNumber;
   ```

9. **Calcular el total de órdenes gestionadas por cada empleado:**

   ```sql
   SELECT e.employeeNumber, e.firstName, e.lastName, SUM(od.quantityOrdered * od.priceEach) AS total_sales FROM employees AS e 
    JOIN orders AS o USING (employeeNumber)
    JOIN orderdetails AS od USING (orderNumber)
    GROUP BY e.employeeNumber;
   ```

10. **Obtener la cantidad total de productos vendidos por cada línea de productos:**

    ```sql
    SELECT p.productLine, SUM(od.quantityOrdered) AS total_products_sold FROM products AS p 
    JOIN orderdetails AS od USING (productCode)
    GROUP BY p.productLine;
    ```

11. **Encontrar el promedio de la cantidad de productos ordenados por cada cliente:**

    ```sql
    SELECT c.customerNumber, c.customerName, AVG(od.quantityOrdered) AS average_products_ordered FROM customers AS c 
    JOIN orders AS o USING (customerNumber)
    JOIN orderdetails AS od USING (orderNumber)
    GROUP BY c.customerNumber;
    ```

12. **Calcular el total de ventas realizadas en cada país:**

    ```sql
    SELECT c.country, SUM(od.quantityOrdered * od.priceEach) AS total_sales FROM customers AS c 
    JOIN orders AS o USING (customerNumber)
    JOIN orderdetails AS od USING (orderNumber)
    GROUP BY c.country;
    ```

13. **Obtener el promedio del precio de compra de los productos por línea de productos:**

    ```sql
    SELECT p.productLine, AVG(p.buyPrice) AS average_buy_price FROM products AS p 
    GROUP BY p.productLine;
    ```

14. **Encontrar la cantidad total de productos vendidos por cada vendedor:**

    ```sql
    SELECT e.firstName, e.lastName, SUM(od.quantityOrdered) AS total_products_sold FROM employees AS e 
    JOIN customers AS c USING (salesRepEmployeeNumber)
    JOIN orders AS o USING (customerNumber)
    JOIN orderdetails AS od USING (orderNumber)
    GROUP BY e.employeeNumber;
    ```

15. **Calcular el total de pagos recibidos por cada vendedor:**

    ```sql
    SELECT e.employeeNumber, e.firstName, e.lastName, SUM(pay.amount) AS  total FROM employees AS e 
    JOIN customers AS c ON c.salesRepEmployeeNumber = e.employeeNumber
    JOIN payments AS pay ON c.customerNumber = pay.customerNumber
    GROUP BY e.employeeNumber;
    ```

16. **Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor:**

    ```sql
    SELECT e.firstName, e.lastName, AVG(ctm.creditLimit) AS average_credit FROM employees AS e 
    JOIN customers AS ctm ON e.employeeNumber = ctm.salesRepEmployeeNumber
    GROUP BY e.employeeNumber;
    ```

17. **Encontrar el total de ventas realizadas por cada oficina:**

    ```sql
    SELECT SUM(quantityOrdered * priceEach) AS total_sales, officeCode FROM orderdetails
    INNER JOIN orders USING (orderNumber)
    INNER JOIN customers USING (customerNumber)
    INNER JOIN employees ON employeeNumber = salesRepEmployeeNumber 
    INNER JOIN offices USING (officeCode)
    GROUP BY officeCode;
    ```

18. **Calcular la cantidad media de productos pedidos por cada cliente:**

    ```sql
    SELECT AVG(quantityOrdered) AS average_quantity_ordered, customerNumber FROM orderdetails
    INNER JOIN orders USING (orderNumber)
    INNER JOIN customers USING (customerNumber)
    GROUP BY customerNumber;
    ```

19. **Obtener el total de pagos realizados en cada año:**

    ```sql
    SELECT YEAR(paymentDate) AS year, SUM(amount) AS total FROM payments
    GROUP BY year;
    ```

20. **Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:**

    ```sql
    SELECT productLine, AVG(priceEach) AS average_price_each FROM orderdetails
    INNER JOIN products USING (productCode)
    GROUP BY productLine;
    ```

