# API REST de alumnos (Node.js + Express + MySQL)

## Requisitos

- Node.js 18 o superior
- MySQL 8 (por ejemplo, el incluido en XAMPP) escuchando en el puerto 3306
- MySQL 8 con la base de datos y tabla creadas al importar `schema.sql`
- Copia de `.env.example` a `.env` y configuración de las credenciales locales

## Instalación y ejecución

1. Importa `schema.sql` en MySQL para crear la base de datos y cargar alumnos de ejemplo.
2. Instala dependencias con `npm install`.
3. Copia `.env.example` a `.env` y ajusta la configuración local de MySQL.
4. Ejecuta `npm run dev` durante el desarrollo o `npm start` para iniciar el servidor.
5. La API queda disponible en `http://localhost:3000/api/alumnos`.

## Endpoints

| Método | Ruta | Resultado |
|---|---|---|
| GET | `/api/alumnos` | Lista alumnos activos |
| GET | `/api/alumnos/:id` | Obtiene un alumno activo |
| POST | `/api/alumnos` | Crea un alumno |
| PUT | `/api/alumnos/:id` | Reemplaza los datos del alumno |
| DELETE | `/api/alumnos/:id` | Realiza borrado lógico (`estado = 0`) |

El cuerpo de POST y PUT debe incluir los cuatro campos:

```json
{
  "nombre": "Ada",
  "apellido": "Lovelace",
  "email": "ada@example.com",
  "dni": "12345678"
}
```

Los emails y DNI deben ser únicos. Todos los endpoints responden JSON; las rutas o alumnos inexistentes devuelven 404 y los datos inválidos o duplicados devuelven 400.
