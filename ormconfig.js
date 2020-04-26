const { EnvironmentLoader, ProcessEnvironment } = require("@mscs/environment");

const UrlExpression = /^(\w+):\/\/(\w+):(\w+)@(\w+):(\d+)\/(\w+)$/m;

// eslint-disable-next-line no-async-promise-executor
module.exports = new Promise(async function (resolve) {
    const environment = new ProcessEnvironment();
    const environmentLoader = new EnvironmentLoader(environment);

    await environmentLoader.loadEnvironment(".env");

    const DATABASE_URL = environment.get("DATABASE_URL");
    const match = UrlExpression.exec(DATABASE_URL);

    if (!match) {
        throw new Error("Invalid DATABASE_URL");
    }

    const [driver, username, password, host, port, database] = match.slice(1);

    resolve({
        "type": driver,
        "host": host,
        "port": port,
        "username": username,
        "password": password,
        "database": database,
        "synchronize": false,
        "logging": false,
        "entities": [
            "src/Modules/Application/Entities/**/*.ts",
        ],
        "migrations": [
            "src/Modules/Application/Migrations/**/*.ts",
        ],
        "subscribers": [
            "src/Modules/Application/Subscribers/**/*.ts",
        ],
        "cli": {
            "entitiesDir": "src/Modules/Application/Entities",
            "migrationsDir": "src/Modules/Application/Migrations",
            "subscribersDir": "src/Modules/Application/Subscribers",
        },
    });
});
