import { Project } from "../../../types/common";
import prisma from "../../utils/prisma";

const createProjectIntoDB = async (payload: Project) => {
  const result = await prisma.project.create({
    data: payload,
  });
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await prisma.project.findMany();
  return result;
};

// update project into db
const updateProjectIntoDB = async (id: string, data: Partial<Project>) => {
  await prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.project.update({
    where: { id },
    data,
  });
  return result;
};

export const ProjectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  updateProjectIntoDB,
};
