import express, { Response, Request } from "express";
import { GrowdeverController } from "./controllers/growdever.controller";
import { GrowdeverSkillsController } from "./controllers/growdever-skills.controller";
import {
  cadastroGrowdeverValidator,
  atualizaGrowdeverValidator,
  verificaGrowdeverExisteValidator,
} from "./validators";
import { AutenticacaoController } from "./controllers/autenticacao.controller";
import autoriza from "./middlewares/autoriza.middleware";

export = () => {
  const router = express.Router();

  router.get("/", (request: Request, response: Response) =>
    response.status(200).json("API OK")
  );

  const growdeverController = new GrowdeverController();

  router.post(
    "/growdevers",
    // autoriza,
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
    // autoriza,
    verificaGrowdeverExisteValidator,
    growdeverController.deletarGrowdever
  );
  router.put(
    "/growdevers/:id",
    // autoriza,
    verificaGrowdeverExisteValidator,
    atualizaGrowdeverValidator,
    growdeverController.atualizarGrowdever
  );

  const growdeverSkillsController = new GrowdeverSkillsController();
  router.put(
    "/growdevers/:id/skills",
    autoriza,
    verificaGrowdeverExisteValidator,
    growdeverSkillsController.addGrowdeverSkill
  );

  const autController = new AutenticacaoController();
  router.post("/login", autController.entrar);

  return router;
};
