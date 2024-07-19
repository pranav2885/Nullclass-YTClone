import videoFiles from "../models/videoFiles.js";
import User from "../models/auth.js";
import mongoose from "mongoose";

export const viewController = async (req, res) => {
  const { id: _id } = req.params;
  const email = req.email;  

  console.log(`Video ID: ${_id}`);
  console.log(`User ID from request: ${email}`);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Video Unavailable..");
  }

  try {
    // Ensure user exists and update points
    console.log(`Finding user with ID: ${email}`);
    const user = await User.findById(email);
    if (!user) {
      console.log(`User not found for ID: ${email}`);
      return res.status(404).send("User not found.");
    }

    console.log(`Current points for user ${email}: ${user.points}`);

    const updatedUser = await User.findByIdAndUpdate(email, { $inc: { points: 2.5 } }, { new: true });
    if (!updatedUser) {
      console.log(`Failed to update user points for user ID: ${email}`);
      return res.status(500).send("Failed to update user points.");
    }
    console.log(`Updated points for user ${email}: ${updatedUser.points}`);  

    // Ensure video file exists and update views
    console.log(`Finding video file with ID: ${_id}`);
    const file = await videoFiles.findById(_id);
    if (!file) {
      console.log(`Video not found for ID: ${_id}`);
      return res.status(404).send("Video not found.");
    }

    await videoFiles.findByIdAndUpdate(_id, { $inc: { Views: 1 } });

    res.status(200).json({ message: "View and points updated" });
  } catch (error) {
    console.error("Error updating points: ", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
