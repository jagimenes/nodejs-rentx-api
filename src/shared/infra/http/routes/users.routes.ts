import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import CreateUserContrller from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "../../../../modules/accounts/useCases/listUsers/ListUsersController";
import ShowUserProfileController from "../../../../modules/accounts/useCases/showUserProfile/ShowUserProfileController";
import UpdateUserAvatarController from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAdmin } from "../middlawares/ensureAdmin";
import { ensureAuthenticated } from "../middlawares/ensureAuthenticated";

const userRoutes = Router();

const createUserContrller = new CreateUserContrller();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showUserProfileController = new ShowUserProfileController();

const uploadAvatar = multer(uploadConfig);

userRoutes.get(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    listUsersController.handle
);

userRoutes.post("/", ensureAuthenticated, createUserContrller.handle);

userRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("file"),
    updateUserAvatarController.handle
);

userRoutes.get(
    "/profile",
    ensureAuthenticated,
    showUserProfileController.handle
);

export { userRoutes };
