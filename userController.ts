import { Request, Response } from "express";
import { checkPassword } from "./hash";
import { UserService } from "./userService";
import { log } from "console";

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

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      if (!name) {
        return res
          .status(401)
          .json({ element: "name", error: "Missing Username" });
      }
      if (!email) {
        return res
          .status(401)
          .json({ element: "email", error: "Missing Email" });
      }
      if (!password) {
        return res
          .status(401)
          .json({ element: "password", error: "Missing Password" });
      }
      if (password != confirmPassword) {
        return res.status(401).json({
          element: "confirmPassword",
          error: "Password is not the same as Confirm Password",
        });
      }
      const hasUser = await this.userService.hasUser(email);
      console.log("result:", hasUser);
      if (hasUser) {
        return res
          .status(401)
          .json({ element: "email", error: "This email is being registered" });
      }
      const result = await this.userService.register(name, email, password);
      let user = result[0];
      console.log({ user });

      if (!req.session) {
        return res.status(412).json({ error: "Missing request session" });
      }

      // Add session user when login successfully
      req.session["user"] = { id: user.id, email: user.email };

      return res.status(200).json({ success: "register success" });
    } catch (error) {
      res.status(500);
      return res.json({ error: String(error) });
    }
  };

  booking_request = async (req: Request, res: Response) => {
    try {
      const { category, date, timeSlots, remarks } = req.body;
      console.log("req.body123", req.body);
      if (!category) {
        return res
          .status(401)
          .json({ element: "date", error: "Missing category" });
      }
      if (!date) {
        return res.status(401).json({ element: "date", error: "Missing date" });
      }
      if (!timeSlots) {
        return res
          .status(401)
          .json({ element: "date", error: "Missing timeslots" });
      }

      const datetime = date + timeSlots;
      console.log("datetime", datetime);

      const result = await this.userService.booking_request(
        category,
        datetime,
        remarks
      );
      console.log(result);

      return res.status(200).json({ success: "register success" });
    } catch (error) {
      res.status(500);
      return res.json({ error: String(error) });
    }
  };
}
