import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Products from "../../domain/entity/product";
import ProductRepository from "./product.repository"

describe("Product respository tests", () => {
    let sequileze: Sequelize;

    beforeEach(async () =>{
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},            
        });
        sequileze.addModels([ProductModel]);
        await sequileze.sync();
    });


    afterEach(async () =>{
        await sequileze.close();
    });

    it("Should create a product", async()=>{
        const productRepository = new ProductRepository ();
        const product = new Products("1", "Product 1", 10);
        
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id:"1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1", 
            price: 10,
        });
    }); 

    it("Should update a product", async()=>{
        const productRepository = new ProductRepository ();
        let product = new Products("1", "Product 1", 10);
        
        await productRepository.create(product);

        product.changeName("Product 1 Update");
        product.changePrice(100);
        await productRepository.update(product);

        const productModel = await ProductModel.findOne({where: {id:"1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1 Update", 
            price: 100,
        });
    }); 

    it("Should find a product", async()=>{
        const productRepository = new ProductRepository ();
        const product = new Products("1", "Product 1", 10);
        const product2 = new Products("2", "Product 2", 20);
        const product3 = new Products("3", "Product 2", 30);

        await productRepository.create(product);
        await productRepository.create(product2);
        await productRepository.create(product3);

        const productModel = await ProductModel.findOne({where: {id:"2"}});

        const productReturn = await productRepository.find("2");

        expect(productModel.toJSON()).toStrictEqual({
            id: productReturn.id,
            name: productReturn.name, 
            price: productReturn.price,
        });
    }); 

    it("Should find all product", async()=>{
        const productRepository = new ProductRepository ();
        const product = new Products("1", "Product 1", 10);
        const product2 = new Products("2", "Product 2", 20);
        const product3 = new Products("3", "Product 2", 30);

        await productRepository.create(product);
        await productRepository.create(product2);
        await productRepository.create(product3);

        const productsReturn = await productRepository.findAll();
        const products = [product, product2, product3];

        expect(productsReturn.length).toBe(3);
        expect(productsReturn).toEqual(products);
    }); 
});
