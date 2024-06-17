import { getAllProductsDescriptions } from "./module/products.js";
import { getAllEmployeesFromSanFrancisco } from "./module/employees.js";
import { getAllOrdersWithStatusShipped } from "./module/orders.js";
import { getAllPaymentsFromCustomer103, getAllPaymentsFromCustomerN } from "./module/customers.js";

console.log(await getAllPaymentsFromCustomerN(103));