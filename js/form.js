function createAndGetInput() {
  const $otp_length = 5;

  const element = document.getElementById('OTPInput');

  for (let i = 0; i < $otp_length; i++) {
    let inputField = document.createElement('input');
    inputField.className = "form border.focus";

    inputField.id = 'otp-field' + i;
    inputField.maxLength = 1;
    element.appendChild(inputField);
  }

  const inputs = document.querySelectorAll('#OTPInput > *[id]');

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keydown', function (event) {
      if (event.key === "Backspace") {

        if (inputs[i].value == '') {
          if (i != 0) {
            inputs[i - 1].focus();
          }
        } else {
          inputs[i].value = '';
        }

      } else if (event.key === "ArrowLeft" && i !== 0) {
        inputs[i - 1].focus();
      } else if (event.key === "ArrowRight" && i !== inputs.length - 1) {
        inputs[i + 1].focus();
      } else if (event.key != "ArrowLeft" && event.key != "ArrowRight") {
        inputs[i].setAttribute("type", "text");
        inputs[i].value = '';
      }
    });
    inputs[i].addEventListener('input', function () {
      inputs[i].value = inputs[i].value.toUpperCase();
      if (i === inputs.length - 1 && inputs[i].value !== '') {
        return true;
      } else if (inputs[i].value !== '') {
        inputs[i + 1].focus();
      }
    });
  }
}

function setOtp() {
  const button = document.getElementById('continue-button-c');
  button.addEventListener("click", function () {
    const inputs = document.querySelectorAll('#OTPInput > *[id]');
    let compiledOtp = '';
    for (let i = 0; i < inputs.length; i++) {
      compiledOtp += inputs[i].value;
    }
    let otpElement = document.getElementById('otp');
    otpElement.value = compiledOtp;
    sessionStorage.setItem('device', compiledOtp)
    return true
  })
}
createAndGetInput();
setOtp(); 