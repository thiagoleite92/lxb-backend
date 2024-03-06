import { BrandProvider } from "../../database/providers/brand-provider";
import { GetAlLBrandsUseCase } from "../get-all-brands-use-case";

export const makeGetAllBrandsUseCase = () => {
  return new GetAlLBrandsUseCase(new BrandProvider());
};
