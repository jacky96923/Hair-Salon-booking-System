import { NextFunction, Request, Response } from "express";
import { checkPassword } from "../hash";
import { UserService } from "../service/userService";

export class UserController {
  constructor(private userService: UserService) {}

  checkLogin = async (req: Request, res: Response) => {
    try {
      if (req.session.user){
        return res.json({msg: "Logged in already"})
      } else {
        return res.json({warning: "Not logged in yet"})
      }
    } catch (error) {
      console.log("checkLogin error")
      return 
    }
  }

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
      // console.log({ user });
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
      // console.log("result:", hasUser);
      if (hasUser) {
        return res
          .status(401)
          .json({ element: "email", error: "This email is being registered" });
      }
      const result = await this.userService.register(name, email, password);
      let user = result[0];
      // console.log({ user });

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

  logout = async (req: Request, res: Response) => {
    try {
      if (req.session.user) {
        delete req.session.user;
        console.log("user session deleted");
      }

      return res.redirect("/");
    } catch (error) {
      res.status(500);
      return res.json({ error: error });
    }
  };
  getUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.session.user?.id;
      const result = await this.userService.getUsername(user_id as number);
      //console.log(result)
      console.log((result as { name: string }[])[0]);
      return res.json((result as { name: string }[])[0]);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  };
  booking_timeslot = async (req: Request, res: Response) => {
    try {
      const { category, date } = req.body;
      // console.log(category, date);
      let roster = [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
      ];
      let rosterBooking: { bookingTime: string; bookingStatus: boolean }[] = [];
      if (category === "Haircut Wash Style") {
        for (let time of roster) {
          let dateTime = date + " " + time;
          // console.log("datetime:", dateTime);
          const { man_count, c_count, p_count } = (
            (await this.userService.booking_timeslot(dateTime)) as any[]
          )[0];
          console.log({ man_count, c_count, p_count });
          if (man_count === c_count) {
            rosterBooking[roster.indexOf(time)] = {
              bookingTime: time,
              bookingStatus: false,
            };
          } else if (p_count > 2) {
            rosterBooking[roster.indexOf(time)] = {
              bookingTime: time,
              bookingStatus: false,
            };
          } else {
            rosterBooking[roster.indexOf(time)] = {
              bookingTime: time,
              bookingStatus: true,
            };
          }
          console.log("add roster:", time, rosterBooking);
        }
        console.log("rosterBooking:", rosterBooking);
        res.json({
          category: category,
          bookingDate: date,
          rosterBooking: rosterBooking,
        });
      } else if (category === "Style Perming") {
        let pRosterData: {
          man_count: number;
          c_count: number;
          p_count: number;
        }[] = [];
        for (let time of roster) {
          let dateTime = date + " " + time;
          console.log("datetime:", dateTime);
          const { man_count, c_count, p_count } = (
            (await this.userService.booking_timeslot(dateTime)) as any[]
          )[0];
          pRosterData.push({ man_count, c_count, p_count });
        }
        console.log("pRosterData: ", pRosterData);
        let pRoster = roster.slice(0, roster.length - 2);
        console.log(pRoster);
        for (let time of pRoster) {
          // for (let i = 0; i <= 2; i++) {
          let i = pRoster.indexOf(time);
          let availablePerm =
            (pRosterData[i].man_count - pRosterData[i].c_count) * 4 +
              pRosterData[i].c_count * 2 >
            pRosterData[i].p_count;
          console.log("available Perm:", availablePerm);
          if (availablePerm) {
            rosterBooking[pRoster.indexOf(time)] = {
              bookingTime: time,
              bookingStatus: true,
            };
          } else {
            rosterBooking[pRoster.indexOf(time)] = {
              bookingTime: time,
              bookingStatus: false,
            };
          }
          // }
          console.log("add roster:", time, rosterBooking);
        }
        console.log("rosterBooking:", rosterBooking);
        res.json({
          category: category,
          bookingDate: date,
          rosterBooking: rosterBooking,
        });
      }
    } catch (error) {
      // console.log("Error =====", error);
      res.status(500);
      res.json({ error: String(error) });
    }
  };

  booking_request = async (req: Request, res: Response) => {
    try {
      const { category, date, timeSlots, remarks, image_id } = req.body;
      console.log("req.body123", req.body);
      let user_id = req.session.user?.id;
      console.log("sessionID: ", req.session.user?.id);
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

      const datetime = date + " " + timeSlots;
      console.log("datetime", datetime);

      if (image_id) {
        let imageId = Number(image_id);
        const result = await this.userService.booking_request(
          user_id as number,
          category,
          datetime,
          remarks,
          imageId
        );
        console.log(result);
        return res.status(200).json({ success: "register success" });
      } else {
        const result = await this.userService.booking_request(
          user_id as number,
          category,
          datetime,
          remarks
        );
        console.log(result);
        return res.status(200).json({ success: "register success" });
      }
    } catch (error) {
      res.status(500);
      return res.json({ error: String(error) });
    }
  };

  getStyleImg = async (req: Request, res: Response) => {
    try {
      const photo_id = Number(req.query.id);
      console.log(photo_id);
      const result = await this.userService.getStyleImg(photo_id as number);
      return res.json(result);
    } catch (error) {
      res.status(500);
      return res.json({ error: String(error) });
    }
  };

  getGenPhoto = async (req: Request, res: Response) => {
    try {
      // const { filename, user_id } = req.body;
      // if (!filename) {
      //   return res
      //     .status(401)
      //     .json({ element: filename, error: "Missing file" });
      // }

      // if (!user_id) {
      //   return res
      //     .status(401)
      //     .json({ element: user_id, error: "Missing user_id" });
      // }
      const user_id = req.session.user?.id;
      console.log("user_id", user_id);
      const result = await this.userService.getGenPhoto(user_id as number);
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500);
      return res.json({ error: String(error) });
    }
  };

  removeGenPhoto = async (req: Request, res: Response) => {
    try {
      // const user_id = req.session.user?.id;
      const photo_id = req.body.photo_id;
      console.log(photo_id);
      const result = await this.userService.removeGenPhoto(photo_id as number);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500);
      return res.json({ error: String(error) });
    }
  };
}
