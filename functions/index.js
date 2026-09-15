const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

exports.notifyOnSensorData = onDocumentCreated(
  "sensorData/{docId}",
  async (event) => {
    const data = event.data.data();
    const docId = event.params.docId;

    const payload = {
      notification: {
        title: "冷蔵庫アラート",
        body: `冷蔵庫が開きました (${data.timestamp || new Date().toISOString()})`,
      },
      topic: "fridge-alerts",
    };

    try {
      await admin.messaging().send(payload);
      console.log(`通知送信成功: ${docId}`);
    } catch (error) {
      console.error(`通知送信失敗: ${error.message}`);
    }
  }
);
