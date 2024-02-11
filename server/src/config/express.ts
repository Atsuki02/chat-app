import { Application } from "express";

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/authRoutes');

module.exports = (app: Application) => {
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:5173',
  }));
  app.use(express.json());
  app.use('/api/auth', authRoutes);
};
