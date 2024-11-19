import cron from "node-cron";
import Story from "../modules/storie/storie.model";

cron.schedule("0 * * * *", async () => {
  const currentTime = new Date();
  const timeLimit = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
  try {
    const result = await Story.updateMany(
      { postedAt: { $lt: timeLimit }, isArchived: false },
      { $set: { isArchived: true } }
    );

    console.log(`${result.modifiedCount} stories archived.`);
  } catch (error) {
    console.error("Error archiving stories:", error);
  }
});
