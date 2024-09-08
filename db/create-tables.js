
const { Client } = require("pg");
require("dotenv").config();


const createTables = `
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

CREATE TABLE item_categories (
    item_id INT REFERENCES items(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (item_id, category_id)
);

CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

CREATE TABLE regional_prices (
    item_id INT REFERENCES Items(id) ON DELETE CASCADE,
    warehouse_id INT REFERENCES warehouses(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (item_id, warehouse_id)
);
`
const insertIntoCategories = `
INSERT INTO categories (name) VALUES
('Fresh vegetables'),
('Fresh fruits'),
('Canned foods'),
('Sauces'),
('Various groceries'),
('Spices & herbs'),
('Oils/Vinegars'),
('Refrigerated items'),
('Dairy'),
('Cheese'),
('Frozen'),
('Meat'),
('Seafood'),
('Baked goods'),
('Baking'),
('Snacks'),
`

const insertIntoItems = `
INSERT INTO items (name) VALUES

-- Fresh vegetables (Category ID 1)
('Asparagus'),
('Beets'),
('Broccoli'),
('Cauliflower'),
('Carrots'),
('Celery'),
('Corn'),
('Cucumbers'),
('Greens'),
('Lettuce'),
('Mushrooms'),
('Onions'),
('Peppers'),
('Potatoes'),
('Spinach'),
('Sprouts'),
('Squash'),
('Tomatoes'),
('Zucchini'),

-- Fresh fruits (Category ID 2)
('Apples'),
('Avocado'),
('Bananas'),
('Berries'),
('Cherries'),
('Grapes'),
('Kiwis'),
('Lemons'),
('Limes'),
('Melons'),
('Oranges'),
('Peaches'),
('Pears'),
('Plums'),

-- Canned foods (Category ID 3)
('Applesauce'),
('Baked beans'),
('Beans'),
('Carrots'),
('Corn'),
('Mixed fruit'),
('Mixed veggies'),
('Olives'),
('Pasta sauce'),
('Pickles'),
('Refried beans'),
('Tuna'),
('Soups'),
('Tomatoes'),

-- Sauces (Category ID 4)
('BBQ sauce'),
('Hot sauce'),
('Salsa'),
('Soy sauce'),
('Steak sauce'),
('Syrup'),
('Worcestershire sauce'),

-- Various groceries (Category ID 5)
('Bottled water'),
('Bullion cubes'),
('Cereal'),
('Coffee'),
('Gravy'),
('Honey'),
('Jelly'),
('Ketchup'),
('Lemon juice'),
('Lime juice'),
('Mac & cheese'),
('Mayonnaise'),
('Mustard'),
('Pancake / Waffle mix'),
('Peanut butter'),
('Ramen'),
('Soda pop'),
('Tea'),
('White rice'),
('Wild rice'),

-- Spices & herbs (Category ID 6)
('Basil'),
('Black pepper'),
('Cilantro'),
('Cinnamon'),
('Garlic'),
('Oregano'),
('Parsley'),
('Red pepper'),
('Salt'),
('Vanilla extract'),

-- Oils/Vinegars (Category ID 7)
('Apple cider vinegar'),
('Balsamic vinegar'),
('Salad dressing'),
('Olive oil'),
('Vegetable oil'),
('White vinegar'),

-- Refrigerated items (Category ID 8)
('Chip dip'),
('Eggs'),
('Juice'),
('Tofu'),
('Tortillas'),

-- Dairy (Category ID 9)
('Butter'),
('Half & half'),
('Heavy cream'),
('Margarine'),
('Milk'),
('Sour cream'),
('Whipped cream'),
('Yogurt'),

-- Cheese (Category ID 10)
('Cheddar'),
('Cottage cheese'),
('Cream cheese'),
('Feta'),
('Mozzarella'),
('Parmesan'),
('Pepper'),
('Provolone'),
('Ricotta'),
('Sandwich slices'),
('Shredded'),
('Swiss'),

-- Frozen (Category ID 11)
('Burritos'),
('Desserts'),
('Fish sticks'),
('Ice cream'),
('Juices'),
('Pizzas'),
('Popsicles'),
('Tater tots'),
('Sorbet'),
('TV dinners'),
('Vegetables'),
('Veggie burgers'),

-- Meat (Category ID 12)
('Bacon'),
('Beef'),
('Chicken'),
('Ground beef'),
('Ground turkey'),
('Ham'),
('Hot dogs'),
('Pork'),
('Sausage'),
('Steak'),
('Turkey'),

-- Seafood (Category ID 13)
('Catfish'),
('Cocktail sauce'),
('Crab'),
('Halibut'),
('Oysters'),
('Salmon'),
('Shrimp'),
('Tilapia'),
('Tuna'),

-- Baked goods (Category ID 14)
('Bagels'),
('Buns'),
('Cake'),
('Cookies'),
('Crackers'),
('Croissants'),
('Donuts'),
('Fresh bread'),
('Pastries'),
('Pie'),
('Pitas'),
('Rolls'),
('Sliced bread'),

-- Baking (Category ID 15)
('Baking powder'),
('Baking soda'),
('Bread crumbs'),
('Brown sugar'),
('Cake decorations'),
('Cake icing'),
('Cake / Brownie mix'),
('Chocolate chips'),
('Cocoa'),
('Flour'),
('Oatmeal'),
('Pie shell'),
('Powdered sugar'),
('Shortening'),
('Sugar'),
('Yeast'),

-- Snacks (Category ID 16)
('Candy'),
('Cookies'),
('Dried fruit'),
('Granola bars'),
('Gum'),
('Nuts'),
('Popcorn'),
('Potato chips'),
('Pudding'),
('Pretzels'),
('Tortilla chips');
`

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.CONNECTION_STRING,
    });

    try {
        await client.connect();
        await client.query("BEGIN")
        await client.query(createTables);
        await client.query(insertIntoCategories);
        await client.query(insertIntoItems);
        await client.query("COMMIT")
        console.log("Database seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding database:", error);
        await client.query("ROLLBACK");
    } finally {
        await client.end();
    }
  }
  
 
main().catch(error => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
  
  