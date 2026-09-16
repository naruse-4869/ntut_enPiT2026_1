// ★通知バーに表示するための裏方
self.addEventListener("notificationclick", event => {
    event.notification.close();
});
