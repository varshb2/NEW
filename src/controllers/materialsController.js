const Material = require("../models/Material");

exports.getMaterialsByLanguage = async (req, res) => {
  const { language } = req.params;
  try {
    const materials = await Material.find({ language });
    res.json(materials);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
