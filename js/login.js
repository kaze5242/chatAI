(function() {
  const loginVeri = new Verification('txtLoginId',async function(val) {
    if (!val) {
      return '请填写账号';
    }
  })

  const pswVeri = new Verification('txtLoginPwd',async function(val) {
    if (!val) {
      return '请填写密码';
    }
  })

  

  $('.user-form').onsubmit = async function(e) {
    e.preventDefault();
    const result = await Verification.validate(loginVeri,pswVeri);
    if (!result) {
      return;
    }

    const formData = new FormData($('.user-form'));
    const data = Object.fromEntries(formData.entries());
    const results = await API.login(data);
    console.log(results);
    if (results.code === 0) {
      alert('登录成功');
      location.href = './index.html';
    } else {
      loginVeri.p.innerText = '账号或密码错误';
    }
  }
  
  
  
  
})()


