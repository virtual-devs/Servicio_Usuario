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
        const {email, password} = req.body;
        const userFound = await User.findOne({
            where:{
                email: email,
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

export const logout = async (req, res) => {
  try {

    const token = req.headers["token"];
    const logged = jwt.sign({token}, " ", {expiresIn: 1} )
    req.headers["token"] = logged
    return res.status(200).json("logged")
    
  } catch (error) {
    return res.status(500).json({ massage: error.massage });
  }
}

export const verifyTokenA = async (req, res) => {
    try {
      const token = req.headers["token"];
      const rol = "arrendador";
  
      if (!token) return res.status(403).json({ message: "No token provided" });
  
      const decoded = jwt.verify(token, SECRET_KEY);
  
      const user = await User.findOne({
          where:{
              id: decoded.id,
              rol: rol,
          }
      });
  
      if(!user) return res.status(404).json({message: 'User not found'});
  
      return res.status(200).json({massage: 'User Found'})
  
    } catch (error) {
      return res.status(401).json({ massage: "Unauthorized" });
    }
  };

  export const verifyTokenV = async (req, res) => {
    try {
      const token = req.headers["token"];
      const rol = "viajero";
  
      if (!token) return res.status(403).json({ message: "No token provided" });
  
      const decoded = jwt.verify(token, SECRET_KEY);
  
      const user = await User.findOne({
          where:{
              id: decoded.id,
              rol: rol,
          }
      });
  
      if(!user) return res.status(404).json({message: 'User not found'});
  
      return res.status(200).json({massage: 'User Found'})
  
    } catch (error) {
      return res.status(401).json({ massage: "Unauthorized" });
    }
  };