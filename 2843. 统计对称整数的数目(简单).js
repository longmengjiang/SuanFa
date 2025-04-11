// 给你两个正整数 low 和 high 。

// 对于一个由 2 * n 位数字组成的整数 x ，如果其前 n 位数字之和与后 n 位数字之和相等，则认为这个数字是一个对称整数。

// 返回在 [low, high] 范围内的 对称整数的数目 。

// 示例 1：
// 输入：low = 1, high = 100
// 输出：9
// 解释：在 1 到 100 范围内共有 9 个对称整数：11、22、33、44、55、66、77、88 和 99 。

// 示例 2：
// 输入：low = 1200, high = 1230
// 输出：4
// 解释：在 1200 到 1230 范围内共有 4 个对称整数：1203、1212、1221 和 1230 。
 

// 提示：

// 1 <= low <= high <= 10^4

/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countSymmetricIntegers = function (low, high) {
  // 思路：遍历循环每一个数字，对每一个数字进行分解
  // 分解之前要做的事情:判断是总位数是奇数还是偶数
  // 数字是2位数时，将数字变成字符串，会很好操作
  // 数字是4位数时，分解成前两位和后两位进行比较

  let count = 0
  for(let i = low; i <= high; i++) {
    // 如果总位数不是偶数，则直接break
    if(0 < i && i < 100) {
      const num = i.toString()
      if(num[0] === num[1]) count++
    }

    if(999 < i && i < 10000) {
      const num = i.toString()
      if( (+num[0] + +num[1]) === (+num[2] + +num[3]) ) count++
    }
  }
  return count
}
console.log(countSymmetricIntegers(1, 100)) // 9
console.log(countSymmetricIntegers(1200, 1230)) // 4
console.log(countSymmetricIntegers(100, 1782)) // 44
console.log(countSymmetricIntegers(1000, 1782)) // 44
