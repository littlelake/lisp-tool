class Validate {
  // 验证手机号码是否正确
  isPhone = (text) => {
    // 如果text为空
    if (text) return;

    const reg = /^(139|176)[0-9]{8}$/;
    return reg.test(text);
  }
}

export default new Validate;