/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function(nums) {
  // 不知道为什么我总是想到哈希函数
  // 先想想有什么暴力解法，然后再优化

  // 暴力解法：for循环，一旦遇到相等的元素，马上执行移除前三个元素操作（如果少于三个，则移除所有）
  //          每执行一次删除操作，count + 1
  let count = 0
  for(let i = 0; i < nums.length - 1; i++) {
    for(let j = i + 1; j < nums.length; j++) {
      if(nums[i] === nums[j]) {
        if(nums.length < 3) {
          nums.splice(0) // 从索引0开始，删到最后一个
          count++
          i = -1 // 重新开始遍历
        } else {
          nums.splice(0, 3) // 从索引0开始，移除前三个元素
          count++
          i = -1 // 重新开始遍历
        }
      }
    }
  }
  return count
}

// 发现的问题：当执行删除操作后，数组的长度会发生变化，导致遍历错误

console.log(minimumOperations([4,5,6,4,4])) // 应该是 2
console.log(minimumOperations([5,7,11,12,12])) // 应该是 2

