// 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 

// 示例 1 ：
// 输入：nums = [2,2,1]
// 输出：1

// 示例 2 ：
// 输入：nums = [4,1,2,1,2]
// 输出：4

// 示例 3 ：
// 输入：nums = [1]
// 输出：1
 

// 提示：
// 1 <= nums.length <= 3 * 10^4
// -3 * 10^4 <= nums[i] <= 3 * 10^4
// 除了某个元素只出现一次以外，其余每个元素均出现两次。

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  const map = new Map() // 键值对表现为：值，数组(数组里是nums里对应的下标)
  // 如果map的值长度为2，则循环继续，否则返回map的键

  for(let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      const arr = map.get(nums[i])
      arr.push(i)
      map.set(nums[i], arr)
      console.log('if', map)
    } else {
      map.set(nums[i], [i])
      console.log('else', map)
    }
  }
  
  for(const [key, value] of map)
  if(value.length === 1) return key
}

console.log(singleNumber([4,1,2,1,2])) // 4
console.log(singleNumber([2,2,1])) // 1
