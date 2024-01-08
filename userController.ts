import express, { Request, Response } from "express";
import { checkPassword } from "./hash";
import { UserService } from "./userService";
import { Console } from "console";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      if (!email) {
        return res.status(401).json({ error: "Missing Email" });
      }
      const password = req.body.password;
      if (!password) {
        return res.status(401).json({ error: "Missing Password" });
      }

      const result = await this.userService.login(email, password);
      let user = result[0];
      console.log({ user });
      const match = await checkPassword({
        plainPassword: password,
        hashedPassword: user.password,
      });
      console.log(match);

      if (!match) {
        return res.status(401).json({ error: "Wrong Email/Password" });
      }
      if (!req.session) {
        return res.status(412).json({ error: "Missing request session" });
      }

      req.session["user"] = { id: user.id, email: user.email };

      return res.json({ message: "login success" });
    } catch (error) {
      res.status(500);

      res.json({ error: "Wrong Username/Password" });
      return;
    }
  };
}
