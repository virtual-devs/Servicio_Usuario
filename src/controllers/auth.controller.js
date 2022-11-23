import { User } from "../models/User.js";
import { encryptPassword } from "../models/User.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, rol } = req.body;

    const existe = await User.findOne({
      where: {
        email: email,
      },
    });

    if(existe == null)
    {
        const newUser = await User.create({
            username,
            email,
            password:await encryptPassword(password),
            rol,
        });

        res.json(newUser);
    } 
    else{ res.json("Usuario ya existente")}

    
  } catch (error) {
    return res.status(500).json({ massage: error.massage });
  }
};

export const signIn = async (req, res) => {};
