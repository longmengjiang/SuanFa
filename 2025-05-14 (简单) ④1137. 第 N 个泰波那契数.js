/* 
  泰波那契序列 Tn 定义如下： 

  T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2

  给你整数 n，请返回第 n 个泰波那契数 Tn 的值。

  示例 1：
  输入：n = 4
  输出：4
  解释：
  T_3 = 0 + 1 + 1 = 2
  T_4 = 1 + 1 + 2 = 4

  示例 2：
  输入：n = 25
  输出：1389537
  

  提示：
  0 <= n <= 37
  答案保证是一个 32 位整数，即 answer <= 2^31 - 1。
 */

/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n) {
  if(n < 0) return 0

  let p = 0
  let q = 1
  let r = 1
  let res = 2

  // 不能和斐波那契数列一样按顺序 || 也不是不可以
  for(let i = 4; i <= n + 3; i++) {
    p = q
    q = r
    r = res
    res = p + q + r
  }
  return p
}

console.log(tribonacci(25)) // 1389537
console.log(tribonacci(4)) // 4
