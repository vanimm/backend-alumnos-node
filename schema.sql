CREATE DATABASE IF NOT EXISTS curso_backend
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE curso_backend;

CREATE TABLE IF NOT EXISTS alumnos (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  dni VARCHAR(20) NOT NULL,
  estado TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  UNIQUE KEY uq_alumnos_email (email),
  UNIQUE KEY uq_alumnos_dni (dni)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

INSERT INTO alumnos (nombre, apellido, email, dni, estado) VALUES
  ('Ana', 'García', 'ana.garcia@example.com', '30123456', 1),
  ('Luis', 'Pérez', 'luis.perez@example.com', '28987654', 1),
  ('Marta', 'López', 'marta.lopez@example.com', '32765432', 1)
ON DUPLICATE KEY UPDATE
  nombre = VALUES(nombre),
  apellido = VALUES(apellido),
  estado = VALUES(estado);
