(function() {
  const loginVeri = new Verification('txtLoginId',async function(val) {
    if (!val) {
      return '请填写账号';
    }
    const result = await API.exists(val);
    return result.data?'账号已存在':'';
  })

  const nickNameVeri = new Verification('txtNickname',async function(val) {
    if (!val) {
      return '请填写昵称';
    }
  })

  const pswVeri = new Verification('txtLoginPwd',async function(val) {
    if (!val) {
      return '请填写密码';
    }
  })

  const PwdConfirmVeri = new Verification('txtLoginPwdConfirm',async function(val) {
    if (!val) {
      return '请填写确认密码';
    }

    if (val !== PwdConfirmVeri.input.value) {
      return '两次密码不一致';
    }
  })
  

  $('.user-form').onsubmit = async function(e) {
    e.preventDefault();
    const result = await Verification.validate(loginVeri,nickNameVeri,pswVeri,PwdConfirmVeri);
    if (!result) {
      return;
    }

    const formData = new FormData($('.user-form'));
    const data = Object.fromEntries(formData.entries());
    const results = await API.reg(data);
    if (results.code === 0) {
      alert('注册成功！');
      location.href = './login.html';
    }
  }
  
  
  
  
})()