// materialController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const secretKey = '$node-**';
const jwt = require('jsonwebtoken');

async function register(req, res) {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new account using Prisma
    const newAccount = await prisma.account.create({
      data: {
        username,
        email,
        password: hashedPassword,
     
      },
    });

    // Remove the password field from the response for security reasons
    const { password: _, ...accountWithoutPassword } = newAccount;
    const token = jwt.sign({ accountId: newAccount.id }, secretKey, { expiresIn: '1h' });
    res.json({ token, account: accountWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const account = await prisma.account.findUnique({
      where: { username },
    });

    if (!account) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, account.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ accountId: account.id }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, account });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
}

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
      where: { numeroMaterial:parseInt(id) },
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
  const { design, etat, quantite } = req.body;
  try {
    const newMaterial = await prisma.material.create({
      data: {  design, etat, quantite },
    });
    res.json(newMaterial);
  } catch (error) {
    handleErrors(res, error);
  }
};

const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { design, etat, quantite } = req.body;
  try {
    const updatedMaterial = await prisma.material.update({
      where: { numeroMaterial:parseInt(id) },
      data: {  design, etat, quantite },
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
      where: { numeroMaterial:parseInt(id) },
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
const getStat = async (req, res) =>{
  try {
    const materials = await prisma.material.findMany();
    const counts = [0, 0, 0]; // Initialiser un tableau pour stocker les comptages pour chaque état

    materials.forEach(material => {
      switch(material.etat) {
        case 'Bon':
          counts[0]++; // Incrémenter le comptage pour l'état Bon
          break;
        case 'Abimé':
          counts[1]++; // Incrémenter le comptage pour l'état Abimé
          break;
        case 'Mauvais':
          counts[2]++; // Incrémenter le comptage pour l'état Mauvais
          break;
        default:
          break;
      }
    });

    res.json(counts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors du traitement de la requête.' });
  }

}



module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getStat,
  login,
  register
};
