import { 
    getAllProductLineDescriptions,
    getAllProductsAndDescriptions,
    getAllProductsInStock,
    getAveragePriceOfAllProducts,
    getTotalPriceOfAllProducts,
    getAverageMSRPOfAllProducts,
    getAverageProductsInStockByProductLine,
    getAllProductsSoldByProductLine,
    getAverageProductsOrderedByEachCustomer
} from "./module/products.js";
import {
    getAllEmployeesFromSanFrancisco,
    getAllEmployeesEmailAndAddressThatReportEmployee1143,
    getAllEmployeesEmailAndAddressThatReportEmployeeN,
    getAllEmployeesCount,
    getAllEmployeesCountByJobtitle,
    getAllSalesByEachEmployee,
    getAllProductsSoldBySalesRep,
    getAllPaymentsReceivedByEachEmployee,
    getAverageCreditLimitOfAllCustomersBySalesRep
} from "./module/employees.js";
import {
    getAllOrdersWithStatusShipped,
    getAllOrdersByEachCustomer 
} from "./module/orders.js";
import {
    getAllPaymentsFromCustomer103, 
    getAllPaymentsFromCustomerN,
    getAllCustomersWithCreditLimitGreaterThan50000,
    getAllOrdersFromFrance,
    getAllPaymentsByEachCustomer,
    getAllOrdersDetailsFromCustomer103,
    getAverageCreditLimitOfAllCustomers,
    getAverageCreditLimitOfAllCustomersByCountry,
    getAllSalesByEachCustomer 
} from "./module/customers.js";
import {
    getAverageProductsOrdered,
    getAllProductsOrderedByEachCustomer,
    getAllSalesByEachCountry,
    getAveragePriceEachByProductLine
} from "./module/orderdetails.js"
import {
    getCountOfAllOfficesByCountry,
    getAllSalesByEachOffice
} from "./module/offices.js"
import {
    getAllPaymentsReceived,
    getAllPaymentsReceivedByEachCustomer,
    getAllPaymentsReceivedByEachCountry,
    getAllPaymentsReceivedByEachYear
} from "./module/payments.js"

console.log(await getAll());