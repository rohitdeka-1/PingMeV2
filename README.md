# PingMe V2 🚀

A modern, real-time messaging application built with React, Node.js, and Socket.IO. PingMe V2 allows users to search for other users, view profiles, and engage in real-time conversations with online status indicators.

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login** - Secure authentication with JWT tokens
- **Password Reset** - Email-based password recovery system
- **Profile Management** - Users can view and manage their profiles
- **Profile Photos** - Avatar generation using Dicebear API

### 💬 Real-time Messaging
- **Instant Messaging** - Real-time chat using Socket.IO
- **Message History** - Persistent message storage and retrieval
- **Typing Indicators** - Real-time user activity status
- **Message Timestamps** - Track when messages were sent

### 👥 User Discovery & Social Features
- **User Search** - Search for users by name or username
- **User Profiles** - View detailed user profiles with URL parameters (`/profile/:userId`)
- **Online Status** - Real-time online/offline user indicators
- **User Lists** - Browse and discover other users on the platform

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first design using Tailwind CSS
- **Dark Theme** - Modern dark theme interface
- **Real-time Updates** - Live status updates and notifications
- **Loading States** - Smooth loading indicators for better UX
- **Toast Notifications** - User feedback with React Hot Toast

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **Redux Toolkit** - State management
- **React Router Dom** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS components
- **Vite** - Fast build tool and development server
- **React Hot Toast** - Notification system
- **React Icons** - Icon library
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email sending capability
- **Handlebars** - Email template engine
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie parsing middleware

## 📁 Project Structure

```
PingMe_V2/
├── Client/                          # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/               # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── Home/               # Home page components
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Chat/           # Chat functionality
│   │   │   │   │   ├── Chat.jsx
│   │   │   │   │   ├── Message.jsx
│   │   │   │   │   └── Input.jsx
│   │   │   │   └── Components/     # Reusable components
│   │   │   │       ├── List.jsx
│   │   │   │       ├── MessageCards.jsx
│   │   │   │       ├── SearchUser.jsx
│   │   │   │       └── Profile.jsx
│   │   │   └── hooks/              # Custom React hooks
│   │   │       ├── getOtherUsers.jsx
│   │   │       ├── useGetMessages.jsx
│   │   │       └── useGetRealTimeMsg.jsx
│   │   ├── redux/                  # State management
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── userSlice.js
│   │   │       ├── messageSlice.js
│   │   │       └── socketSlice.js
│   │   ├── Axios/                  # API configuration
│   │   │   └── axiosInstance.js
│   │   └── context/                # React context providers
│   │       └── SocketContext.jsx
│   ├── public/
│   └── package.json
│
└── Server/                          # Backend Node.js application
    ├── controllers/                 # Request handlers
    │   ├── auth.controller.js
    │   ├── user.controller.js
    │   ├── messages.controller.js
    │   └── socketManager.controller.js
    ├── models/                      # Database models
    │   ├── user.model.js
    │   ├── message.model.js
    │   └── conversational.model.js
    ├── routes/                      # API routes
    │   ├── auth.routes.js
    │   ├── user.routes.js
    │   ├── message.routes.js
    │   └── index.js
    ├── middlewares/                 # Custom middlewares
    │   ├── authValidation.middleware.js
    │   └── verifyToken.middleware.js
    ├── services/                    # Business logic services
    │   ├── mailer.services.js
    │   └── getIP.js
    ├── socket/                      # Socket.IO configuration
    │   └── socket.js
    ├── database/                    # Database configuration
    │   └── db.js
    ├── config/                      # Environment configuration
    │   └── env.config.js
    ├── Email/                       # Email templates
    │   ├── login.handlebars
    │   ├── register.handlebars
    │   └── resetPassword.handlebars
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/rohitdeka-1/PingMeV2.git
cd PingMeV2
```

### 2. Backend Setup
```bash
cd Server
npm install
```

Create a `.env` file in the Server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pingme
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the backend server:
```bash
npm start
# or for development
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173` (or `http://localhost:5174` if 5173 is busy)
- Backend API: `http://localhost:5000`

## 📱 Usage

### Getting Started
1. **Register** - Create a new account with your email, username, and password
2. **Login** - Sign in to your account
3. **Search Users** - Use the search functionality to find other users
4. **View Profiles** - Click on any user to view their profile
5. **Start Chatting** - Select a user and start real-time messaging

### Key Features Usage

#### User Search & Discovery
- Use the search bar to find users by name or username
- Browse user profiles by clicking on search results
- See online status indicators (green dot for online users)

#### Real-time Messaging
- Select any user to start a conversation
- Messages are delivered instantly using Socket.IO
- See when users are online/offline
- Message history is automatically saved

#### Profile Management
- Access user profiles via `/profile/:userId` URLs
- View user information and profile photos
- Share profile links with others

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/forgot-password` - Password reset request
- `POST /api/v1/auth/reset-password` - Password reset confirmation

### Users
- `GET /api/v1/users/search` - Search users
- `GET /api/v1/users/profile/:id` - Get user profile
- `GET /api/v1/users/others` - Get other users list

### Messages
- `POST /api/v1/message/send/:id` - Send message to user
- `GET /api/v1/message/:id` - Get conversation history

## 🔌 Socket.IO Events

### Client to Server
- `connection` - User connects to socket
- `disconnect` - User disconnects from socket

### Server to Client
- `getOnlineUsers` - Receive list of online users
- `newMessage` - Receive new real-time message

## 🚫 Removed Features

### Friend Request System (Commented Out)
The friend request functionality has been intentionally disabled in this version. The following features were removed:
- **Friend Requests** - Sending and receiving friend requests
- **Friend Management** - Adding, accepting, or rejecting friends
- **Friend Status** - Pending, sent, accepted, blocked status
- **Friend Lists** - Viewing friends and friend requests

*Note: The friend system code remains in the codebase but is commented out and can be re-enabled in future versions if needed.*

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 👤 Author

**Rohit Deka** (@rohitdeka-1)
- GitHub: [@rohitdeka-1](https://github.com/rohitdeka-1)

## 🙏 Acknowledgments

- React team for the amazing framework
- Socket.IO for real-time communication
- MongoDB for the database solution
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors who made this project possible

---

**PingMe V2** - Connecting people through real-time conversations! 💬✨