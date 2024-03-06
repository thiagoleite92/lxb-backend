import { ColorProvider } from "../../database/providers/color-provider";
import { GetAlLColorsUseCase } from "../get-all-colors-use-case";

export const makeGetAllColorsUseCase = () => {
  return new GetAlLColorsUseCase(new ColorProvider());
};
