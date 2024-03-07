import { LikeRepository } from "./like.repository.js";

export class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async likeItem(req, res, next) {
    try {
      const { id, type } = req.body;
      const userId = req.userId;

      if (type != "Product" && type != "Category") {
        return res.status(400).send("Invalid type");
      }
      if (type == "Product") {
        await this.likeRepository.likeProduct(userId, id);
      } else {
        await this.likeRepository.likeCategory(userId, id);
      }
      res.status(200).send(`${type} liked`);
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  }

  async getLikes(req, res, next) {
    try {
      const userId = req.userId;
      const { id, type } = req.query;
      const likedItems = await this.likeRepository.getLikes(userId, id, type);
      res.status(200).send(likedItems);
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  }
}
