import { getAllCategoriesWithProducts } from "../database/queries.js";
import { CustomNotFoundError } from "../errors/customNotFoundError.js";

// Create method to get all categories with their products
async function getHomePage(req, res) {
  const categories = await getAllCategoriesWithProducts();

  if (!categories) {
    throw new CustomNotFoundError("No category found!");
  }

  console.log(categories);

  res.render("pages/home", {
    categories: categories,
    user: { first_name: "NK" },
  });
}

export { getHomePage };
