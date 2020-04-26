import * as fs from "fs";
import * as path from "path";
import * as Twig from "twig";
import { EntrypointData } from "./EntrypointData";
import { ManifestData } from "./ManifestData";

export class EntryFilesTwigExtension {

    protected entrypoints: EntrypointData;

    protected manifest: ManifestData;

    protected directory: string;

    public constructor(directory: string) {
        this.directory = directory;
    }

    public register() {
        Twig.extendFunction("encore_entry_link_tags", (name: string) => this.encoreEntryLinkTags(name));
        Twig.extendFunction("encore_entry_script_tags", (name: string) => this.encoreEntryScriptTags(name));
    }

    public getEntrypoints() {
        if (!this.entrypoints) {
            this.entrypoints = JSON.parse(fs.readFileSync(path.join(this.directory, "entrypoints.json")).toString());
        }

        return this.entrypoints;
    }

    public getManifest() {
        if (!this.manifest) {
            this.manifest = JSON.parse(fs.readFileSync(path.join(this.directory, "manifest.json")).toString());
        }

        return this.manifest;
    }

    public getIntegrities() {
        return this.getEntrypoints().integrity;
    }

    public getEntrypoint(name: string) {
        const { entrypoints } = this.getEntrypoints();

        if (!(name in entrypoints)) {
            throw new Error(`Missing entrypoint "${name}".`);
        }

        return entrypoints[name];
    }

    public getIntegrity(name: string): string | null {
        const integrities = this.getIntegrities();
        if (!integrities) {
            return null;
        }

        return integrities[name] ?? null;
    }

    public getRealFile(file: string): string {
        const manifest = this.getManifest();

        for (const value of Object.values(manifest)) {
            if (value === file) {
                return value;
            }
        }

        throw new Error(`Could not get real file path for file "${file}".`);
    }

    public encoreEntryLinkTags(name: string): string {
        const files = this.getEntrypoint(name).css ?? [];

        const results: string[] = [];

        for (const file of files) {
            const integrity = this.getIntegrity(file);
            const params: { [key: string]: string } = {};

            params.rel = "stylesheet";
            params.href = this.getRealFile(file);
            if (integrity) {
                params.integrity = integrity;
            }
            params.crossorigin = "anonymous";

            const paramsArray = Object.keys(params).map((property: string) => `${property}="${params[property]}"`);
            results.push(`<link ${paramsArray.join(" ")}/>`);
        }

        return results.join("");
    }

    public encoreEntryScriptTags(name: string): string {
        const files = this.getEntrypoint(name).js ?? [];

        const results: string[] = [];

        for (const file of files) {
            const integrity = this.getIntegrity(file);
            const params: { [key: string]: string } = {};

            params.src = this.getRealFile(file);
            if (integrity) {
                params.integrity = integrity;
            }
            params.crossorigin = "anonymous";

            const paramsArray = Object.keys(params).map((property: string) => `${property}="${params[property]}"`);
            results.push(`<script ${paramsArray.join(" ")}></script>`);
        }

        return results.join("");
    }

}
