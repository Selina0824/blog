//验证是否为空
function validate_required(target) {
    if(target.value === null||target.value ===''){
        return false;
    } else{
        return true;
    }
}

//验证两次输入内容是否相同
function validate_equal(str1, str2) {
    if(str1 === str2){
        return true;
    } 
    return false;
  }

  //验证字符ch是否不是数字
  function validate_character(ch){
      if(ch>='0' && ch<='9') {
          return false;
      } else {
          return true;
      }
  }

  //验证字符串长度是否符合要求
  function validate_length(str, min, max){
      if(str.length >= min && str.length <=max) {
          return true;
      } else {
          return false;
      }
  }

  //验证给定的email是否符合地址规范
  function validate_email(email) {
      var apos = email.indexOf('@');
      if(apos === -1) {
          return false;
      }

      var dotpos = email.indexOf('.');
          if (dotpos -apos >2) {
              return false;
          }
        return true;
  }