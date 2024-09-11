# CashTracker Backend

Este es el backend de CashTracker, una aplicación que proporciona una API REST para realizar operaciones como registrar, iniciar sesión, cerrar sesión, cargar, actualizar, eliminar y mostrar gastos. Está construida utilizando TypeScript, [Node.js](https://nodejs.org/en), [Express](https://expressjs.com/), y [MongoDB](https://www.mongodb.com/).

## Arquitectura del Proyecto

### Servidor y Base de Datos

El servidor utiliza Express.js, configurado con CORS para permitir solicitudes desde orígenes específicos, con soporte para credenciales. La base de datos es MongoDB, gestionada mediante Mongoose para una conexión y manipulación eficiente de datos.

### Autenticación y Autorización

Para la autenticación y autorización, la aplicación utiliza [JSON Web Tokens (JWT)](https://github.com/auth0/node-jsonwebtoken). Los usuarios reciben un token al registrarse o iniciar sesión, que deben incluir en cada solicitud como prueba de su identidad.

### Validación de Datos

La validación de los datos de entrada está a cargo de [Zod](https://zod.dev/), garantizando que las entradas de los usuarios cumplan con los esquemas definidos antes de ser procesadas. Esto ayuda a prevenir errores y mejora la seguridad y fiabilidad del sistema.

### API Externa para Conversión de Divisas

La aplicación integra la API externa [DolarApi](https://dolarapi.com/docs/) para obtener la cotización del dólar en tiempo real. Esta integración permite convertir los gastos registrados a la moneda local con precisión, ajustándose al valor actual del dólar.

### Despliegue

El backend está desplegado utilizando [Railway](https://railway.app/), lo que facilita su acceso y escalabilidad.

## Requerimientos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- Node.js: El entorno de ejecución.
- MongoDB: La base de datos NoSQL utilizada para el almacenamiento de datos.
  Configuración

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tobiasNicolasN/cashTracker-Backend.git

cd cashTracker-Backend
```

Instala las dependencias del proyecto incluidas en el archivo package.json:

```bash
npm install
```

Localiza el archivo **src/config.js** en el proyecto y configura las variables de entorno necesarias:

- **PORT**="Especifica el puerto en el que se ejecutará la aplicación."

- **MONGODB_URI**="URL de tu base de datos MongoDB."

- **TOKEN_SECRET**="Clave secreta para los tokens JWT."

Asegúrate de reemplazar MONGODB_URI con la URL de tu base de datos MongoDB y TOKEN_SECRET con una clave segura para la generación de tokens JWT.

## Inicia el servidor:

```bash
npm start
```

El servidor se ejecutará en el puerto especificado en el archivo de configuración (el valor predeterminado es el puerto 3000).

Puedes utilizar herramientas como Thunder Client o Postman para realizar solicitudes HTTP a la API.

## Endpoints de la API de Autenticación (AUTH)

### /api/register

Método HTTP: **POST**

Descripción: Registrar un nuevo usuario en la aplicación.

Permisos requeridos: Público.

Datos de la solicitud:

```json
{
  "email": "some@email.com",
  "password": "somePassword"
}
```

### /api/login

Método HTTP: **POST**

Descripción: Iniciar sesión en la aplicación.

Permisos requeridos: Usuarios registrados.

Datos de la solicitud:

```json
{
  "email": "some@email.com",
  "password": "somePassword"
}
```

### /api/logout

Método HTTP: **POST**

Descripción: Cerrar sesión en la aplicación.

Permisos requeridos: Autenticado.

### /api/profile

Método HTTP: **GET**

Descripción: Muestra los datos del usuario autenticado.

Permisos requeridos: Autenticado.

## Endpoints de la API de expensas

### /api/expenses

Método HTTP: **GET**

Descripción: Muestra los gastos del usuario autenticado.

Permisos requeridos: Autenticado.

Método HTTP: **POST**

Descripción: Registrar un nuevo gasto.

Permisos requeridos: Autenticado.

Datos de la solicitud:

```json
{
  "amount": 1234,
  "exchangeRate": "blue-compra",
  "category": "someCategory",
  "detail": "someDetail",
  "date": "0000-00-00T00:00:00Z"
}
```

### /api/expenses/:id

Método HTTP: **GET**

Descripción: Muestra un gasto específico.

Permisos requeridos: Autenticado.

Método HTTP: **DELETE**

Descripción: Elimina un gasto existente.

Permisos requeridos: Autenticado.
