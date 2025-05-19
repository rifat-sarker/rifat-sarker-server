import { Project } from "../../../types/common";
import prisma from "../../utils/prisma";

const createProjectIntoDB = async (payload: Project) => {
  const result = await prisma.project.create({
    data: payload,
  });
  return result;
};

export const ProjectService = {
  createProjectIntoDB,
};
