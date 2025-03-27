const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Product = require("../models/Product");
const Category = require("../models/Category");

const categories = [
    { name: "Electronics", description: "Devices and gadgets for everyday use." },
    { name: "Clothing", description: "Fashion and apparel for all seasons." },
    { name: "Furniture", description: "Stylish furniture for home and office." },
    { name: "Books", description: "Wide selection of books across genres." },
    { name: "Beauty & Personal Care", description: "Skincare, haircare, and beauty products." },
    { name: "Sports & Outdoors", description: "Equipment and gear for various activities." },
    { name: "Toys & Games", description: "Fun and educational toys for all ages." },
    { name: "Home Improvement", description: "Tools and materials for home projects." },
    { name: "Automotive", description: "Parts and accessories for vehicles." },
    { name: "Groceries", description: "Food and household essentials." }
];

const products = [
    { name: "Smartphone X", description: "Latest model smartphone.", price: 999, category: "Electronics", stock: 50, variants: [{ color: "Black", size: "6.1 inch", stock: 30 }, { color: "Silver", size: "6.1 inch", stock: 20 }] },
    { name: "Men's T-Shirt", description: "Casual and comfortable.", price: 20, category: "Clothing", stock: 100, variants: [{ color: "Blue", size: "M", stock: 40 }, { color: "Red", size: "L", stock: 60 }] },
    { name: "Cookbook", description: "A collection of recipes.", price: 15, category: "Books", stock: 80, variants: [{ color: "N/A", size: "Hardcover", stock: 50 }, { color: "N/A", size: "Paperback", stock: 30 }] },
    { name: "Football", description: "Standard size football.", price: 30, category: "Sports & Outdoors", stock: 60, variants: [{ color: "White", size: "Standard", stock: 60 }] },
    { name: "Power Drill", description: "Cordless drill for home improvement.", price: 120, category: "Home Improvement", stock: 35, variants: [{ color: "Green", size: "Standard", stock: 35 }] }
];

const seedDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Clearing existing data...");
        await Product.deleteMany({});
        await Category.deleteMany({});

        console.log("Seeding categories...");
        const insertedCategories = await Category.insertMany(categories);
        const categoryMap = insertedCategories.reduce((map, cat) => {
            map[cat.name] = cat._id;
            return map;
        }, {});

        console.log("Mapping categories to products...");
        const updatedProducts = products.map(product => ({
            ...product,
            category: categoryMap[product.category] || null
        }));

        console.log("Seeding products...");
        const insertedProducts = await Product.insertMany(updatedProducts);
        console.log(`Inserted ${insertedProducts.length} products.`);

        console.log("✅ Mock data seeded successfully!");
    } catch (error) {
        console.error("❌ Error seeding data:", error);
    } finally {
        console.log("Closing database connection.");
        mongoose.connection.close();
    }
};

seedDatabase();
