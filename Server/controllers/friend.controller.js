// FRIEND REQUEST FUNCTIONALITY - COMMENTED OUT
// All friend request related functions have been disabled



// /**
//  * Reject Friend Request
//  */
// export const rejectFriendRequest = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const currentUserId = req.id;

//     if (!userId) {
//       return res.status(400).json({ message: "Target userId is required" });
//     }

//     // Validate ObjectId format
//     if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ message: "Invalid user ID format" });
//     }

//     const currentUser = await User.findById(currentUserId);
//     const sender = await User.findById(userId);

//     if (!currentUser) {
//       return res.status(404).json({ message: "Current user not found" });
//     }

//     if (!sender) {
//       return res.status(404).json({ message: "Sender not found" });
//     }

//     currentUser.friends = currentUser.friends.filter(f => f.user.toString() !== userId);
//     sender.friends = sender.friends.filter(f => f.user.toString() !== currentUserId);

//     await currentUser.save();
//     await sender.save();

//     res.status(200).json({ message: "Friend request rejected" });
//   } catch (err) {
//     console.error('Reject friend request error:', err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// /**
//  * Remove Friend
//  */
// export const removeFriend = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const currentUserId = req.id;

//     if (!userId) {
//       return res.status(400).json({ message: "Target userId is required" });
//     }

//     const currentUser = await User.findById(currentUserId);
//     const friendUser = await User.findById(userId);

//     if (!currentUser || !friendUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     currentUser.friends = currentUser.friends.filter(f => f.user.toString() !== userId);
//     friendUser.friends = friendUser.friends.filter(f => f.user.toString() !== currentUserId);

//     await currentUser.save();
//     await friendUser.save();

//     res.status(200).json({ message: "Friend removed successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };



// /**
//  * Get Sent Requests
//  */
// export const getSentRequests = async (req, res) => {
//   try {
//     const user = await User.findById(req.id)
//       .populate('friends.user', 'fullname username profilePhoto')
//       .select('friends');

//     const outgoing = user.friends
//       .filter(f => f.status === 'sent')
//       .map(f => ({
//         id: f.user._id,
//         fullname: f.user.fullname,
//         username: f.user.username,
//         profilePhoto: f.user.profilePhoto
//       }));

//     res.status(200).json({ sentRequests: outgoing });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// /**
//  * Get Friends List
//  */
// export const getFriends = async (req, res) => {
//   try {
//     const user = await User.findById(req.id)
//       .populate('friends.user', 'fullname username profilePhoto')
//       .select('friends');

//     const friends = user.friends
//       .filter(f => f.status === 'accepted')
//       .map(f => ({
//         id: f.user._id,
//         fullname: f.user.fullname,
//         username: f.user.username,
//         profilePhoto: f.user.profilePhoto
//       }));

//     res.status(200).json({ friends });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
