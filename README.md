# Proyecto Final · API de productos

API REST de productos con Node.js, Express y Cloud Firestore. Permite listar productos, buscarlos por ID, crearlos y eliminarlos. El inicio de sesión genera un JWT para las operaciones protegidas.

## Instalación

Desde la raíz del proyecto, con Node.js y npm instalados, ejecutá:

```bash
npm ci
```

Creá un archivo `.env` junto a `index.js` y completá las variables:

```dotenv
AUTH_EMAIL=admin@example.com
AUTH_PASSWORD="reemplazar_por_contrasena_de_la_api"
JWT_SECRET=reemplazar_por_secreto_aleatorio

FIREBASE_API_KEY=valor_de_apiKey
FIREBASE_AUTH_DOMAIN=valor_de_authDomain
FIREBASE_PROJECT_ID=valor_de_projectId
FIREBASE_APP_ID=valor_de_appId
FIREBASE_EMAIL=correo_del_usuario_de_firebase
FIREBASE_PASSWORD="contrasena_del_usuario_de_firebase"
```

Para generar el secreto de JWT, ejecutá el siguiente comando y pegá el resultado completo en `JWT_SECRET`:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Mantené `.env` fuera del repositorio con `.gitignore`. Las variables `AUTH_EMAIL` y `AUTH_PASSWORD` corresponden al login de la API. Las variables `FIREBASE_EMAIL` y `FIREBASE_PASSWORD` corresponden a la cuenta que usa el servidor para conectarse a Firestore.

## Configuración de Firebase

1. Creá un proyecto en la [consola de Firebase](https://console.firebase.google.com/) y registrá una app web para obtener los valores de configuración.
2. Creá una base de Cloud Firestore y la colección `products`. Cada producto tiene `name` y `category` como texto, y `price` como número.
3. En **Authentication → Método de acceso**, habilitá **Correo electrónico/contraseña**. En **Usuarios**, creá la cuenta para el servidor y copiá su UID.
4. En **Firestore → Reglas**, autorizá a ese UID para leer y escribir en `products`. Para una base nueva dedicada al proyecto, podés usar el siguiente bloque. Reemplazá el marcador por el UID de la cuenta y publicá la regla.

```text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read, write: if request.auth != null
        && request.auth.uid == "UID_DEL_USUARIO_DEL_BACKEND";
    }
  }
}
```

## Ejecución

```bash
npm start
```

Para desarrollo con reinicio al cambiar el código:

```bash
node --watch index.js
```

URL local de los ejemplos: `http://localhost:3000`.

## Rutas

| Método | Ruta | Acceso | Respuesta exitosa |
| --- | --- | --- | --- |
| POST | `/auth/login` | Público | `200 OK` con el token |
| GET | `/api/products` | Público | `200 OK` con la lista |
| GET | `/api/products/:id` | Público | `200 OK` con el producto |
| POST | `/api/products/create` | Bearer Token | `201 Created` con el producto |
| DELETE | `/api/products/:id` | Bearer Token | `204 No Content` |

Usá el **ID del documento de Firestore** en las rutas con `:id`. Los productos creados por la API también guardan ese mismo valor en el campo `id`.

## Prueba en Postman

1. Enviá `POST http://localhost:3000/auth/login` con **No Auth** y **Body → raw → JSON**. Usá los valores de `AUTH_EMAIL` y `AUTH_PASSWORD`.

   ```json
   {
     "email": "admin@example.com",
     "password": "tu_contrasena_de_la_api"
   }
   ```

2. Copiá el valor del campo `token` de la respuesta. Enviá `POST http://localhost:3000/api/products/create` con **Authorization → Bearer Token**. Pegá solo el token y enviá este JSON:

   ```json
   {
     "name": "Blazer Ivana",
     "price": 20000,
     "category": "Blazers"
   }
   ```

3. Copiá el `id` del producto creado. Verificá el listado con `GET /api/products` y consultá el producto con `GET /api/products/<id>`.
4. Enviá `DELETE /api/products/<id>` con el mismo Bearer Token y el cuerpo vacío. Después consultá el mismo ID para comprobar que devuelve `404`.

### Respuestas de error esperadas

| Código | Caso |
| --- | --- |
| `400` | Datos obligatorios faltantes, precio inválido o JSON mal formado |
| `401` | Credenciales incorrectas o token ausente, inválido o vencido |
| `404` | Producto inexistente o ruta desconocida |
| `500` | Error interno, por ejemplo una falla inesperada al consultar Firestore |

## Organización del código

| Ubicación | Responsabilidad |
| --- | --- |
| `index.js` | Configura Express y monta las rutas y los middlewares |
| `src/config/firebase.js` | Inicializa Firebase y conecta el servidor con Firestore |
| `src/routes/` | Define las rutas de productos y autenticación |
| `src/controllers/` | Lee las peticiones y construye las respuestas HTTP |
| `src/services/` | Coordina las operaciones de productos y el inicio de sesión |
| `src/models/` | Accede a la colección de productos en Firestore |
| `src/middlewares/` | Verifica el JWT y maneja errores de la API |
