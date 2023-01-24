const server = require("http").createServer();
const io = require("socket.io")(10003, {
  cors: { origin: "*" },
});

var users = [];

io.on("connection", (socket) => {
  console.log("test");
  socket.on("connected", (userID) => {
    users[userID] = socket.id;
    console.log("wow" + users[userID]);
  });
  socket.on("sendEvent", (event, message, sender) => {
    io.to(users[event]).emit("message", message, sender);
  });
});

