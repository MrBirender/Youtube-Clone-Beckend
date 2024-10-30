import { asyncHandler } from "../utils/asycnHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/Cloudinary.js";	
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req, res)=> {
// steps to register the user:
//1. get the data from the request body
//2. perform validation, is there any empty field
//3. check if the user already exists
//4. check for the coverImg and avatar
//5.upload them to cloudinary
//6. create user obj and save it to the database
// REMOVE THE PASSWORD AND REFRESH TOKEN FIELD FROM THE RESPONSE
// CHECK FOR USER CREATION 
// RETURN RESPONSE
 
// STEP1 EXTRACTING DATA FROM REQUEST .  BODY
const {userName, email, fullName, password, coverImg, avatar} = req.body

// step2 Validation
if(!userName || !email || !fullName || !password) {
    throw new ApiError(400, 'All fields are required')
}

// step3 check if user already exists
const existedUser = User.findOne({
    $or: [{ userName }, { email }]
})

if(existedUser){
    throw new ApiError(409, 'User with email or userName already exists')
}
})

// getting file path from multer
// multer extends the request to provide more options like req.files

const avatarLocalPath = req.files?.avatar[0]?.path
const coverImgLocalPath = req.files?.coverImg[0]?.path;

//cheking if avatar is available or not

if(!avatarLocalPath) {
    throw new ApiError(400, 'Please select an avatar')
}

const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImg = await uploadOnCloudinary(coverImgLocalPath);

if(!avatar){
    throw new ApiError(400, 'Something went wrong while uploading avatar')
} 

// entering data base with user

const user = await User.create({
    fullName,
    email,
    avatar: avatar.url,
    coverImg : coverImg?.url || '',
    password: password,
    userName : userName.toLowerCase()

})

// cheking if user is created or not:

const createdUser = await User.findById(user._id).select("-password -refreshToken");

if(!createdUser){
    throw new ApiError(500, 'Something went wrong while creating user')
}

res.status(201).json(
    new ApiResponse(200, createdUser, 'User created successfully')
);

export {registerUser}