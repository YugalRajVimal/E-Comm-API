import { CategoryRepository } from "./category.repository.js";

export class CategoryController {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getCategories(req, res, next) {
    try {
        const categories = await this.categoryRepository.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error); 
    }
  }
}
