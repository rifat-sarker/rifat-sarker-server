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

export const ProjectController = {
  createProject,
};
