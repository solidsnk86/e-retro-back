import { compare, hash } from "bcrypt";
import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USERS,
  GET_USER_BY_EMAIL,
  GET_USER_BY_ID,
  UPDATE_USER,
} from "./constants.js";
import { createAccessToken } from "../lib/jwt.js";
import md5 from "md5"

export class UserController {
  cookieExpiration = 60 * 60 * 24 * 1000;

  constructor({ authDb }) {
    this.authDb = authDb;
  }

  getFirstRow = (result) => result?.rows?.[0] || result[0];

  getAllUsers = async (req, res) => {
    try {
      const result = await this.authDb.query(GET_ALL_USERS);
      const users = result?.rows || result;
      return res.status(200).json({ users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener usuarios: " + error.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.authDb.query(GET_USER_BY_ID, [id]);
      const user = this.getFirstRow(result);

      if (!user)
        return res.status(404).json({ message: "Usuario inexistente", id });

      return res.status(200).json({ message: "Usuario encontrado", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor: " + error.message });
    }
  };

  userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: "Campos vacíos" });

      const userExist = await this.authDb.query(GET_USER_BY_EMAIL, [email]);
      const user = this.getFirstRow(userExist);

      if (!user)
        return res
          .status(404)
          .json({ message: "El correo electrónico no está registrado", email });

      const validated = await compare(password, user.user_password);
      if (!validated)
        return res.status(403).json({ message: "La contraseña es incorrecta" });

      const token = await createAccessToken({ id: user.user_id });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: this.cookieExpiration,
      });

      return res
        .status(200)
        .json({ message: "Ingreso exitoso", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el login del usuario: " + error.message });
    }
  };

  userLogout = async (req, res) => {
    try {
      const id = req.userId;
      const result = await this.authDb.query(GET_USER_BY_ID, [id])
      const user = this.getFirstRow(result)
      res.clearCookie("token");
      return res.status(200).json({ message: "Sesión cerrada correctamente", user: user });
    } catch (error) {
      return res.status(500).json({ message: "Error en logout: " + error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({ message: "Campos vacíos" });

      const userExist = await this.authDb.query(GET_USER_BY_EMAIL, [email]);
      const userFound = this.getFirstRow(userExist);

      if (userFound)
        return res
          .status(409)
          .json({ message: `El correo ${email} ya está registrado.` });

      const hashedPassword = await hash(password, 10);
      const gravatar = `https://gravatar.com/avatar/${md5(email)}`
      
      const result = await this.authDb.query(CREATE_USER, [
        name,
        email,
        hashedPassword,
        gravatar
      ]);

      const newUser = this.getFirstRow(result);
      const token = await createAccessToken({ id: newUser.user_id });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: this.cookieExpiration,
      });

      return res
        .status(201)
        .json({ message: "Usuario creado correctamente", user: newUser });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(409).json({ message: "El correo ya está registrado." });
      }
      return res
        .status(500)
        .json({ message: "Error al crear usuario: " + error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.userId
      const { name, email, avatar } = req.body;

      if (!name || !email)
        return res.status(400).json({ message: "Campos vacíos" });
      const result = await this.authDb.query(GET_USER_BY_ID, [id]);

      const user = this.getFirstRow(result);

      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });

      const updated = await this.authDb.query(UPDATE_USER, [
        id,
        name,
        email,
        user.user_password,
        true,
        new Date().toISOString(),
        avatar
      ]);

      const updatedUser = this.getFirstRow(updated);

      return res
        .status(200)
        .json({ message: "Usuario actualizado", user: updatedUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al actualizar usuario: " + error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const id = req.userId
      const result = await this.authDb.query(DELETE_USER, [id]);
      const deleted = this.getFirstRow(result);

      if (!deleted) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.clearCookie()
      return res.status(200).json({ message: "Usuario eliminado", user: deleted });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al borrar usuario: " + error.message });
    }
  };

  userProfile = async (req, res) => {
    try {
      const { userId } = req;
      const result = await this.authDb.query(GET_USER_BY_ID, [userId]);
      const user = this.getFirstRow(result);

      if (!user)
        return res.status(404).json({ message: "Usuario inexistente" });

      return res.status(200).json({ message: "Perfil del usuario", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener el perfil: " + error.message });
    }
  };
}