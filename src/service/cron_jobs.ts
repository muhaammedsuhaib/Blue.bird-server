import cron from "node-cron";
import Story from "../modules/storie/storie.model";
import User from "../modules/user/user.model"; // Assuming the User model is imported from the right path
import mongoose from "mongoose";

cron.schedule("0 * * * *", async () => {
  const currentTime = new Date();
  const timeLimit = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);

  try {
    const storiesToArchive = await Story.find({
      postedAt: { $lt: timeLimit },
      isArchived: false,
    });

    if (storiesToArchive.length === 0) {
      console.log("No stories to archive.");
      return;
    }
    const result = await Story.updateMany(
      { postedAt: { $lt: timeLimit }, isArchived: false },
      { $set: { isArchived: true } }
    );

    console.log(`${result?.modifiedCount} stories archived.`);

    for (let story of storiesToArchive) {
      const user = await User.findOne({ stories: story._id });

      if (user) {
        user.archivedStories.push(story._id as mongoose.Types.ObjectId);
        await user.save();
        console.log(`Archived story pushed to user: ${user?.username}`);
      }
    }
  } catch (error) {
    console.error("Error archiving stories:", error);
  }
});
