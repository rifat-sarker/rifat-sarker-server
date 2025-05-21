import { Blog } from "@prisma/client";
import prisma from "../../utils/prisma";

const createBlogIntoDB = async (payload: Partial<Blog>) => {
  const result = await prisma.blog.create({
    data: {
      title: payload.title!,
      content: payload.content!,
      category: payload.category!,
      image: payload.image!,
    },
  });
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await prisma.blog.findMany({});
  return result;
};

const getBlogByIdFromDB = async (id: string) => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
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
