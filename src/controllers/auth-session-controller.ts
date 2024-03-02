// import { Request, Response } from "express";
// import { authSessionSchema } from "../schemas";
// import { UserRegisterUseCase } from "../use-cases/user-register-use-case";
// import { UserProvider } from "../database/providers/user-provider";

// export const authSessionController = async (req: Request, res: Response) => {
//   const user = authSessionSchema.parse(req?.body);

//   const authSessionUseCase = new UserRegisterUseCase(new UserProvider());

//   await registerUserUseCase.execute(user);

//   return res.status(201).json({ message: "User created" });
// };
