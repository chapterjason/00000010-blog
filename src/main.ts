import { EnvironmentLoader, ProcessEnvironment } from "@mscs/environment";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as path from "path";
import { EntryFilesTwigExtension } from "./Components/Twig/EntryFilesTwigExtension";
import { ApplicationModule } from "./Modules/Application/ApplicationModule";

const DEFAULT_PORT = 3000;

async function bootstrap() {
    const environment = new ProcessEnvironment();
    const environmentLoader = new EnvironmentLoader(environment);
    const application = await NestFactory.create<NestExpressApplication>(ApplicationModule);

    await environmentLoader.loadEnvironment(path.join(__dirname, "..", ".env"));

    const PORT = environment.has("APP_PORT") ? environment.get("APP_PORT") : DEFAULT_PORT;
    environment.set("APP_PORT", PORT.toString());

    application.useStaticAssets(path.join(__dirname, "..", "public"));
    application.setBaseViewsDir(path.join(__dirname, "..", "templates"));
    application.setViewEngine("twig");

    const twigExtension = new EntryFilesTwigExtension(path.join(__dirname, "..", "public", "build"));
    twigExtension.register();

    await application.listen(PORT);
}

bootstrap()
    .catch(error => {
        console.log(error);
        process.exit(1);
    });
