// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

 

// 示例 1:
// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

// 示例 2:
// 输入: strs = [""]
// 输出: [[""]]

// 示例 3:

// 输入: strs = ["a"]
// 输出: [["a"]]

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  // 题目的意思？：将相同字母的扔到一块，然后再按照字典序进行排序输出？
  // 我的疑问：怎么做到第一步

  const map = new Map()
  const arr = []
  for(let i = 0; i < strs.length; i++) {
    const sort = strs[i].split('').sort().join('') // 排序,将相同字母的字符串排序后，得到相同的字符串
    map.set(sort, [...(map.get(sort) || []), strs[i]]) 
    // 解释一下这行代码：如果map中存在sort，则取出sort对应的数组，将strs[i]放入数组中，如果不存在sort，则新建一个数组，将strs[i]放入数组中
    // 再人话点：...(map.get(sort)将 值(值数组['eat', 'tea'])展开成 'eat', 'tea'，然后再添加上 strs[i](是ate)，然后就变成了 'eat', 'tea', 'ate'

    // 将上面这行代码拆解出来
    // if(map.has(sort)) {
    //   map.set(sort, [...map.get(sort), strs[i]])
    // } else {
    //   map.set(sort, [strs[i]])
    // }

  }

  for(const [key, value] of map) {
    arr.push(value)
  }
  return arr
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))

