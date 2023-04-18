import UserDao from "./UserDAO.js";
import VideogamesDao from "./VideogamesDAO.js";

export const userService = new UserDao();
export const videogamesService = new VideogamesDao();