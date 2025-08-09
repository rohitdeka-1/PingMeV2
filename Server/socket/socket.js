import { Server } from "socket.io";
/**
 * @description- These Events are for Chats
 * @todo- Need to Implement these Events
    POST /chat/:roomId/message
    GET /chat/:roomId/messages
*/

const userSocketMap = {}; // {userId->socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:5174"],
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        const userId = socket.handshake.query.userId;
        console.log("User ID from query:", userId);

        if(userId && userId !== "undefined") {
            userSocketMap[userId] = socket.id;
            console.log("User mapped:", userId, "->", socket.id);
        }

        console.log("Current userSocketMap:", userSocketMap);
        io.emit('getOnlineUsers',Object.keys(userSocketMap))

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            if(userId && userId !== "undefined") {
                delete userSocketMap[userId];
                console.log("User removed from map:", userId);
            }
            console.log("Updated userSocketMap:", userSocketMap);
            io.emit('getOnlineUsers',Object.keys(userSocketMap));
        });
    });

    return io;
}