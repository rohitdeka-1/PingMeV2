 
import conversationalModel from "../models/conversational.model.js";
import messageModel from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../server.js";

export const sendMessage = async(req,res)=>{

    const senderId=req.id;
    const receiverId = req.params.id;
    const {message} = req.body;

    console.log(senderId,receiverId,message);

    try{
        if(!message||!senderId||!receiverId){
            return res.status(400).json({
                message: "Somethings Wrong",
                success: false
            })
        }
        
        let gotConversation = await conversationalModel.findOne({
            participants:{$all:[senderId,receiverId]}
        });
        
        if(!gotConversation){
            gotConversation = await conversationalModel.create({
                participants:[senderId,receiverId]
            })
        }
        
        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            message
        })
        
        if(newMessage){
            gotConversation.messages.push(newMessage._id); 
        }

        await gotConversation.save();
        
        //socket Implementation
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }


        return res.status(201).json({
            message:"Message sent",
            newMessage,
            success: true
        })
    } 
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            succcess: false
        })
    }
}

export const getMessage = async(req,res) =>{

    try{

        const senderId = req.id;
        const receiverId = req.params.id;

        console.log(senderId,receiverId);

        const conversation = await conversationalModel.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages");
        
        return res.status(200).json({
            messages: conversation?.messages || [],
            message: "Messages Fetched",
            success: true
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }

}
