import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middelware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "coverImg",
      maxCount: 1,
    },
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),

  registerUser
);

export default router;
