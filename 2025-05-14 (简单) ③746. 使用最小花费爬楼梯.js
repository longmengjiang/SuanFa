/**
  给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。
  你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
  请你计算并返回达到楼梯顶部的最低花费。
  
  示例 1：
  输入：cost = [10,15,20]
  输出：15
  解释：你将从下标为 1 的台阶开始。
  - 支付 15 ，向上爬两个台阶，到达楼梯顶部。
  总花费为 15 。
  
  示例 2：
  输入：cost = [1,100,1,1,1,100,1,1,100,1]
  输出：6
  解释：你将从下标为 0 的台阶开始。
  - 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
  - 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
  - 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
  - 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
  - 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
  - 支付 1 ，向上爬一个台阶，到达楼梯顶部。
  总花费为 6 。
  
  提示：
  
  2 <= cost.length <= 1000
  0 <= cost[i] <= 999 
*/

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
  // 动态规划五部曲
  // dp数组的含义  →  本题：dp[i] 表示 爬到第i阶台阶所需的总费用！！！
  // 递推公式  →  dp[i] = min(dp[i - 1] + cost(i - 1), dp[i - 2] + cost(i - 2))
  // 数组的初始化
  // 数组的遍历顺序
  // 打印dp数组(如果出现问题，不要盲目改参数，而是打印数组发现问题)

  if(cost.length <= 1) return 0
  if(cost.length <= 2) return Math.min(cost[0], cost[1])

  // 此处刚好 前两项 可以初始化为 0，所以一起初始化了
  const dp = new Array(cost.length + 1).fill(0) // 为什么是长度 + 1呢，因为这里才是顶部，与一般理解稍有些许差异(参考题意)

  for(let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min((dp[i - 1] + cost[i - 1]), (dp[i - 2] + cost[i - 2]))
    // console.log(dp[i])
  }
  return dp[cost.length]
}

console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])) // 6
console.log(minCostClimbingStairs([10, 15, 20])) // 15