import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE 
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS warehouse (
    warehouse_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name VARCHAR(255) NOT NULL UNIQUE,
    address TEXT
); 

CREATE TABLE IF NOT EXISTS variants (
    variant_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sku VARCHAR(100) NOT NULL UNIQUE, -- stock keeping unit
    color VARCHAR(100), 
    material VARCHAR(255),
    dimension VARCHAR(100), -- E.g., '80x40x30 cm'
    weight NUMERIC(6, 2) CHECK (weight > 0), -- E.g., 9999.99 kg/lbs max
    product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS stocks (
    inventory_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    variant_id INTEGER NOT NULL REFERENCES variants(variant_id) ON DELETE CASCADE,
    warehouse_id INTEGER NOT NULL REFERENCES warehouse(warehouse_id) ON DELETE CASCADE,
    quantity_on_hand INTEGER NOT NULL DEFAULT 0 CHECK (quantity_on_hand >= 0),
    quantity_reserved INTEGER NOT NULL DEFAULT 0 CHECK (quantity_reserved >= 0),
    reorder_point INTEGER NOT NULL DEFAULT 0 CHECK (reorder_point >= 0),
    
    -- Prevents duplicate rows for the same variant in the same warehouse
    CONSTRAINT unique_variant_warehouse UNIQUE (variant_id, warehouse_id),
    
    -- Business Logic: You can't reserve more stock than you actually physically have
    CONSTRAINT check_reserved_bounds CHECK (quantity_reserved <= quantity_on_hand)
);

INSERT INTO categories (name) 
    VALUES ('Appliances'), 
           ('Bathroom accessories'), 
           ('Cabinetry'), 
           ('Furniture'), 
           ('Lighting'); 


INSERT INTO products (product_name, description, category_id)
    VALUES ('Refrigerator', 'Has a smart door', 1), 
           ('Microwave oven', 'Thick rims', 1), 
           ('Soap dispenser', 'Would be mounted to the wall', 2), 
           ('Rail set', 'Black color', 2),
           ('Kitchen cabinet', 'Modular design', 3), 
           ('Entertaining unit', 'Floating type', 3), 
           ('Sofa', 'Velvet', 4), 
           ('Dining', 'Solid oak', 4), 
           ('Chandelier', 'Modern', 5), 
           ('Desk lamp', 'Flat bottom', 5); 

`;

async function createRelations() {
  console.log("Start...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Completed!");
}

createRelations();
