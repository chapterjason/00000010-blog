import { CatContract } from "./CatContract";

export type CreateCatContract = Omit<CatContract, "id">;
