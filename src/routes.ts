import express, { Response, Request } from "express";
import { GrowdeverController } from "./controllers/growdever.controller";
import {
  cadastroGrowdeverValidator,
  atualizaGrowdeverValidator,
  verificaGrowdeverExisteValidator,
} from "./validators";

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
  router.get(
    "/growdevers/:id",
    verificaGrowdeverExisteValidator,
    growdeverController.buscarGrowdeverPorId
  );
  router.delete(
    "/growdevers/:id",
    verificaGrowdeverExisteValidator,
    growdeverController.deletarGrowdever
  );
  router.put(
    "/growdevers/:id",
    verificaGrowdeverExisteValidator,
    atualizaGrowdeverValidator,
    growdeverController.atualizarGrowdever
  );

  return router;
};
