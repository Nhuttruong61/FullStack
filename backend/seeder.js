/**
 * Master Seeder - Runs all individual seeders in sequence
 * Usage: node seeder.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const { seedCategories } = require("./seeders/categories");
const { productsSeed } = require("./seeders/products");
const { seedBlogs } = require("./seeders/blogs");
const { seedSliders } = require("./seeders/sliders");
const { usersSeed } = require("./seeders/users");
const { seedSettings } = require("./seeders/settings");
const { seedPromoCodes } = require("./seeders/promoCodes");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✓ Connected to MongoDB");
  } catch (error) {
    console.error("✗ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const runSeeders = async () => {
  try {
    console.log("\n🚀 Starting Database Seeding...\n");
    console.log("═".repeat(50));

    // Run seeders in order
    console.log("\n📌 Step 1: Seeding Settings...");
    await seedSettings();

    console.log("\n📌 Step 2: Seeding Categories...");
    await seedCategories();

    console.log("\n📌 Step 3: Seeding Products...");
    await productsSeed();

    console.log("\n📌 Step 4: Seeding Blogs...");
    await seedBlogs();

    console.log("\n📌 Step 5: Seeding Sliders...");
    await seedSliders();

    console.log("\n📌 Step 6: Seeding Users...");
    await usersSeed();

    console.log("\n📌 Step 7: Seeding Promo Codes...");
    await seedPromoCodes();

    console.log("\n" + "═".repeat(50));
    console.log("\n✅ All seeders completed successfully!\n");
  } catch (error) {
    console.error("\n❌ Seeding failed:", error.message);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed\n");
  }
};

// Main execution
(async () => {
  await connectDB();
  await runSeeders();
})();