import express, { Request, Response } from "express";
import { checkPassword } from "./hash";
import { UserService } from "./userService";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      const username = req.body.username;
      if (!username) {
        return res.status(401).json({ error: "Missing username" });
      }
      const password = req.body.password;
      if (!password) {
        return res.status(401).json({ error: "Missing Password" });
      }

      const result = await this.userService.login(username, password);

      let user = result[0];
      console.log({ user });
      const match = await checkPassword({
        plainPassword: password,
        hashedPassword: user.password,
      });

      if (!match) {
        return res.status(401).json({ error: "Wrong Username/Password" });
      }
      if (!req.session) {
        return res.status(412).json({ error: "Missing request session" });
      }

      req.session.user = { id: user.id, username: user.username };

      return res.redirect("/");
    } catch (error) {
      res.status(500);
      res.json({ error: "Wrong Username/Password" });
    }
  };
}
