import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SkillsService } from "./skill.service";

const addSkill = catchAsync(async (req, res) => {
  const result = await SkillsService.addSkillIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Skill added successfully",
    data: result,
  });
});

const getAllSkill = catchAsync(async (req, res) => {
  const result = await SkillsService.getAllSkillFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skills retrieved successfully",
    data: result,
  });
});

const getSkillById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillsService.getSkillByIdFromDB(id);

  if (!result) {
    throw new Error("Skill not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill retrieved successfully",
    data: result,
  });
});

//update skill
const updateSkill = catchAsync(async (req, res) => {
  console.log("PATCH data:", req.body);


  const { id } = req.params;

  // check user is admin
  const user = req.user;
  // console.log(user);
  if (user.role !== "admin") {
    throw new Error("You are not authorized to update this skill");
  }
  // check skill exists
  const skill = await SkillsService.getSkillByIdFromDB(id);
  if (!skill) {
    throw new Error("Skill not found");
  }

  const result = await SkillsService.updateSkillIntoDB(id, req.body);

console.log("Updated skill in DB:", result);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill updated successfully",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const { id } = req.params;

  // check user is admin
  const user = req.user;
  if (user.role !== "admin") {
    throw new Error("You are not authorized to delete this skill");
  }

  // check project exists
  const skill = await SkillsService.getSkillByIdFromDB(id);
  if (!skill) {
    throw new Error("Skill not found");
  }

  await SkillsService.deleteSkillFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill deleted successfully",
    data: null,
  });
});

export const SkillsController = {
  addSkill,
  getAllSkill,
  getSkillById,
  updateSkill,
  deleteSkill,
};
