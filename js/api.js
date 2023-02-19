var API = (function() {
  const BASE_URL = 'https://study.duyiedu.com';

  function getHeader() {
    const token = localStorage.getItem('token');
    const headers = {
      'content-Type':'application/json'
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  //注册接口
  async function reg(userInfo) {
    const resp = await fetch(BASE_URL + '/api/user/reg',{
      method:'post',
      headers:getHeader(),
      body:JSON.stringify(userInfo)
    })

    return await resp.json();

  }

  //登录接口
  async function login(userInfo) {
    const resp = await fetch(BASE_URL + '/api/user/login',{
      method:'post',
      headers:getHeader(),
      body:JSON.stringify(userInfo)
    })
    const result = await resp.json();
    const auth = resp.headers.get('Authorization');
    result.code === 0 && localStorage.setItem('token',auth);
    
    return result;
  }


  //验证账号
  async function exists(userInfo) {
    const resp = await fetch(BASE_URL + '/api/user/exists?loginId=' + userInfo,getHeader());
    const result = await resp.json();
    return result;
  }

  //获取当前用户信息
  async function profile() {
    const resp = await fetch(BASE_URL + '/api/user/profile',{headers:getHeader()});
    const result = await resp.json();
    return result;
  }

  //发送聊天消息
  async function sendChat(userInfo) {
    const resp = await fetch(BASE_URL + '/api/chat',{
      method:'post',
      headers:getHeader(),
      body:JSON.stringify({'content':userInfo})
    })
    const result = await resp.json();
    return result;
  }

  //获取聊天记录
  async function getHistory() {
    const resp = await fetch(BASE_URL + '/api/chat/history',{headers:getHeader()});
    const result = await resp.json();
    return result;
  }

  //注销用户
  function loginOut() {
    localStorage.removeItem('token');
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut
  };
})()