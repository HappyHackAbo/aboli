var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var strMsg = '来自服务器的消息：';
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/chess.html');
});
http.listen(3000, function() {
  console.log('listening on *:3000');
});
var aryUser = [];
var aryFightList = [];
var aryFindMatch = [];
var aryMatchComplete = [];
io.on('connection', function(socket) {
  socket.on('login', function(obj) {
    aryUser.push({
      id: socket.id,
      name: obj.name
    });
    // console.log(obj.name + '加入了游戏, socket-id:' + socket.id);
    aryUser.forEach(e => {
      var curSocket = io.sockets.sockets[e.id];
      curSocket.emit('login', { id: e.id, msg: strMsg + '登录成功', users: aryUser});
    });
  });
  socket.on('match', function(obj) {
    var curSocket = io.sockets.sockets[obj.id];
    var strMatchMsg = '正在为您匹配对手，请稍后';
    curSocket.emit('match', { msg: strMsg + strMatchMsg, id: obj.id});
    var objUser = aryUser.filter(function (item) {
      return item.id == obj.id;
    });
    aryFindMatch.push(objUser[0]);
    var objOpponent = null;
    var time = new Date().getTime();
    obj.timeout = setTimeout(() => {
      curSocket.emit('match', {msg: strMsg + '匹配超时', error: true, id: obj.id});
    },
    10000);
    obj.interval = setInterval(() => {
      if(aryFindMatch.length > 1) {
        clearTimeout(obj.timeout);
        for(var j = 0, user_length = aryFindMatch.length; j < user_length; j++) {
          if(aryFindMatch[j].id == obj.id) {
            continue;
          } else {
            objOpponent = aryFindMatch[j];
            if(j == 0) {
              objOpponent.assignTo = 'HAN';
            }
            curSocket.emit('match', { msg: strMsg + '匹配成功,您的对手:' + objOpponent.name, success: true, id: obj.id , name: objOpponent.name, assignTo: objOpponent.assignTo});
            clearInterval(obj.interval);
          }
        }
      }
    }, 1000);
  });
  socket.on('play', function(obj) {
    var curSocket = io.sockets.sockets[aryUser.filter(e => e.id != obj.id)[0].id];
    curSocket.emit('play', {turn: obj.turn, chess: obj.chess, highLightChessPiece: obj.highLightChessPiece});
  });
  socket.on('win', function(obj) {
    var curSocket = io.sockets.sockets[aryUser.filter(e => e.id != obj.id)[0].id];
    curSocket.emit('win');
  });
  socket.on('turn', function(obj) {
    aryUser.forEach(e => {
      var curSocket = io.sockets.sockets[e.id];
      curSocket.emit('turn', {turn: obj.turn});
    });
  });
});