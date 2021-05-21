import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm/database";

let connection: Connection;

describe("List categories controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuidv4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
            values ('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, '1234', now() )
        
        `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const responseCategory = await request(app)
            .post("/categories")
            .send({
                name: "SUV",
                description: "Categoria SUV",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app)
            .get("/categories")
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(200);
        expect(JSON.stringify(response.body).length).toBeGreaterThan(0);
    });
});
