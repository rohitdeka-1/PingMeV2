import userModel from "../models/user.model.js";


export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}


export const searchUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const search = req.query.search || '';
 

    if (search.trim() === '') {
      return res.status(200).json({
        otherUsers: [],
        message: "No search term provided",
        success: true
      });
    }

    

    const searchQuery = {
      _id: { $ne: loggedInUserId },
      $or: [
        { fullname: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };

     
    const otherUsers = await userModel.find(searchQuery).select("-password");

    
    return res.status(200).json({
      otherUsers,
      message: "Users Fetched",
      success: true
    });
  } catch (error) {
    console.log('Search error:', error);
    return res.status(500).json({ 
      message: "Server Error",
      success: false 
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const loggedInUserId = req.id;

    const user = await userModel.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    const isOwnProfile = userId === loggedInUserId;

    return res.status(200).json({
      user,
      isOwnProfile,
      message: "User fetched successfully",
      success: true
    });
  } catch (error) {
    console.log('Get user error:', error);
    return res.status(500).json({
      message: "Server Error",
      success: false
    });
  }
};
