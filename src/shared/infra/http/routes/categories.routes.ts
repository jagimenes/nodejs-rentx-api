import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../../../../modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "../middlawares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer(uploadConfig);

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    createCategoryController.handle
);
categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
    "/import",
    ensureAuthenticated,
    upload.single("file"),
    async (request, response) => {
        return importCategoriesController.handle(request, response);
    }
);

export { categoriesRoutes };
