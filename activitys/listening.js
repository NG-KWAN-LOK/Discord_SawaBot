module.exports = {
  name: "1",
  description: "set listening stauts",
  async execute(client) {
    const activitys = [
      "你的甜言蜜語",
      "你唱情歌",
      "啊嬤的話",
      "甜故",
      "海哭的聲音",
      "講我好屌",
      "好聽既歌",
      "你系度打飛機",
    ];
    const activitysID = Math.floor(Math.random() * activitys.length);
    const activitysContent = activitys[activitysID] + " | *h";
    try {
      client.user.setActivity(activitysContent, { type: "LISTENING" });
      console.log(activitysID, activitysContent);
    } catch (error) {
      console.log(error);
    }
  },
};
