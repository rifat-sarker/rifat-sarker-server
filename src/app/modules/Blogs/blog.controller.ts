import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const file = req.file;
  const authorId = req.user?.id;

  if (!authorId) {
    throw new Error("Unauthorized: No user ID found");
  }

  // if (!file) {
  //   throw new Error("Image file is required");
  // }

  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    throw new Error("Missing required blog fields");
  }

  const blogData = {
    title,
    content,
    category,
    ...(file && { image: file.path }),
  };

  const result = await BlogService.createBlogIntoDB(blogData, authorId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully",
    data: result,
  });
});


const getAllBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.getBlogByIdFromDB(id);

  if (!result) {
    throw new Error("Blog not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
    data: result,
  });
});

//update blog
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    throw new Error("Image file is required");
  }

  // check user is admin
  const user = req.user;
  // console.log(user);
  if (user.role !== "admin") {
    throw new Error("You are not authorized to update this blog");
  }
  // check blog exists
  const blog = await BlogService.getBlogByIdFromDB(id);
  if (!blog) {
    throw new Error("Blog not found");
  }

  const blogData = {
    ...req.body,
    image: file?.path,
  };

  const result = await BlogService.updateBlogIntoDB(id, blogData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  // check user is admin
  const user = req.user;
  if (user.role !== "admin") {
    throw new Error("You are not authorized to delete this blog");
  }

  // check blog exists
  const blog = await BlogService.getBlogByIdFromDB(id);
  if (!blog) {
    throw new Error("Blog not found");
  }

  await BlogService.deleteBlogFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: null,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
