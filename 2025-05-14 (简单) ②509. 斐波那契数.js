/* 
  斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

  F(0) = 0，F(1) = 1
  F(n) = F(n - 1) + F(n - 2)，其中 n > 1
  给定 n ，请计算 F(n) 。

  示例 1：
  输入：n = 2
  输出：1
  解释：F(2) = F(1) + F(0) = 1 + 0 = 1

  示例 2：
  输入：n = 3
  输出：2
  解释：F(3) = F(2) + F(1) = 1 + 1 = 2

  示例 3：
  输入：n = 4
  输出：3
  解释：F(4) = F(3) + F(2) = 2 + 1 = 3
  

  提示：
  0 <= n <= 30
*/

/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if(n <= 0) return 0
  
  let p = 0
  let q = 1
  let r = 1

  // 为什么是从第三项开始呢，因为1 2项已经知道了
  for(let i = 3; i <= n; i++) {
    p = q
    q = r
    r = p + q
  }
  return r
}

console.log(fib(2)) // 1;
console.log(fib(35)) // 9227465
