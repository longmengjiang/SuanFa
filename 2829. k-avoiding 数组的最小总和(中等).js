// 给你两个整数 n 和 k 。

// 对于一个由 不同 正整数组成的数组，如果其中不存在任何求和等于 k 的不同元素对，则称其为 k-avoiding 数组。

// 返回长度为 n 的 k-avoiding 数组的可能的最小总和。
// 示例 1：

// 输入：n = 5, k = 4
// 输出：18
// 解释：设若 k-avoiding 数组为 [1,2,4,5,6] ，其元素总和为 18 。
// 可以证明不存在总和小于 18 的 k-avoiding 数组。
// 示例 2：

// 输入：n = 2, k = 6
// 输出：3
// 解释：可以构造数组 [1,2] ，其元素总和为 3 。
// 可以证明不存在总和小于 3 的 k-avoiding 数组。 
 

// 提示：

// 1 <= n, k <= 50

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minimumSum = function (n, k) {
  // 很好啊，我马上的想法就是哈希表，酷似两数之和
  // 思路：
  // 1. n >= k  直接return 0??????? →  假设数组长为n且全为1，则数组值之和为 n?????? 这句话是错误的!!!
  // 2. n > k  
  // 2.1 假设数组为递增数列123456……
  //     定义一个hash = {}
  //     将数列依次进行遍历，如果匹配到有与另一个之和为k的，则不将该数压入hash，而是结束本次循环，进入下一个数的循环，直至hash的长度达到n(使用for循环)
  // 2.2 for循环的长度限制？ ×  应该使用while循环，并且使用count来记录压入了hash的个数，即使用count来控制循环 

  // if (n >= k) return 0
  let hash = {}
  let num = 1
  let count = 1
  let sum = 0
  while (count <= n) {
      const rem = num
      const comp = k - rem
      if (!hash[comp]) {// 如果hash中没有对应的值，则压入hash，并且count和sum都加
          console.log(rem);
          
          hash[rem] = true
          count++
          sum += rem
      }
      num++
  }
  console.log(sum);
  
  return sum

  // for (let i = 0; i < 999; i++) {
  //     const rem = i
  //     const comp = k - i
  //     if (!hash[comp]) {// 如果hash中没有对应的值，则压入hash
  //         hash[rem] = (hash[rem] || 0)
  //     }
  // }
};
minimumSum(5,4)