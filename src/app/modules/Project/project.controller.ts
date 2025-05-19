import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createProject = catchAsync(async (req, res) => {
  const data = req.body;
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project created successfully",
    data: data,
  });
});

export const ProjectController = {
  createProject,
};
