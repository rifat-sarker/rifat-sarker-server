import { Blog } from "@prisma/client";
import prisma from "../../utils/prisma";

const createBlogIntoDB = async (payload: Blog, authorId: string) => {
  const result = await prisma.blog.create({
    data: {
      ...payload,
      authorId,
    },
  });
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await prisma.blog.findMany({
    include: {
      author: true,
    },
  });
  return result;
};

const getBlogByIdFromDB = async (id: string) => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

// update blog into db
const updateBlogIntoDB = async (id: string, data: Partial<Blog>) => {
  await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.blog.update({
    where: { id },
    data,
  });
  return result;
};

// delete blog into db
const deleteBlogFromDB = async (id: string) => {
  await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
