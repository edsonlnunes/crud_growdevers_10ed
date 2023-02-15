import express, { Response, Request } from "express";
import { GrowdeverController } from "./controllers/growdever.controller";
import { cadastroGrowdeverValidator } from "./validators";

export = () => {
  const router = express.Router();

  router.get("/", (request: Request, response: Response) =>
    response.status(200).json("API OK")
  );

  const growdeverController = new GrowdeverController();
  router.post(
    "/growdevers",
    cadastroGrowdeverValidator,
    growdeverController.cadastrarGrowdever
  );
  router.get("/growdevers", growdeverController.buscarGrowdevers);
  router.get("/growdevers/:id", growdeverController.buscarGrowdeverPorId);
  router.delete("/growdevers/:id", growdeverController.deletarGrowdever);
  router.put("/growdevers/:id", growdeverController.atualizarGrowdever);

  return router;
};
