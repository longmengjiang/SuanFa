// 给你一个下标从 0 开始的整数数组 nums 。如果 i < j 且 j - i != nums[j] - nums[i] ，那么我们称 (i, j) 是一个 坏数对 。

// 请你返回 nums 中 坏数对 的总数目。

 

// 示例 1：
// 输入：nums = [4,1,3,3]
// 输出：5
// 解释：数对 (0, 1) 是坏数对，因为 1 - 0 != 1 - 4 。
// 数对 (0, 2) 是坏数对，因为 2 - 0 != 3 - 4, 2 != -1 。
// 数对 (0, 3) 是坏数对，因为 3 - 0 != 3 - 4, 3 != -1 。
// 数对 (1, 2) 是坏数对，因为 2 - 1 != 3 - 1, 1 != 2 。
// 数对 (2, 3) 是坏数对，因为 3 - 2 != 3 - 3, 1 != 0 。
// 总共有 5 个坏数对，所以我们返回 5 。

// 示例 2：
// 输入：nums = [1,2,3,4,5]
// 输出：0
// 解释：没有坏数对。
 

// 提示：
// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^9

/**
 * @param {number[]} nums
 * @return {number}
 */
var countBadPairs_Hash = function(nums) {
  const n = nums.length
  const map = new Map()
  let goodPairs = 0
  
  // 遍历数组，统计 i - nums[i] 相等的数量
  for (let i = 0; i < n; i++) {
      const diff = i - nums[i]

      goodPairs += map.get(diff) || 0
      map.set(diff, (map.get(diff) || 0) + 1) // map对于相同的键，只会更新值，这就是为什么要 +1
  }
  
  // 总数对减去好数对就是坏数对  总数对就是 n * (n - 1) / 2，数列的求和公式
  return (n * ((n - 1) / 2)) - goodPairs
}

// console.log(countBadPairs_Hash([4,1,3,3])) // 5
// console.log(countBadPairs_Hash([1,2,3,4,5])) // 0


/**
 * @param {number[]} nums
 * @return {number}
 */
var countBadPairs_Hash1 = function(nums) {
  const len = nums.length
  const map = new Map()
  let goodPairs = 0
  
  // 遍历数组，统计 i - nums[i] 相等的数量
  // 1. 使用一个哈希表（对象）来记录每个 i - nums[i] 的出现次数。
  // 2. 遍历数组，对每个j，计算 j - nums[j]，检查之前已经记录的 i - nums[i] 的数量。
  // 3. 对当前 j 的 j - nums[j] 进行统计，用以计算坏数对的数量。
  for (let i = 0; i < len; i++) {
      const currentKey = i - nums[i]

      if(map.has(currentKey)) {
        goodPairs += map.get(currentKey)
        // break // 此处能不能break呢，就算当前位置有，也要加上当前位置，所以不能
      }
      map.set(currentKey, (map.get(currentKey) || 0) + 1 ) // map对于相同的键，只会更新值，这就是为什么要 +1
  }
  
  // 总数对减去好数对就是坏数对  总数对就是 n * (n - 1) / 2，数列的求和公式
  return (len * ((len - 1) / 2)) - goodPairs
}
console.log(countBadPairs_Hash1([4,1,3,3])) // 5
console.log(countBadPairs_Hash1([1,2,3,4,5])) // 0