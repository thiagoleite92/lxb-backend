import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Encrypter } from "../encrypter";
import { env } from "../../env";
import { UserRepository } from "../../repositories/user-repository";
import { BadRequestError } from "../../errors/ApiErrors";
import { ExpressUser } from "../../@types";

export class JwtEncrypter implements Encrypter {
  private TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

  private JWT_SECRET = env.JWT_SECRET;

  constructor(private readonly userProvider: UserRepository) {}

  private verifyToken(token: string): JwtPayload {
    return verify(token, this.JWT_SECRET) as JwtPayload;
  }

  async sign(payload: Record<string, unknown>) {
    const token = sign({ payload }, this.JWT_SECRET, {
      expiresIn: this.TWENTY_FOUR_HOURS,
    });

    return token;
  }

  async decode(token: string): Promise<ExpressUser> {
    const {
      payload: { sub },
    } = this.verifyToken(token);

    const user = await this.userProvider.findById(sub);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    return {
      name: user?.name,
      userId: user?.id,
    };
  }
}
