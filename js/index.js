(function() {
  const doms = {
    ChatUI:$('.chat-container'),
    ChatBox:$('#txtMsg'),
    sendBtn:$('button'),
    form:$('.msg-container')
  }

  async function init() {
    const token = localStorage.getItem('token');
    const result = await API.profile(token);
    if (result.code !== 0) {
      alert(result.msg);
      location.href = './login.html';
      return;
    }
    const historyArr = await API.getHistory();
    console.log(historyArr.data);

    //讲聊天记录数据对象遍历转换成html
    doms.ChatUI.innerHTML += historyArr.data.map(msg => add({
      me:msg.from?'me':'',
      msg:msg.content,
      time:format(msg.createdAt),
      img:msg.from?'./asset/avatar.png':'./asset/robot-avatar.jpg'
    },false));
    

    //设置滚动条
    scrolling();
  }

  //讲配置对象设置成html
  function add(Obj,autoSetHTML=true){
    const html = `<div class="chat-item ${Obj.me}">
    <img class="chat-avatar" src="${Obj.img}" />
    <div class="chat-content">${Obj.msg}</div>
    <div class="chat-date">${Obj.time}</div>
    </div>`;
    if (!autoSetHTML) {
      return html;
    }
    doms.ChatUI.innerHTML += html;
  }

  function scrolling() {
    doms.ChatUI.scrollTop = 99999;
  }

  //注册事件
  doms.form.onsubmit = async function(e) {
    e.preventDefault();
    if (doms.ChatBox.value === '') {
      return;
    }
    const boxValu = doms.ChatBox.value;
    add({
      me:'me',
      msg:doms.ChatBox.value,
      time:format(new Date().getTime()),
      img:'./asset/avatar.png'
    })
    doms.ChatBox.value = '';
    //设置滚动条
    scrolling();
    const chat = await API.sendChat(boxValu);
    const result = await chat;
    
    if (result.code === 0) {
      add({
        me:'',
        msg:result.data.content,
        time:format(result.data.createdAt),
        img:'./asset/robot-avatar.jpg'
      })
    }
    //设置滚动条
    scrolling();
    
  }



  init();
})()