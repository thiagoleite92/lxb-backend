import { env } from "../env";
import { HashComparer } from "./hash-comparer";
import { HashGenerator } from "./hash-generator";
import { hash, compare } from "bcryptjs";

export class BcrypterHasher implements HashGenerator, HashComparer {
  private HASH_SALT_ROUNDS = env.SALT;

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_ROUNDS);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
