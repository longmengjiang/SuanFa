// 快速幂运算

// 计算的复杂度是 O(log n)，而不是 O(n)，因为每次都将指数除以2，指数的位数最多为 log n 位，所以复杂度是 O(log n)

// 例如  计算  2^10 = (2^2)^5 = 4^5 = 1024
// 则最终返回 1024

// 当指数为偶数，则a^b = (a^2)^(b/2)  即 底数平方，指数除以2
// // 当指数为奇数，则a^b = a * (a^2)^(b/2)  即 底数平方，指数除以2，最后乘以底数
// // 例如：2^10 = (2^2)^5 = 4^5 = 1024
// // 例如：3^9 = 3 * (3^2)^4 = 3 * 9^4 = 3 * 6561 = 19683


// 使用除法运算
function quick (a, b) {
  let ans = 1
  while(b) { // 当指数存在的时候
    // 如果指数是奇数，则要先拉出来一个底数乘到最终结果上，其余步骤和偶数一样操作
    // 如果指数是偶数，则要底数平方，指数除以2（如果是使用按位与运算，则使用 "b >>= 1"）b/2
    if(b % 2 === 1) ans *= a
    a *= a
    b = Math.floor(b / 2) // 注意一定要使用Math.floor()，否则会出现小数点，导致结束循环
  }
  return ans
}
console.log(quick(2, 7)) // 128

// 使用位运算符
function quick2 (a, b) {
  let ans = 1
  while(b) { // 当指数存在的时候
    // 如果指数是奇数，则要先拉出来一个底数乘到最终结果上，其余步骤和偶数一样操作
    // 如果指数是偶数，则要底数平方，指数除以2（如果是使用按位与运算，则使用 "b >>= 1"）b/2
    if(b & 1) ans *= a
    a *= a
    b >>= 1
  }
  return ans
}
console.log(quick2(2, 8)) // 256



// 快速幂运算的除模运算
function quickPow(base, exponent) {
  let result = 1
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % (10 ** 9 + 7)
    }
    base = (base * base) % (10 ** 9 + 7)
    exponent = Math.floor(exponent / 2)

  }
  return result
}
console.log(quickPow(2, 9)) // 512
console.log(quickPow(2, 99)) // 6.338253001141147e+29，不除以 （10 ** 9 + 7），就是这个值；除以（10 ** 9 + 7）就是 988185630