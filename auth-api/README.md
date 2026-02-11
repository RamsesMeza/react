# Auth API (NestJS + MongoDB + JWT)

Backend de autenticación para app móvil con:
- Registro y login por email/password
- Login/registro con Google desde móvil (verificación de `idToken`)
- JWT para sesiones
- Persistencia en MongoDB

## Requisitos

- Node.js 20+
- MongoDB

## Configuración

1. Copia variables de entorno:

```bash
cp .env.example .env
```

2. Instala dependencias:

```bash
npm install
```

3. Ejecuta en desarrollo:

```bash
npm run start:dev
```

## Variables de entorno

`PORT`: Puerto del servidor.

`MONGODB_URI`: URL de MongoDB.

`JWT_SECRET`: Secreto para firmar JWT (obligatorio en producción).

`JWT_EXPIRES_IN`: Tiempo de vida del access token (`15m`, `1h`, etc.).

`BCRYPT_SALT_ROUNDS`: Costo de hash para bcrypt (recomendado `12`).

`GOOGLE_CLIENT_IDS`: Lista separada por comas con los client IDs válidos de Google para móvil (Android/iOS).

## Endpoints

Base URL: `http://localhost:3000`

### `POST /auth/register`

Body:

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePass123"
}
```

### `POST /auth/login`

Body:

```json
{
  "email": "jane@example.com",
  "password": "SecurePass123"
}
```

### `POST /auth/google/mobile`

Body:

```json
{
  "idToken": "google-id-token-from-mobile-sdk"
}
```

Este endpoint verifica el token en backend. Si el usuario no existe, se registra automáticamente.

### `GET /auth/me`

Header:

```http
Authorization: Bearer <accessToken>
```

Retorna el perfil público del usuario autenticado.

## Respuesta de auth

`register`, `login` y `google/mobile` responden:

```json
{
  "accessToken": "<jwt>",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "...",
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "providers": ["local"],
    "isEmailVerified": false,
    "avatarUrl": "https://..."
  }
}
```
