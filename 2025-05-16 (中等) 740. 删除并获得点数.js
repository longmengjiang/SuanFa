/* 
  给你一个整数数组 nums ，你可以对它进行一些操作。

  每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。

  开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

  示例 1：
  输入：nums = [3,4,2]
  输出：6
  解释：
  删除 4 获得 4 个点数，因此 3 也被删除。
  之后，删除 2 获得 2 个点数。总共获得 6 个点数。

  示例 2：
  输入：nums = [2,2,3,3,3,4]
  输出：9
  解释：
  删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
  之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
  总共获得 9 个点数。
  

  提示：
  1 <= nums.length <= 2 * 104
  1 <= nums[i] <= 104
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function(nums) {
  // 先对数组进行排序
  nums.sort((a, b) => a - b)
  // dp[i] 表示删除第i个元素时的最大点数
  const dp = new Array(nums.length).fill(0)
  dp[0] = nums[0]
  let max = nums[0]
  for(let i = 1; i < nums.length; i++) {
    if(nums[i] === nums[i - 1]) {
      dp[i] = dp[i - 1] + nums[i]
    } else if(nums[i] === nums[i - 1] + 1) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    } else {
      dp[i] = dp[i - 1] + nums[i]
    }
    max = Math.max(max, dp[i])
  }
  
  return max
}
// 时间复杂度 O(nlogn) 空间复杂度 O(n)
// 优化：不需要排序，只需要遍历一次数组，记录每个元素出现的次数，然后遍历一次记录的元素，计算最大点数
var deleteAndEarn = function(nums) {
  const map = new Map()
  for(let i = 0; i < nums.length; i++) {
    if(map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + nums[i])
    } else {
      map.set(nums[i], nums[i])
    }
  }
  const dp = new Array(map.size).fill(0)
  let max = 0
  let index = 0
  for(let [key, value] of map) {
    if(index === 0) {
      dp[index] = value
    } else if(index === 1) {
      dp[index] = Math.max(dp[index - 1], value)
    } else {
      dp[index] = Math.max(dp[index - 1], dp[index - 2] + value)
    }
    max = Math.max(max, dp[index])
    index++
  }
  
  return max
}
// 时间复杂度 O(n) 空间复杂度 O(n)