import { CatContract } from "./CatContract";

export type EditCatContract = Partial<Omit<CatContract, "id">>;
