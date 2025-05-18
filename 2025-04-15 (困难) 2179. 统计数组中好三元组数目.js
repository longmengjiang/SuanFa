
// 备注：此题今日无解，涉及到树状数组，姑本题未解出来，而是去学习了树状数组，并完成 力扣第 315题 计算右侧小于当前元素的个数 的题目。
// 再次备注：好吧其实我是垃圾，连315题都做不出来

// 给你两个下标从 0 开始且长度为 n 的整数数组 nums1 和 nums2 ，两者都是 [0, 1, ..., n - 1] 的 排列 。

// 好三元组 指的是 3 个 互不相同 的值，且它们在数组 nums1 和 nums2 中出现顺序保持一致。换句话说，如果我们将 pos1v 记为值 v 在 nums1 中出现的位置，pos2v 为值 v 在 nums2 中的位置，那么一个好三元组定义为 0 <= x, y, z <= n - 1 ，且 pos1x < pos1y < pos1z 和 pos2x < pos2y < pos2z 都成立的 (x, y, z) 。

// 请你返回好三元组的 总数目 。


// 我的人话补充，比较的是索引的位置，不是值的大小 ！！！！！


// 示例 1：
// 输入：nums1 = [2,0,1,3], nums2 = [0,1,2,3]
// 输出：1
// 解释：
// 总共有 4 个三元组 (x,y,z) 满足 pos1x < pos1y < pos1z ，分别是 (2,0,1) ，(2,0,3) ，(2,1,3) 和 (0,1,3) 。
// 这些三元组中，只有 (0,1,3) 满足 pos2x < pos2y < pos2z 。所以只有 1 个好三元组。

// 示例 2：
// 输入：nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
// 输出：4
// 解释：总共有 4 个好三元组 (4,0,3) ，(4,0,2) ，(4,1,3) 和 (4,1,2) 。
 

// 提示：
// n == nums1.length == nums2.length
// 3 <= n <= 10^5
// 0 <= nums1[i], nums2[i] <= n - 1
// nums1 和 nums2 是 [0, 1, ..., n - 1] 的排列。


// 暴力解法(这个函数解题错误了——没有考虑到nums1和nums2的顺序问题，nums1和nums2的顺序是不同的，所以不能直接比较)
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
/* 解题错误！！！ */
var goodTriplets1 = function(nums1, nums2) { // 错误解题
  // 暴力算法
  // 先计算出nums1的好三元组，存在一个新数组里，再计算出nums2的好三元组，看是否有与nums1相同的好三元组
  // 排列组合？
  let count = 0

  function find (arr) {
    let Arr = []
    for(let i = 0; i < arr.length; i++)
    for(let j = i + 1; j < arr.length; j++)
    for(let k = j + 1; k < arr.length; k++) {
      let seen = []
      console.log(arr[i] < arr[j] && arr[j] < arr[k])
      if(arr[i] < arr[j] && arr[j] < arr[k]) {
        console.log(arr[i], arr[j], arr[k]);
        
        seen.push(arr[i], arr[j], arr[k])
        Arr.push(seen)
      }
    }
    return Arr
  }

  const Nums1 = find(nums1)
  const Nums2 = find(nums2)
  
  for(let i = 0; i < Nums1.length; i++)
  for(let j = 0; j < Nums1.length; j++) 
  if(JSON.stringify(Nums1[i]) === JSON.stringify(Nums2[j])) count++

  return count
}

console.log(goodTriplets1([13,14,10,2,12,3,9,11,15,8,4,7,0,6,5,1], [8,7,9,5,6,14,15,10,2,11,4,13,3,12,1,0])) // 77
console.log(goodTriplets1([2,0,1,3], [0,1,2,3])) // 1

// console.log([0,1,3] === [0,1,3]) // 注意，此语句会返回false，因为数组是引用类型，比较的是引用地址

// 映射构建法————超出时间限制了————————也不好用
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function goodTriplets(nums1, nums2) {
  const n = nums1.length // n 是数组的大小
  const pos1 = new Array(n) // 创建一个数组 pos1，用来记录 nums1 中元素的索引
  const pos2 = new Array(n) // 创建一个数组 pos2，用来记录 nums2 中元素的索引

  // 构建 nums1 和 nums2 的位置映射
  for (let i = 0; i < n; i++) {
      pos1[nums1[i]] = i // nums1 中元素 nums1[i] 的位置
      pos2[nums2[i]] = i // nums2 中元素 nums2[i] 的位置
  }

  let goodTripletsCount = 0 // 初始化好三元组计数

  // 对于每个元素作为候选的中间元素 y
  for (let y = 0; y < n; y++) {
      const yVal = nums1[y] // 取出当前中间元素的值
      const yIndex1 = pos1[yVal] // 这个值在 nums1 中的位置
      const yIndex2 = pos2[yVal] // 这个值在 nums2 中的位置

      // 计算前面可选的 x 元素数量
      let countX = 0
      for (let x = 0; x < y; x++) { // 遍历 nums1 中 y 之前的所有元素
          if (pos1[nums1[x]] < yIndex1 && pos2[nums1[x]] < yIndex2) {
              countX++ // 满足条件的 x 计数
          }
      }

      // 计算后面可选的 z 元素数量
      let countZ = 0
      for (let z = y + 1; z < n; z++) { // 遍历 nums1 中 y 之后的所有元素
          if (pos1[nums1[z]] > yIndex1 && pos2[nums1[z]] > yIndex2) {
              countZ++ // 满足条件的 z 计数
          }
      }

      // 每个中间元素 y 对应的好三元组数量为 countX * countZ
      goodTripletsCount += countX * countZ
  }

  return goodTripletsCount // 返回总的好三元组数
}

// 示例用法
console.log(goodTriplets([2,0,1,3], [0,1,2,3])) // 1
console.log(goodTriplets([13,14,10,2,12,3,9,11,15,8,4,7,0,6,5,1], [8,7,9,5,6,14,15,10,2,11,4,13,3,12,1,0])) // 77
