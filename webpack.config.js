const Encore = require("@symfony/webpack-encore");
const path = require("path");

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore
    .setOutputPath("public/build/")
    .setPublicPath("/build")

    .addEntry("application", "./assets/js/Application.tsx")

    .enableSingleRuntimeChunk()
    .splitEntryChunks()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableIntegrityHashes(Encore.isProduction())

    .enableTypeScriptLoader(function (tsConfig) {
        tsConfig.configFile = path.join(__dirname, "tsconfig.frontend.json");
    })
    .enableSassLoader()
    .enableReactPreset()

    .configureBabel(() => {
    }, {
        useBuiltIns: "usage",
        corejs: 3,
    })
;

/*
if (Encore.isDevServer()) {
    Encore.disableCssExtraction();
} else {
    Encore.setManifestKeyPrefix("build/");
}
 */

module.exports = Encore.getWebpackConfig();
