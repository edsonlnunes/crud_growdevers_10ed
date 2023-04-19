import { randomUUID } from "crypto";
import { ILike } from "typeorm";
import { appDataSource } from "../../../shared/db/data-source";
import {
  GrowdeverEntity,
  GrowdeverSkillEntity,
} from "../../../shared/db/entities";
import {
  AtualizarGrowdeverDTO,
  CriarGrowdeverDTO,
  GrowdeverDetalheDTO,
  GrowdeverListaDTO,
  HabilidadeDetalheDTO,
} from "../dtos";
import { StatusGrowdever } from "../enums";

export class GrowdeverRepository {
  async buscarPorId(id: string): Promise<GrowdeverDetalheDTO | undefined> {
    const growdeverEntity = await appDataSource.manager.findOne(
      GrowdeverEntity,
      {
        where: {
          id,
        },
        relations: ["habilidadesDoGrowdever"],
      }
    );

    if (!growdeverEntity) return undefined;

    return {
      id: growdeverEntity.id,
      cpf: growdeverEntity.cpf,
      nome: growdeverEntity.nome,
      status: growdeverEntity.status,
      dataNascimento: growdeverEntity.dataNascimento,
      habilidades: growdeverEntity.habilidadesDoGrowdever!.map(
        (habilidade) => ({
          id: habilidade.id,
          nome: habilidade.nome,
        })
      ),
    };
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

  async criaGrowdever(
    growdever: CriarGrowdeverDTO
  ): Promise<GrowdeverDetalheDTO> {
    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const growdeverEntity = queryRunner.manager.create(GrowdeverEntity, {
        cpf: growdever.cpf,
        nome: growdever.nome,
        senha: growdever.senha,
        status: growdever.status,
        dataNascimento: growdever.dataNascimento,
      });

      await queryRunner.manager.save(growdeverEntity);

      const skills: HabilidadeDetalheDTO[] = [];

      for (const skill of growdever.habilidades) {
        const novaSkill = queryRunner.manager.create(GrowdeverSkillEntity, {
          nome: skill,
          growdeverId: growdeverEntity.id,
        });

        await queryRunner.manager.save(novaSkill);

        skills.push({
          id: novaSkill.id,
          nome: novaSkill.nome,
        });
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        id: growdeverEntity.id,
        cpf: growdeverEntity.cpf,
        nome: growdeverEntity.nome,
        status: growdeverEntity.status,
        dataNascimento: growdeverEntity.dataNascimento,
        habilidades: skills,
      };
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async listarGrowdevers(
    status?: StatusGrowdever,
    nome?: string
  ): Promise<GrowdeverListaDTO[]> {
    const growdeversEntities = await appDataSource.manager.find(
      GrowdeverEntity,
      {
        where: {
          nome: ILike(`%${nome ?? ""}%`),
          status,
        },
        relations: ["habilidadesDoGrowdever"],
      }
    );

    const growdevers = growdeversEntities.map<GrowdeverListaDTO>(
      (growEntity) => ({
        id: growEntity.id,
        nome: growEntity.nome,
        status: growEntity.status,
        habilidades: growEntity.habilidadesDoGrowdever!.map((habilEntity) => ({
          id: habilEntity.id,
          nome: habilEntity.nome,
        })),
      })
    );

    return growdevers;
  }

  async atualizarGrowdever(
    growdever: AtualizarGrowdeverDTO
  ): Promise<Promise<boolean>> {
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
