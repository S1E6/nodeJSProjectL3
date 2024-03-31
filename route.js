// materialRoutes.js
const express = require('express');
const router = express.Router();
const materialController = require('./controller');

router.get('/material/', materialController.getAllMaterials);
router.get('/material/stat', materialController.getStat);
router.get('/material/:id', materialController.getMaterialById);
router.post('/material/', materialController.createMaterial);
router.put('/material/:id', materialController.updateMaterial);
router.delete('/material/:id', materialController.deleteMaterial);
router.post('/register/', materialController.register);
router.post('/login/', materialController.login);

module.exports = router;
