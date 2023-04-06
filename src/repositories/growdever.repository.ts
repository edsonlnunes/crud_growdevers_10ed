import db from "../db";
import { appDataSource } from "../db/data-source";
import { GrowdeverEntity } from "../db/entities/growdever.entity";
import { Growdever } from "../models/growdever";
import { ILike } from "typeorm";

export class GrowdeverRepository {
  async buscarPorId(id: string): Promise<Growdever | undefined> {
    const growdeverEntity = await appDataSource.manager.findOne(
      GrowdeverEntity,
      {
        where: {
          id,
        },
        relations: ["skills"],
      }
    );

    if (!growdeverEntity) return undefined;

    const growdever = Growdever.criarAPartirDoBanco(growdeverEntity);

    return growdever;
  }

  async existePeloId(id: string): Promise<boolean> {
    const existe = await appDataSource.manager.exists(GrowdeverEntity, {
      where: {
        id,
      },
    });
    return existe;
  }

  async removerPeloId(id: string): Promise<boolean> {
    await appDataSource.manager.delete(GrowdeverEntity, {
      id,
    });

    // remoção lógica - softDelete
    // remoção fisica - delete

    return true;
  }

  async existePeloCpf(cpf: string): Promise<boolean> {
    const existe = await appDataSource.manager.exists(GrowdeverEntity, {
      where: {
        cpf,
      },
    });
    return existe;
  }

  async criaGrowdever(growdever: Growdever): Promise<boolean> {
    const growdeverEntity = appDataSource.manager.create(GrowdeverEntity, {
      id: growdever.id,
      cpf: growdever.cpf,
      nome: growdever.nome,
      senha: growdever.senha,
      status: growdever.status,
      dataNascimento: growdever.dataNascimento,
    });

    await appDataSource.manager.save(growdeverEntity);

    return true;
  }

  async listarGrowdevers(status?: string, nome?: string): Promise<Growdever[]> {
    const growdeversEntities = await appDataSource.manager.find(
      GrowdeverEntity,
      {
        where: {
          nome: ILike(`%${nome ?? ""}%`),
          status: ILike(`%${status ?? ""}%`),
        },
      }
    );

    const growdevers = growdeversEntities.map((growEntity) =>
      Growdever.criarAPartirDoBanco(growEntity)
    );

    return growdevers;
  }

  async atualizarGrowdever(growdever: Growdever): Promise<Promise<boolean>> {
    await appDataSource.manager.update(
      GrowdeverEntity,
      { id: growdever.id },
      {
        nome: growdever.nome,
        dataNascimento: growdever.dataNascimento,
        status: growdever.status,
      }
    );

    // const growdeverEntity = (await appDataSource.manager.findOne(
    //   GrowdeverEntity,
    //   { where: { id: growdever.id } }
    // )) as GrowdeverEntity;

    // growdeverEntity.nome = growdever.nome;
    // growdeverEntity.dataNascimento = growdever.dataNascimento;
    // growdeverEntity.status = growdever.status;

    // await appDataSource.manager.save(growdeverEntity);

    return true;
  }
}
