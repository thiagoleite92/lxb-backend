import { sign } from "jsonwebtoken";

import { Encrypter } from "../encrypter";
import { env } from "../../env";

export class JwtEncrypter implements Encrypter {
  private TWENTY_FOUR_HOURS? = 24 * 60 * 60 * 1000;

  async sign(payload: Record<string, unknown>) {
    const token = sign({ payload }, env.JWT_SECRET, {
      expiresIn: this.TWENTY_FOUR_HOURS,
    });

    return token;
  }
}
