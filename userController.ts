import { Request, Response } from "express";
import { checkPassword } from "./hash";
import { UserService } from "./userService";

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

  booking_timeslot = async (req: Request, res: Response) => {
    try {
      const {category, date} = req.body
      let roster = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]
      let rosterBooking: {bookingTime: string, bookingStatus: boolean}[] = []
      if (category === "Haircut Wash Style"){
        for (let time of roster){
          let dateTime = date + time
          console.log("datetime:", dateTime)
          const {man_count, c_count} = (await this.userService.booking_timeslot(category, dateTime) as any[])[0]
          if (man_count === c_count){
          rosterBooking[roster.indexOf(time)]={bookingTime: time, bookingStatus: false}
        } else {
          rosterBooking[roster.indexOf(time)]={bookingTime: time, bookingStatus: true}          
        }
      }
      console.log("rosterBooking:", rosterBooking)
      res.json({category: category, bookingDate: date, rosterBooking: rosterBooking})
    } else if (category === "Style Perming"){
      for (let time of roster){
        let dateTime = date + time
        console.log("datetime:", dateTime)
        const {man_count, c_count, p_count} = (await this.userService.booking_timeslot(category, dateTime) as any[])[0]
        if ((man_count-c_count)*4 + c_count*2 > p_count){
          rosterBooking[roster.indexOf(time)]={bookingTime: time, bookingStatus: true}
        } else {
          rosterBooking[roster.indexOf(time)]={bookingTime: time, bookingStatus: false}          
        }
      }
      console.log("rosterBooking:", rosterBooking)
      res.json({category: category, bookingDate: date, rosterBooking: rosterBooking})
      } 
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
  }
  
  booking_request = async (req: Request, res: Response) => {
    try {
      const { category, date, timeSlots } = req.body;
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

      const dateErd = req.body.date;
      const timeSlotsErd = req.body.timeSlots;
      const datetime = dateErd + timeSlotsErd;
      console.log("datetime", datetime);

      return res.status(200).json({ success: "register success" });
    } catch (error) {
      res.status(500);
      return res.json({ error: String(error) });
    }
  };
}
