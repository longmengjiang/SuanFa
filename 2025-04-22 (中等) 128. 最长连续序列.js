// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 

// 示例 1：
// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

// 示例 2：
// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9

// 示例 3：
// 输入：nums = [1,0,1,2]
// 输出：3
 

// 提示：

// 0 <= nums.length <= 10^5
// -10^9 <= nums[i] <= 10^9

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length === 0) return 0;

  const set = new Set(nums); // 使用Set去重，并提供O(1)的查找
  let maxLength = 1;

  for (const num of set) {
    // 只从连续序列的起点开始计数
    if (!set.has(num - 1)) {
      let currentNum = num
      let currentLength = 1

      // 向后向前 查找连续的数字
      while (set.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }
      maxLength = Math.max(maxLength, currentLength);
    }
  }
  return maxLength;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])) // 4