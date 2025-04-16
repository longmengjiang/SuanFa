// 给你一个整数数组 nums，你需要确保数组中的元素 互不相同 。为此，你可以执行以下操作任意次：

// 从数组的开头移除 3 个元素。如果数组中元素少于 3 个，则移除所有剩余元素。
// 注意：空数组也视作为数组元素互不相同。返回使数组元素互不相同所需的 最少操作次数 。

// 示例 1：
// 输入： nums = [1,2,3,4,2,3,3,5,7]
// 输出： 2

// 解释：
// 第一次操作：移除前 3 个元素，数组变为 [4, 2, 3, 3, 5, 7]。
// 第二次操作：再次移除前 3 个元素，数组变为 [3, 5, 7]，此时数组中的元素互不相同。
// 因此，答案是 2。


// 示例 2：
// 输入： nums = [4,5,6,4,4]
// 输出： 2

// 解释：
// 第一次操作：移除前 3 个元素，数组变为 [4, 4]。
// 第二次操作：移除所有剩余元素，数组变为空。
// 因此，答案是 2。


// 示例 3：
// 输入： nums = [6,7,8,9]
// 输出： 0

// 解释：
// 数组中的元素已经互不相同，因此不需要进行任何操作，答案是 0。
 

// 提示：
// 1 <= nums.length <= 100
// 1 <= nums[i] <= 100

// 法一：暴力解法：双重for循环
/**
 * @param {number[]} nums
 * @return {number}
 */
// var minimumOperations = function(nums) {
//   // 不知道为什么我总是想到哈希函数
//   // 先想想有什么暴力解法，然后再优化

//   // 暴力解法：for循环，一旦遇到相等的元素，马上执行移除前三个元素操作（如果少于三个，则移除所有）
//   //          每执行一次删除操作，count + 1
//   let count = 0
//   for(let i = 0; i < nums.length - 1; i++) {
//     for(let j = i + 1; j < nums.length; j++) {
//       if(nums[i] === nums[j]) {
//         if(nums.length < 3) {
//           nums.splice(0) // 从索引0开始，删到最后一个
//           count++
//           i = -1 // 重新开始遍历
//         } else {
//           nums.splice(0, 3) // 从索引0开始，移除前三个元素
//           count++
//           i = -1 // 重新开始遍历
//         }
//       }
//     }
//   }
//   return count
// }

// 发现的问题：当执行删除操作后，数组的长度会发生变化，导致遍历错误

// console.log(minimumOperations([4,5,6,4,4])) // 应该是 2
// console.log(minimumOperations([5,7,11,12,12])) // 应该是 2


// 法二：哈希表
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  // 不知道为什么我总是想到哈希函数
  // 先想想有什么暴力解法，然后再优化

  // 哈希函数 遍历数组
  // 判断当前元素是否存在于hash表中，如果存在，则进行删除操作，

  // 此处遇到的坑，while循环的语句结束条件的错误！！！
  // 具体表现为：如果当前数组是互不相同的数组了，但是数组的长度又大于0，则while循环不会结束，所以要手动结束
  // 手动结束的条件一直没有想到，不知道怎么写
  // 但是肯定是nums空了或者其中的元素互不相同就结束了
  // 所以干脆在while循环时进行判断，在 nums空了或者其中的元素互不相同 时就不再进行while循环
  let count = 0


  while (nums.length > 0 && nums.length !== new Set(nums).size) {

    const seen = new Set() // 注意，此处集合要在循环体里面定义

    for (let i = 0; i < nums.length; i++) {
      // 如果当前元素存在于哈希表(集合)中，则进行nums的删除操作，并且count的记录 +1，
      if (seen.has(nums[i])) {
        count++
        const num = nums.length >= 3 ? 3 : nums.length
        nums.splice(0, num)
        // nums.splice(0, Math.min(3, nums.length))  二选一
        break
      }
      seen.add(nums[i])
    }
    
    // 此处是结束while循环的关键！！！ 不要了，这里有误
    // if (seen.size === nums.length) break

    // 在这行代码中，while 循环的结束条件是通过 if (seen.size === nums.length) break 来判断的，但这可能会导致逻辑不够清晰。可以改进为直接在 while 循环的条件中加入更明确的判断条件。

    // 改进后的 while 循环条件如下：
    // while (nums.length > 0 && new Set(nums).size !== nums.length) {}

    // 这样，循环会在以下两种情况下结束：

    // 数组为空（nums.length === 0）
    // 数组中的元素已经互不相同（new Set(nums).size === nums.length）
  }

  return count
}

// 示例用法：
console.log(minimumOperations([1,2,3,4,2,3,3,5,7])) // 应该是 2
console.log(minimumOperations([10,12,12,6,6])) // 应该是 2
