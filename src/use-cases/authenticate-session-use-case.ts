import { HashComparer } from "../cryptography/hash-comparer";
import { JwtEncrypter } from "../cryptography/jwt/jwt";
import { ResourceNotFoundError } from "../errors/ApiErrors";
import { UserRepository } from "../repositories/user-repository";
import { AuthenticateSessionSchema } from "../schemas";

export class AuthenticateSessionUseCase {
  constructor(
    private readonly userProvider: UserRepository,
    private readonly hashCompare: HashComparer,
    private readonly encrypter: JwtEncrypter
  ) {}

  async execute({ email, password }: AuthenticateSessionSchema) {
    const user = await this.userProvider.findByEmail(email);

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResourceNotFoundError("User not found");
    }

    const payload = {
      sub: user.id,
    };

    const token = await this.encrypter.sign(payload);

    return { token, user: { name: user.name, email: user.email, id: user.id } };
  }
}
