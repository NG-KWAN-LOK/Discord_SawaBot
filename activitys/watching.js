module.exports = {
  name: "0",
  description: "set watching stauts",
  async execute(client) {
    const activitys = [
      "囡",
      "仔",
      "戇居片",
      "著你迷人的雙眼",
      "著你漂亮的臉",
      "著你性感的嘴唇",
      "著你一起到老",
      "著你的笑容",
      "著你",
      "你緣投啦",
    ];
    const activitysID = Math.floor(Math.random() * activitys.length);
    const activitysContent = activitys[activitysID];
    try {
      client.user.setActivity(activitysContent + " | *h", {
        type: "WATCHING",
      });
      console.log(activitysID, activitysContent);
    } catch (error) {
      console.log(error);
    }
  },
};
