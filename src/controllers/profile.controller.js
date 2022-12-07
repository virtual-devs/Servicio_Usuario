import { Profile } from "../models/Profile.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Profile.findAll();
    res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ massage: error.massage });
  }
};

export const getUsuarioOne = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Profile.findOne({
      where: {
        idUsuario: id,
      },
    });
    res.json(usuario);
  } catch (error) {
    return res.status(500).json({ massage: error.massage });
  }
};

export const createPerfil = async (req, res) => {
  try {
    const { idUsuario, nombre, telefono, direccion } = req.body;

    const newProfile = await Profile.create({
      idUsuario,
      nombre,
      telefono,
      direccion,
    });

    res.json(newProfile);
  } catch (error) {
    return res.status(500).json({ massage: error.massage });
  }
};

export const updatePerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { telefono, direccion } = req.body;

    const usuario = await Profile.findOne({
      where: {
        idUsuario: id,
      },
    });

    if (usuario != null) {
      usuario.telefono = telefono;
      usuario.direccion = direccion;
      await usuario.save();
      return res.json(usuario);
    }

    return res.status(404).json({message: 'Not found'})
   
    
  } catch (error) {
    return res.status(500).json({ massage: error.massage });
  }
};

export const deletePerfil = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    await Profile.destroy({
      where: {
        idUsuario,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ massage: error.massage });
  }
};
