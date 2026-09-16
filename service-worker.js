// 通知バーに表示するための裏方処理
self.addEventListener("notificationclick", event => {
    event.notification.close();
});