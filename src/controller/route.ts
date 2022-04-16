import {
  getInventory,
  addInventory,
  deleteInventory,
  editInventory,
} from "../service/service";
import express from "express";
const router = express.Router();

const getRouter = () => {
  router.use(express.json());
  router.get("/api", async (_, res) => {
    try {
      res.json(await getInventory());
    } catch (err) {
      res.status(500).json({ message: "Something terrible has gone wrong" });
    }
  });
  router.post("/api", async (req, res) => {
    try {
      res.json(await addInventory(req.body));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.put("/api/:id", async (req, res) => {
    try {
      const result = await editInventory(req.params.id, req.body);
      if (result === null)
        res.status(404).json({
          message: "Could not find inventory entry with that id",
        });
      else res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });
  router.delete("/api/:id", async (req, res) => {
    try {
      const result = await deleteInventory(req.params.id);
      if (result === null)
        res
          .status(404)
          .json({ message: "Could not find inventory entry with that id" });
      else res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

  return router;
};
export default getRouter;
