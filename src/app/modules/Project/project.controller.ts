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


//update event
const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  const creatorId = req.user.id;

  const eventData = {
    ...req.body,
    creatorId,
    eventImgUrl: file?.path, // set image URL
  };

  const result = await ProjectService.updateProjectIntoDB(id, eventData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event updated successfully',
    data: result,
  });
});


export const ProjectController = {
  createProject,
  getAllProjects,
};
