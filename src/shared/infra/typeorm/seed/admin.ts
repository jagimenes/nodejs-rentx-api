import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../database";

async function create() {
    const connection = await createConnection();
    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
            values ('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, '1234', now() )
        
        `
    );

    await connection.close();
}

create().then(() => console.log("Admin user created."));
