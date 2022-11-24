import { User } from "../models/User.js";
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config.js";
import { encryptPassword, comparePassword } from "../models/User.js";


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

export const signIn = async (req, res) => {
    try {
        const {email, password, rol } = req.body;
        const userFound = await User.findOne({
            where:{
                email: email,
                rol: rol
            }
        });

        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})
        
        const matchPassword = await comparePassword(password, userFound.password);
        
        if(!matchPassword) return res.status(401).json({message: "Contraseña incorrecta"})
        
        const token = jwt.sign({id: userFound.id}, SECRET_KEY, {expiresIn: 86400})
        userFound.dataValues.token = token;
        res.json(userFound.dataValues)

    } catch (error) {
        return res.status(500).json({ massage: error.massage });
    }
};
