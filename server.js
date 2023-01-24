const server = require("http").createServer();
const io = require("socket.io")(10002, {
  cors: { origin: "*" },
});

var users = [];

io.on("connection", (socket) => {
  socket.on("connected", (userID) => {
    users[userID] = socket.id;
    console.log("wow" + users[userID]);
  });
  socket.on("sendEvent", (event, message, sender) => {
    io.to(users[event]).emit("message", message, sender);
  });
});
const port = process.env.PORT || 10000;
server.listen(port, function hostname() {
  console.log(`listening on: ${port}`);
});
