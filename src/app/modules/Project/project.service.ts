import { Project } from "@prisma/client";
import prisma from "../../utils/prisma";


const createProjectIntoDB = async (payload: Project) => {
  const result = await prisma.project.create({
    data: payload,
  });
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getProjectByIdFromDB = async (id: string) => {
  const result = await prisma.project.findUnique({
    where: {
      id,
    },
  });
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

// delete project into db
const deleteProjectFromDB = async (id: string) => {
  await prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.project.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ProjectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
};
