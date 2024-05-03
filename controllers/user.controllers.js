import User from "../models/user.model.js";

export const getUserProfile = async (req, res ) => {
    const {username} = req. params;

    try {
        const user = await User.findOne({ username}).select("-password");
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        res.status(200).json(user);

        
    } catch (error) {
        console.log("Error in getUserProfile:", error.message);
        res.status(500).json({error: error.message});
        
    }
};

export const followUnfollowUser = async(req, res) => {
    try{
        const {id} = req.params;

        const userToModify = await User.findById(id);

        // this is the logic in the middleware functions to get user id from the protected routes
        const currentUser =await User.findById(req.user._id);

        if(id === req.user._id) {
            return res.status(400).json({error: "You cant follow/ unfollow yourself"});
        }

        if(!userToModify || !currentUser){
            return res.status(400).json({error: "User not found"});

        }


        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // unfollow the user
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$pull: {followers:  id}});
            res.status(200).json({message: "User unfollowed Succesfully"});


        } else {
            // follow the user
            await User.findByIdAndUpdate(id, { $push: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {followers: req.user._id});
            // send notification to the user
            res.status(200).json({message: "User followed Successfully"})


        }
         

    }  catch (error) {
        console.log("Error in followUnfollowUser:", error.message);
        res.status(500).json({error: error.message});
        
    }
}

