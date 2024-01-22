import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("Should place an order",()=>{
        const customer = new Customer ("c1", "Customer 1");
        const item = new OrderItem("i1", "Item 1", 10, "p1", 1);
        const itens =[item];


        const order = OrderService.placeOrder(customer, itens);

        expect(customer.rewardPoints).toBe(5);
        expect(order.customerId).toBe(customer.id);
        expect(OrderService.total([order])).toBe(10);
    });

    it("should get total of all order", () =>{
        let item = new OrderItem("i1", "Item 1", 100, "p1", 1);
        let item2 = new OrderItem("i2", "Item 2", 200, "p2", 1);
        const order = new Order("o1", "c1", [item, item2]);

        item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
        const order2 = new Order("o2", "c2", [item, item2]);

        const orders = [order, order2];

        let total= OrderService.total(orders);

        expect(total).toBe(900);
    });

    it("Should add reward points",()=>{
        const customer = new Customer ("c1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(50);
        expect(customer.rewardPoints).toBe(50);

    });
});