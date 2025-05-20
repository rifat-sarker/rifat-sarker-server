import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const file = req.file;
  if (!file) {
    throw new Error("Image file is required");
  }
  const projectData = { ...req.body, image: file.path };

  const result = await ProjectService.createProjectIntoDB(projectData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectService.getAllProjectsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: result,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectService.getProjectByIdFromDB(id);

  if (!result) {
    throw new Error("Project not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully",
    data: result,
  });
});

//update project
const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    throw new Error("Image file is required");
  }

  // check user is admin
  const user = req.user;
  if (user.role !== "admin") {
    throw new Error("You are not authorized to update this project");
  }
  // check project exists
  const project = await ProjectService.getProjectByIdFromDB(id);
  if (!project) {
    throw new Error("Project not found");
  }

  const projectData = {
    ...req.body,
    image: file?.path,
  };

  const result = await ProjectService.updateProjectIntoDB(id, projectData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Event updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;

  // check user is admin
  const user = req.user;
  if (user.role !== "admin") {
    throw new Error("You are not authorized to delete this project");
  }

  // check project exists
  const project = await ProjectService.getProjectByIdFromDB(id);
  if (!project) {
    throw new Error("Project not found");
  }

  await ProjectService.deleteProjectFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: null,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
