module.exports = {
  name: "2",
  description: "set playing stauts",
  async execute(client) {
    const activitys = [
      "手指",
      "爆你個腎",
      "火",
      "壞了",
      "囡",
      "仔",
      "人生遊戲",
      "了",
    ];
    const activitysID = Math.floor(Math.random() * activitys.length);
    const activitysContent = activitys[activitysID] + " | *h";
    try {
      client.user.setActivity(activitysContent);
      console.log(activitysID, activitysContent);
    } catch (error) {
      console.log(error);
    }
  },
};
