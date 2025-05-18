/**
 * @param {string[]} words
 * @param {string} s
 * @return {number}
 */
var countPrefixes = function (words, s) {
  // 我的思路：将字符串s的前缀 存为一个数组arr，然后通过遍历words，判断是否有与arr里相同的
  let count = 0
  let arr = []
  for (const item of s) {
      // for(let i = 0; i < arr.length; i++) {
      //     if(arr[i] === item) break
      // }
      arr.push(item) // a  aa 
      console.log(arr);
      
  }
  for (let i = 0; i < s.length; i++) {
      for (let j = 0; j < words.length; j++) {
          if (s[i] === words[j]) count++
      }
  }
  return count
};
countPrefixes([ "a", 'a'], "aa")