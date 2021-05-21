import "reflect-metadata";

import { container } from "tsyringe";

import UsersRepository from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository";
import IUsersTokensRepository from "../../modules/accounts/repositories/IUsersTokensRepository";
import CarsImageRepository from "../../modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import CarsRepository from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import ICarsImageRepository from "../../modules/cars/repositories/ICarsImageRespository";
import ICarsRepository from "../../modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import RentalsRepository from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";
import IMailProvider from "../providers/MailProvider/IMailProvider";
import EtherealMailProvider from "../providers/MailProvider/implementations/EtherealMailProvider";
import SESMailProvider from "../providers/MailProvider/implementations/SESMailProvider";
import LocalStorageProvider from "../providers/StorageProvider/implementations/LocalStorageProvider";
import S3StorageProvider from "../providers/StorageProvider/implementations/S3StorageProvider";
import IStorageProvider from "../providers/StorageProvider/IStorageProvider";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository",
    CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.mail]
);

const storageProvider = {
    local: container.resolve(LocalStorageProvider),
    s3: container.resolve(S3StorageProvider),
};

container.registerInstance<IStorageProvider>(
    "StorageProvider",
    storageProvider[process.env.disk]
);
