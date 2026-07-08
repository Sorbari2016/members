import pool from "./pool.js";

// Create query to get all categories with their products
async function getAllCategoriesWithProducts() {
  const { rows } = await pool.query(`
    SELECT 
      c.category_id, 
      c.name,
      COALESCE(
        json_agg(
          json_build_object(
            'id', p.product_id,
            'name', p.product_name, 
            'slug', LOWER(REPLACE(p.product_name, ' ', '-'))
          )
        ) FILTER (WHERE p.product_id IS NOT NULL), 
        '[]'
      ) AS products
    FROM categories AS c
    LEFT JOIN products AS p ON p.category_id = c.category_id
    GROUP BY c.category_id, c.name
    ORDER BY c.name;
  `);

  return rows;
}

export { getAllCategoriesWithProducts };
