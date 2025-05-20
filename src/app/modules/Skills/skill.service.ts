import { Skill } from "@prisma/client";
import prisma from "../../utils/prisma";

const addSkillIntoDB = async (payload: Skill) => {
  const result = await prisma.skill.create({
    data: payload,
  });
  return result;
};

const getAllSkillFromDB = async () => {
  const result = await prisma.skill.findMany();
  return result;
};

const getSkillByIdFromDB = async (id: string) => {
  const result = await prisma.skill.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update skill into db
const updateSkillIntoDB = async (id: string, data: Partial<Skill>) => {
  await prisma.skill.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.skill.update({
    where: { id },
    data,
  });
  return result;
};

// delete skill into db
const deleteSkillFromDB = async (id: string) => {
  await prisma.skill.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.skill.delete({
    where: {
      id,
    },
  });
  return result;
};

export const SkillsService = {
  addSkillIntoDB,
  getAllSkillFromDB,
  getSkillByIdFromDB,
  updateSkillIntoDB,
  deleteSkillFromDB,
};
