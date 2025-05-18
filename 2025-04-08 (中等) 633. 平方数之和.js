/**
 * @param {number} c
 * @return {boolean}
 */
var _judgeSquareSum = function (c) {
  // 超绝哈希函数 又又又来了
  // 首次思路：
  // 1. 由于任何整数的平方都是0或者正整数，故直接从0开始遍历整数，有结果时取正负两个
  // 2. 若 a 或者 b 直接大于c，直接返回false
  // if(a > c || b > c) return false

  let hash = {}

  // 存储所有可能的 a^2
  for (let a = 0; a * a <= c; a++) {
      hash[a * a] = true // 将 a^2 存入哈希表
  }

  // 对于每个 a^2 计算 b^2 = c - a^2
  for (let a = 0; a * a <= c; a++) {
      const bSquared = c - a * a // 计算 b^2
      if (bSquared < 0) {
          continue // 不需要继续，如果 b^2 < 0
      }
      if (hash[bSquared]) { // 检查 b^2 是否在哈希表中
          return true // 找到一对 (a, b)
      }
  }

  return false
  // 踩到的坑，类型问题！！！  float 和 int类型
}
console.log(_judgeSquareSum(2)) // true
console.log(_judgeSquareSum(3)) // false


/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
  // 暴力解法： 直接判断有没有（注意数据类型）
  for (let a = 0; a * a <= c; a++) {
      const b = Math.sqrt(c - a * a)
      if (b === Math.floor(b)) return true // math.floor(b)将b向下取整，如果取整后还是原数，则没有问题
  }
  return false

  // 低级错误：又又又犯错误了，return的位置不对，不是在循环里执行 return false，否则只执行一次就结束了。
}

console.log(judgeSquareSum(5)) // true
console.log(judgeSquareSum(3)) // false
