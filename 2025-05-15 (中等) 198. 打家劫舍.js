// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

// 示例 1：
// 输入：[1,2,3,1]
// 输出：4
// 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//      偷窃到的最高金额 = 1 + 3 = 4 。

// 示例 2：
// 输入：[2,7,9,3,1]
// 输出：12
// 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//      偷窃到的最高金额 = 2 + 9 + 1 = 12 。

// 提示：
// 1 <= nums.length <= 100
// 0 <= nums[i] <= 400

/**
 * @param {number[]} nums
 * @return {number}
*/
// 注意本题自由度较高，除了上一家不能偷盗，其他的都可以偷盗
var rob = function(nums) {
  // 动态规划五部曲 dp数组的含义、递推公式、dp数组初始化、dp数组遍历顺序、打印dp数组检查
  // dp[i] 偷盗第i家时的总金额 = max(偷盗到上上家时的总金额 + 当前要偷的这家的金额, 偷盗到上家时的总金额) 即选择当前这家偷盗或者不偷盗
  // dp[i] = max(dp[i - 2] + nums[i], dp[i - 1])
  // dp[0] = nums[0]
  // dp[1] = max(nums[0], nums[1])

  if(nums.length <= 3) return Math.max(nums[0] + nums[2], nums[1])

  const dp = new Array(nums.length).fill(0)

  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  // 从哪里开始循环
  for(let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    console.log(dp, dp[i])
  }

  return dp[nums.length - 1]
}

console.log(rob([1,2,3,1])) // 4
console.log(rob([2,7,9,3])) // 11
console.log(rob([7,3,2,9])) // 16

// 考虑到只和前两家有关，所以可以用两个变量来代替数组
var rob1 = function(nums) {

  let dp0 = nums[0]
  let dp1 = Math.max(nums[0], nums[1])

  for(let i = 2; i < nums.length; i++) {
    const temp = dp1
    dp1 = Math.max(dp0 + nums[i], dp1)
    dp0 = temp
  }

  return Math.max(dp0, dp1)
}
console.log(rob1([1,2,3,1])) // 4
console.log(rob1([2,7,9,3])) // 11
console.log(rob1([7,3,2,9])) // 16
