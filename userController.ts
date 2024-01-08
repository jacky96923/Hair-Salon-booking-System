import express, { Request, Response } from "express";
import { checkPassword } from "./hash";
import { UserService } from "./userService";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      const {username, password} = req.body;
      if (!username) {
        return res.status(401).json({ error: "Missing Username" });
      }
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

      req.session["user"] = { id: user.id, username: user.username };

      return res.redirect("/");
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const {name, email, password, confirmPassword}  = req.body
      if (!name) {
        return res.status(401).json({ element: "name", error: "Missing Username" });
      }
      if (!email) {
        return res.status(401).json({ element: "email", error: "Missing Email" });
      }
      if (!password) {
        return res.status(401).json({ element: "password", error: "Missing Password" });
      }
      if (password != confirmPassword){
        return res.status(401).json({ element: "confirmPassword", error: "Password is not the same as Confirm Password" })
      }
      const hasUser = await this.userService.hasUser(email)
      console.log("result:", hasUser)
      if (hasUser){
        return res.status(401).json({ element: "email", error: "This email is being registered"})
      }
      const result = await this.userService.register(name, email, password)
      let user = result[0];
      console.log({ user });

      if (!req.session) {
        return res.status(412).json({ error: "Missing request session" });
      }

      // Add session user when login successfully
      req.session["user"] = { id: user.id, username: user.username };

      return res.status(200).json({success: "register success"});
    } catch(error) {
      res.status(500);
      return res.json({ error: String(error) });
    }
  }
}
