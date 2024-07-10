import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import ResponseHelper from "../utils/response";
import ProfileService from "../services/profile.service";
import ProfileValidator from "../validators/ProfileValidator";

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get profile
 * @route `/api/profile/profile`
 * @access Private
 * @type GET
 **/
export const getProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await ProfileService.getProfile(req.user?.id)

    if(!profile){
      return next(new AppError("No profile found", ResponseHelper.RESOURCE_NOT_FOUND))
    }

    ResponseHelper.sendResponse(res, {
      statusCode: ResponseHelper.OK,
      data: { profile },
    });

  } catch (error) {
    return next(new AppError("An error occurred while trying to get your profile. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});


/**
 * @author
 * @description Update profile
 * @route `/api/v1/profile/add-about`
 * @access Private
 * @type PATCH
 **/
export const updateUserAbout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
  
      const validationResult = ProfileValidator.updateUserAbout(req.body);
  

      if (validationResult.error) {
          return next(new AppError(validationResult.error.message, ResponseHelper.BAD_REQUEST));
      }
    
      const profile = await ProfileService.updateUserAbout(req.user?.id, req.body.about)
  
      if(!profile){
        return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND))
      }
    
      // send success response
      ResponseHelper.sendSuccessResponse(res, {
          message: 'Added your about successfully',
          statusCode: ResponseHelper.OK,
          data: profile,
      });
  
    } catch (error) {
      console.log(error)
      return next(new AppError("An error occurred while trying to update your goals. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})


/**
 * @author
 * @description Update goals
 * @route `/api/v1/profile/add-goals`
 * @access Private
 * @type PATCH
 **/
export const updateUserGoals = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
  
      const validationResult = ProfileValidator.updateUserGoals(req.body);
  

      if (validationResult.error) {
          return next(new AppError(validationResult.error.message, ResponseHelper.BAD_REQUEST));
      }
    
      const profile = await ProfileService.updateUserGoals(req.user?.id, req.body.goals)
  
      if(!profile){
        return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND))
      }
    
      // send success response
      ResponseHelper.sendSuccessResponse(res, {
          message: 'Added your goals successfully',
          statusCode: ResponseHelper.OK,
          data: profile,
      });
  
    } catch (error) {
      return next(new AppError("An error occurred while trying to add your goals. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
  })


/**
 * @author
 * @description Update preference
 * @route `/api/v1/profile/add-preference`
 * @access Private
 * @type PATCH
 **/
export const updateUserPreference = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
  
      const validationResult = ProfileValidator.updateUserPreference(req.body);
  

      if (validationResult.error) {
          return next(new AppError(validationResult.error.message, ResponseHelper.BAD_REQUEST));
      }
    
      const profile = await ProfileService.updateUserPreference(req.user?.id, req.body.preference)
  
      if(!profile){
        return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND))
      }
    
      // send success response
      ResponseHelper.sendSuccessResponse(res, {
          message: 'Added your preference successfully',
          statusCode: ResponseHelper.OK,
          data: profile,
      });
  
    } catch (error) {
      return next(new AppError("An error occurred while trying to add your preference. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Update user type
 * @route `/api/v1/profile/add-usertype`
 * @access Private
 * @type PATCH
 **/
export const updateUserType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
  
    //   const validationResult = ProfileValidator.updateUserType(req.body);
  

    //   if (validationResult.error) {
    //       return next(new AppError(validationResult.error.message, ResponseHelper.BAD_REQUEST));
    //   }
    
      const profile = await ProfileService.updateUserType(req.user?.id, req.body.userType)
  
      if(!profile){
        return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND))
      }
    
      // send success response
      ResponseHelper.sendSuccessResponse(res, {
          message: 'Added your userType successfully',
          statusCode: ResponseHelper.OK,
          data: profile,
      });
  
    } catch (error) {
      return next(new AppError("An error occurred while trying to add your preference. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})