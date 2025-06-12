export function random(len: number) {
  let answer = "ewcewfwdcecef23f3232fef1e132r32r32dwq";
  let length = answer.length;
  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += answer[Math.floor(Math.random() * len)];
  }
  return ans;
}
