class Verification {
  constructor(texId,verificationFunc) {
    this.input = $('#' + texId);
    this.p = this.input.nextElementSibling;
    this.input.onblur = () => {
      this.validate();
    }
    this.callback = verificationFunc;
  }

  //验证成功返回true，失败返回false
  async validate() {
    const err = await this.callback(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = '';
      return true;
    }
    
  }
  //对传入的所有验证器统一验证，所有验证通过，则返回true,否则返回false
  static async validate(...valis) {
    const proms = valis.map(v => v.validate());
    const result = await Promise.all(proms);
    return result.every(v => v);
  }

}

