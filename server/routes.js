const express = require('express');
const Project = require('./project-model');
const Image = require('./image-model');
const ContactMessage = require('./email-model');
const router = express.Router();

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/projects', async (req, res) => {
    const { name, description, url, languages } = req.body;
  
    const existingProject = await Project.findOne({ name });
  
    if (existingProject) {
      return res.status(400).json({ message: 'Project with this name already exists' });
    }
  
    const newProject = new Project({
      name,
      description,
      url,
      languages
    });
  
    try {
      await newProject.save();
      res.status(201).json(newProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post('/images', async (req, res) => {
    const { projectName, image } = req.body;

    const existingImage = await Image.findOne({ projectName, image });
  
    if (existingImage) {
      return res.status(400).json({ message: 'Image already exists for this project' });
    }

    const newImage = new Image({
      projectName,
      image
    });
  
    try {
      await newImage.save();
      res.status(201).json(newImage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

router.get('/images/:projectName', async (req, res) => {
  const { projectName } = req.params;

  try {
    const images = await Image.find({ projectName });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/contact', async (req, res) => {
    const { email, subject, message } = req.body;
  
    if (!email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const newMessage = new ContactMessage({ email, subject, message });
      await newMessage.save();
      res.status(201).json({ message: 'Message saved successfully' });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
