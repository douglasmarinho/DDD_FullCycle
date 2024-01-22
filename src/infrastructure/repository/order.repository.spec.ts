import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Products from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository"

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository ();
    const product = new Products("1", "Product 1", 10);     
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {id: order.id},
      include: ["items"],
    });
    
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items:[
        {
          id: orderItem.id,
          name: orderItem.name,          
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: orderItem.productId,
        }
      ],
    });

  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository ();
    const product = new Products("1", "Product 1", 10);     
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2,
    );

    const product2 = new Products("2", "Product 2", 30);     
    await productRepository.create(product2);
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1,
    );

    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);
  

    order.addItems(orderItem2);

    const customer2 = new Customer("321", "Customer 2");
    customer2.changeAddress(address);
    await customerRepository.create(customer2);

    order.customerId = customer2.id;
    

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: {id: order.id},
      include: ["items"],
    });
    
    expect(orderModel.items.length).toBe(2);
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: order.items.map((item)=>({
        id: item.id,
        product_id: item.productId,
        order_id: order.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,    
      })),
    });

  });


  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository ();
    const product = new Products("1", "Product 1", 10);     
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);
  

    const orderModel = await OrderModel.findOne({
      where: {id: order.id},
      include: ["items"],
    });

    const orderReturn = await orderRepository.find(order.id);
    
    expect(orderModel.toJSON()).toStrictEqual({
      id: orderReturn.id,
      customer_id: orderReturn.customerId,
      total: orderReturn.total(),
      items: orderReturn.items.map((item)=>({
        id: item.id,
        product_id: item.productId,
        order_id: orderReturn.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,    
    })),
    });

  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customer2 = new Customer("321", "Customer 2");
    const address2 = new Address("Street 2", "2", "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository ();
    const product = new Products("1", "Product 1", 10);     
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2,
    );

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order("1", customer.id, [orderItem]);
    const order2 = new Order("2", customer2.id, [orderItem2]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);
    await orderRepository.create(order2);
  

    const orderModel = await OrderModel.findOne({
      where: {id: order.id},
      include: ["items"],
    });

    const orderReturn = await orderRepository.find(order.id);
    
    expect(orderModel.toJSON()).toStrictEqual({
      id: orderReturn.id,
      customer_id: orderReturn.customerId,
      total: orderReturn.total(),
      items: orderReturn.items.map((item)=>({
        id: item.id,
        product_id: item.productId,
        order_id: orderReturn.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,    
    })),
    });

  });

  it("should find all order", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customer2 = new Customer("321", "Customer 2");
    const address2 = new Address("Street 2", "2", "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository ();
    const product = new Products("1", "Product 1", 10);     
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1,
    );

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order("1", customer.id, [orderItem]);
    const order2 = new Order("2", customer2.id, [orderItem2]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    await orderRepository.create(order2);
  

    const orderReturn = await orderRepository.findAll();
    
    const orders = [order, order2];

    expect(orderReturn.length).toBe(2);
    expect(orderReturn).toEqual(orders);

  });
});
