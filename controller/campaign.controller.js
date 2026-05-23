import campaignModel from "../model/campaign.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllCampaigns = catchAsync(async (req, res, next) => {
  // let campaigns = await campaignModel.find();
  // res.status(200).json({ message: "success", data: campaigns });

  //compaign managment : filter, pagination , search
  let {category, status,search, limit, skip}= req.query;
  // filter
  let filter = {};
  if(category) filter.category =category;
  if(status) filter.status =status;
  if(search) filter.title = { $regex: search, $options: "i" };
  // pagination 
  limit = parseInt(limit) || 10;
  skip = parseInt(skip) || 0;

  let campaigns = await campaignModel.find(filter).limit(limit).skip(skip);
  let total = await campaignModel.countDocuments(filter);

  res.status(200).json({
    message: "success",
    total,
    limit,
    skip,
    data: campaigns,
  })
});

export const createCampaign = catchAsync(async (req, res, next) => {
  let {
    title,
    description,
    targetAmount,
    category,
    endDate,
    createdBy,
  } = req.body;

  let campaign = await campaignModel.create({
    title,
    description,
    targetAmount,
    category,
    endDate,
    createdBy: req.user._id
  });

  res.status(201).json({ message: "success", data: campaign });
});

export const getCampaign = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let campaign = await campaignModel.findById(id);

  if (!campaign) {
    return next(new AppError(404, "Campaign not found"));
  }

  res.status(200).json({ message: "success", data: campaign });
});

export const updateCampaign = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let campaign = await campaignModel.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!campaign) {
    return next(new AppError(404, "Campaign not found"));
  }

  res.status(200).json({ message: "success", data: campaign });
});

export const deleteCampaign = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let campaign = await campaignModel.findByIdAndDelete(id);

  if (!campaign) {
    return next(new AppError(404, "Campaign not found"));
  }

  return res.status(204).json({ message: "success" });
});
