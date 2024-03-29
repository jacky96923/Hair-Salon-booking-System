"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const hash_1 = require("./hash");
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    login = async (req, res) => {
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
            const match = await (0, hash_1.checkPassword)({
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
        }
        catch (error) {
            res.status(500);
            res.json({ error: "Wrong Username/Password" });
            return;
        }
    };
    register = async (req, res) => {
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
        }
        catch (error) {
            res.status(500);
            return res.json({ error: String(error) });
        }
    };
    getUsername = async (req, res, next) => {
        try {
            const user_id = req.session.user?.id;
            const result = await this.userService.getUsername(user_id);
            //console.log(result)
            console.log(result[0]);
            return res.json(result[0]);
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    };
    booking_timeslot = async (req, res) => {
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
            let rosterBooking = [];
            if (category === "Haircut Wash Style") {
                for (let time of roster) {
                    let dateTime = date + " " + time;
                    // console.log("datetime:", dateTime);
                    const { man_count, c_count, p_count } = (await this.userService.booking_timeslot(category, dateTime))[0];
                    if (man_count === c_count || p_count > 2) {
                        rosterBooking[roster.indexOf(time)] = {
                            bookingTime: time,
                            bookingStatus: false,
                        };
                    }
                    else {
                        rosterBooking[roster.indexOf(time)] = {
                            bookingTime: time,
                            bookingStatus: true,
                        };
                    }
                }
                console.log("rosterBooking:", rosterBooking);
                res.json({
                    category: category,
                    bookingDate: date,
                    rosterBooking: rosterBooking,
                });
            }
            else if (category === "Style Perming") {
                let pRosterData = [];
                for (let time of roster) {
                    let dateTime = date + " " + time;
                    //console.log("datetime:", dateTime);
                    const { man_count, c_count, p_count } = (await this.userService.booking_timeslot(category, dateTime))[0];
                    pRosterData.push({ man_count, c_count, p_count });
                }
                //console.log("pRosterData: ", pRosterData)
                let pRoster = roster.slice(0, roster.length - 2);
                //console.log(pRoster)
                for (let time of pRoster) {
                    for (let i = 0; i <= 2; i++) {
                        if ((pRosterData[i].man_count - pRosterData[i].c_count) * 4 +
                            pRosterData[i].c_count * 2 >
                            pRosterData[i].p_count) {
                            rosterBooking[pRoster.indexOf(time)] = {
                                bookingTime: time,
                                bookingStatus: true,
                            };
                        }
                        else {
                            rosterBooking[pRoster.indexOf(time)] = {
                                bookingTime: time,
                                bookingStatus: false,
                            };
                        }
                    }
                }
                // console.log("rosterBooking:", rosterBooking);
                res.json({
                    category: category,
                    bookingDate: date,
                    rosterBooking: rosterBooking,
                });
            }
        }
        catch (error) {
            // console.log("Error =====", error);
            res.status(500);
            res.json({ error: String(error) });
        }
    };
    booking_request = async (req, res) => {
        try {
            const { category, date, timeSlots, remarks } = req.body;
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
            const result = await this.userService.booking_request(user_id, category, datetime, remarks);
            console.log(result);
            return res.status(200).json({ success: "register success" });
        }
        catch (error) {
            res.status(500);
            return res.json({ error: String(error) });
        }
    };
    getGenPhoto = async (req, res) => {
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
            const result = await this.userService.getGenPhoto(user_id);
            console.log("result: ", result);
            return res.status(200).json(result);
        }
        catch (error) {
            res.status(500);
            return res.json({ error: String(error) });
        }
    };
    removeGenPhoto = async (req, res) => {
        try {
            const user_id = req.session.user?.id;
            const result = await this.userService.removeGenPhoto(user_id);
            return res.status(200).json(result);
        }
        catch (error) {
            res.status(500);
            return res.json({ error: String(error) });
        }
    };
}
exports.UserController = UserController;
