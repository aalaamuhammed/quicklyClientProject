import {clientApi} from '../../helpers/axios';
export async function signup(signuData) {
  return await clientApi.post('auth/register', signuData);
}
export async function login(loginData) {
  return await clientApi.post('auth/login', loginData);
}
export async function register_phone(deviceToken) {
  return await clientApi.post('profile/update-device-token', {
    token: deviceToken,
  });
}
export async function social_login(loginData) {
  return await clientApi.post('auth/social-login', loginData);
}
export async function forgot_password(phone) {
  return await clientApi.post('auth/sendCode', phone);
}
export async function resendSignupCode(resendCode) {
  return await clientApi.post('auth/resendCode', resendCode);
}
export async function verify_code2(verifiyData) {
  return await clientApi.post('auth/verifyPhone', verifiyData);
}
export async function verify_code(verifiyData) {
  return await clientApi.post('auth/verifyCode', verifiyData);
}
export async function reset_password(resetData) {
  return await clientApi.post('auth/resetForgotPassword', resetData);
}
export async function change_password(data) {
  return await clientApi.post('auth/changePassword', data);
}
