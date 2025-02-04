import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

//Crea la aplicación de Express
const app = express();

// Middleware de CORS (para permitir solicitudes desde el frontend)
app.use(cors());

// Middleware para procesar JSON y datos
app.use(express.json());

// 🔹 **Redirección antes de servir archivos estáticos**
app.get("/", (req: Request, res: Response) => {
  res.redirect("/login.html");
});

// 🔹 **Ahora sí, servir archivos estáticos después**
app.use(express.static(__dirname + "/Front/Website"));
app.use(express.static(__dirname + "/Front/style"));
app.use(express.static(__dirname + "/Front/Js"));
app.use(express.static(__dirname + "/Front/img"));

// Middleware para manejo de errores (captura errores en rutas asíncronas)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error en la API:", err.message);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Rutas de la API (actualmente falta)

// Definir el puerto y levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
