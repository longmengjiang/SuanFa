// 我们称一个数字字符串是 好数字 当它满足（下标从 0 开始）偶数 下标处的数字为 偶数 且 奇数 下标处的数字为 质数 （2，3，5 或 7）。

// 比方说，"2582" 是好数字，因为偶数下标处的数字（2 和 8）是偶数且奇数下标处的数字（5 和 2）为质数。但 "3245" 不是 好数字，因为 3 在偶数下标处但不是偶数。
// 给你一个整数 n ，请你返回长度为 n 且为好数字的数字字符串 总数 。由于答案可能会很大，请你将它对 109 + 7 取余后返回 。

// 一个 数字字符串 是每一位都由 0 到 9 组成的字符串，且可能包含前导 0 。

 

// 示例 1：
// 输入：n = 1
// 输出：5
// 解释：长度为 1 的好数字包括 "0"，"2"，"4"，"6"，"8" 。

// 示例 2：
// 输入：n = 4
// 输出：400

// 示例 3：
// 输入：n = 50
// 输出：564908303
 

// 提示：
// 1 <= n <= 10^15


// 法一：暴力解法：（会超时，此法不通）
// 1. 遍历所有长度为n的数字字符串，判断是否为好数字
// 2. 好数字的偶数下标处的数字为偶数且奇数下标处的数字为质数
// 3. 时间复杂度为O(n)，空间复杂度为O(1)
// 4. 由于n的范围较大，暴力解法会超时，所以需要优化
/**
 * @param {number} n
 * @return {number}
 */
var countGoodNumbers = function (n) {
  // 暴力解法
  let count = 0

  for(let i = 0; i.toString().length <= n; i++) {

    if (i.toString().length === n) {

      const si = i.toString() // 将数字转换为字符串
      if (si.length > n) return

      for (let j = 0; j < si.length; j++) {
        let access = false
        if (j % 2 === 0 && si[j] % 2 === 0) access = true
        else break
  
        if( j > 10 ) {
          if (j % 2 && (si[j] % 2 === 2 || si[j] % 2 === 3 || si[j] % 2 === 5 || si[j] % 2 === 7)) access = true
          else break
        }
        
        if (access) count++
      }
    }
  }
  return count % (10 ** 9 + 7)
}

// console.log(countGoodNumbers(1)) // 5 正确，也会打印，但也仅此而已
// console.log(countGoodNumbers(8)) // 40000000 正确，也会打印，但也仅此而已
// console.log(countGoodNumbers(9)) // 400000000正确，但是不会打印，直接超时了

// 所以该算法需要优化，而不是使用上面的暴力算法！！！！！！！！！！！！！



// 法二：快速幂运算
/**
 * @param {number} n
 * @return {number}
 */
var countGoodNumbers2 = function (n) {
  // 此题无法使用暴力算法

  const MOD = 10 ** 9 + 7

  // ai得到的逻辑思维：
  // 一个长度为n的字符串，偶数位置可以有02468五种选择，奇数位置可以有2357四种选择
  // 因此对其进行排列组合，可以得到好数字的个数一共是 (符合偶数位置的数字的个数 * 符合奇数位置的数字的个数)
  // 即 (5^evenFuhe) * (4^oddFuhe)
  const evenCount = Math.ceil(n / 2) // 偶数下标的数量
  const oddCount = Math.floor(n / 2) // 奇数下标的数量

  const count = (Fuhe(5, evenCount, MOD) * Fuhe(4, oddCount, MOD)) % MOD

  return count
}
const Fuhe = ( a, b, mod ) => {
  let ans = 1
  a = a % mod
  while(b) {
    if( b & 1) ans = (a * ans) % mod
    a = (a * a) % mod
    b >>= 1
    // b = Math.floor(b / 2) 
  }
  return ans
}
console.log(countGoodNumbers2(50)) // 应该是564908303，而非564908313