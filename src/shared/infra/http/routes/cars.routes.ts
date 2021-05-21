import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import CreateCarController from "../../../../modules/cars/useCases/createCar/CreateCarController";
import CreateCarSpecificatonController from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import ListAvaibleCarsController from "../../../../modules/cars/useCases/listAvaibleCars/ListAvaibleCarsController";
import UploadCarImageController from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middlawares/ensureAdmin";
import { ensureAuthenticated } from "../middlawares/ensureAuthenticated";

const carRoutes = Router();
const createCarController = new CreateCarController();
const listAvaibleCarsController = new ListAvaibleCarsController();
const createCarSpecificatonController = new CreateCarSpecificatonController();
const uploadCarImageController = new UploadCarImageController();

const uploadImages = multer(uploadConfig);

carRoutes.get("/avaible", listAvaibleCarsController.handle);
carRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);
carRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificatonController.handle
);
carRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    uploadImages.array("images"),
    uploadCarImageController.handle
);

export { carRoutes };
