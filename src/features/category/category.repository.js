import { CategoryModel } from "./category.schema.js";

export class CategoryRepository {
  async getAllCategories() {
    try {
        const categories = await CategoryModel.find();
        return categories;
    } catch (error) {
        throw new Error("Failed to fetch categories");
    }
  }

}
