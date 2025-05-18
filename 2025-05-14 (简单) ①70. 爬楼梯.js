// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 示例 1：
// 输入：n = 2
// 输出：2
// 解释：有两种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶
// 2. 2 阶

// 示例 2：
// 输入：n = 3
// 输出：3
// 解释：有三种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶
 

// 提示：
// 1 <= n <= 45

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  // 使用数组
  // let dp = new Array(n).fill(0)
  // dp[1] = 1 // 第一阶台阶
  // dp[2] = 2 // 第二阶台阶

  // for(let i = 3; i <= n; i++) {
  //   dp[i] = dp[i - 1] + dp[i - 2]
  // }

  // return dp[n]

  // 不使用数组，比使用数组节省空间
  let p = 0 // 前两阶台阶总方法数
  let q = 0 // 前一阶台阶总方法数
  let r = 1 // 当前台阶总方法数

  for(let i = 1; i <= n; i++) {
    p = q
    q = r
    r = p + q
  }
  return r
}

console.log(climbStairs(2)) // 2;
console.log(climbStairs(3)) // 3;
console.log(climbStairs(40)) // 165580141
