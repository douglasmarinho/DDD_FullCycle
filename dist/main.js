"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adress_1 = __importDefault(require("./entity/adress"));
const customer_1 = __importDefault(require("./entity/customer"));
const order_1 = __importDefault(require("./entity/order"));
const order_item_1 = __importDefault(require("./entity/order_item"));
let customer = new customer_1.default("123", "Douglas");
const adress = new adress_1.default("Rua Teste", "1", "25956-080", "Teresopolis");
customer.adress = adress;
customer.activate();
const item1 = new order_item_1.default("123", "Item 1", 10);
const item2 = new order_item_1.default("123", "Item 2", 20);
const order = new order_1.default("123", "123", [item1, item2]);
