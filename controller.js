// materialController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleErrors = (res, error) => {
    console.error(error);
  
    let errorMessage = 'Internal Server Error';
    let statusCode = 500;
  
    if (error.code === 'P2025') {
      errorMessage = 'Invalid UUID format';
      statusCode = 400;
    } else if (error.code === 'P2002') {
      errorMessage = 'Duplicate entry, unique constraint violated';
      statusCode = 409; // Conflict
    } else if (error.code === 'P2022') {
      errorMessage = 'Invalid data format';
      statusCode = 400;
    } else if (error.code === 'P2023') {
        errorMessage = 'Invalid UUID format';
        statusCode = 400;
    }
    res.status(statusCode).json({ error: errorMessage });
  };

const getAllMaterials = async (req, res) => {
  try {
    const materials = await prisma.material.findMany();
    res.json(materials);
  } catch (error) {
    handleErrors(res, error);
  }
};

const getMaterialById = async (req, res) => {
  const { id } = req.params;
  try {
    const material = await prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      res.status(404).json({ error: 'Material not found' });
      return;
    }

    res.json(material);
  } catch (error) {
    handleErrors(res, error);
  }
};

const createMaterial = async (req, res) => {
  const { numeroMaterial, design, etat, quantite } = req.body;
  try {
    const newMaterial = await prisma.material.create({
      data: { numeroMaterial, design, etat, quantite },
    });
    res.json(newMaterial);
  } catch (error) {
    handleErrors(res, error);
  }
};

const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { numeroMaterial, design, etat, quantite } = req.body;
  try {
    const updatedMaterial = await prisma.material.update({
      where: { id },
      data: { numeroMaterial, design, etat, quantite },
    });

    if (!updatedMaterial) {
      res.status(404).json({ error: 'Material not found' });
      return;
    }

    res.json(updatedMaterial);
  } catch (error) {
    handleErrors(res, error);
  }
};

const deleteMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMaterial = await prisma.material.delete({
      where: { id },
    });

    if (!deletedMaterial) {
      res.status(404).json({ error: 'Material not found' });
      return;
    }
    res.status(204).json({ message: 'Material deleted successfully' });
  } catch (error) {
    handleErrors(res, error);
  }
};

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
