import { Router } from "express";

import CreateRentalController from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import DevolutionRentalController from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import ListRentalsByUserController from "../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ensureAuthenticated } from "../middlawares/ensureAuthenticated";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.get("/", ensureAuthenticated, listRentalsByUserController.handle);
rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
    "/devolution/:rental_id",
    ensureAuthenticated,
    devolutionRentalController.handle
);

export { rentalRoutes };
