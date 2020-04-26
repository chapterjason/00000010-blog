import { ProcessEnvironment } from "@mscs/environment";
import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class HomeController {

    @Get("/")
    @Render("application/home/index.html.twig")
    public index() {
        const environment = new ProcessEnvironment();
        const PORT = environment.get("APP_PORT");
        return { host: "http://localhost:" + PORT };
    }

}
