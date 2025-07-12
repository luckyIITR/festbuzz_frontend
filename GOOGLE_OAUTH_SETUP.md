# Google OAuth Setup Guide

## Frontend Setup

1. **Install Dependencies**
   ```bash
   npm install @react-oauth/google
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

3. **Google Cloud Console Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Add authorized redirect URIs:
     - `http://localhost:3000`
     - `https://yourdomain.com`
   - Copy the Client ID and add it to your `.env.local` file

## Backend API Endpoint

The backend should implement the following endpoint:

### POST /api/auth/google
```json
{
  "accessToken": "google_access_token_here",
  "idToken": "google_id_token_here" // optional
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user",
    "picture": "https://googleusercontent.com/photo.jpg"
  },
  "token": "jwt_token_here"
}
```

## Features Implemented

- ✅ Google OAuth login/signup buttons
- ✅ Automatic user creation/login via Google
- ✅ JWT token handling
- ✅ User data storage in localStorage
- ✅ Error handling for Google auth
- ✅ Responsive design matching existing UI
- ✅ One-tap sign-in support

## Usage

Users can now:
1. Click "Sign in with Google" or "Sign up with Google"
2. Complete Google OAuth flow
3. Automatically get logged in and redirected
4. Access protected routes with their Google account 