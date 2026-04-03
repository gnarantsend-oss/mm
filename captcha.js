// ============================================================
// auth/captcha.js — CAPTCHA үүсгэх
// ============================================================

window.currentCaptchaAnswer = 0;

window.generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  window.currentCaptchaAnswer = num1 + num2;

  const qLogin = document.getElementById('captchaQuestionLogin');
  const qReg   = document.getElementById('captchaQuestionReg');
  if (qLogin) qLogin.textContent = `${num1} + ${num2} = ?`;
  if (qReg)   qReg.textContent   = `${num1} + ${num2} = ?`;
};
