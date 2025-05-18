// 树状数组的核心是一个神奇的 `lowbit` 函数，它获取数字二进制表示中最低位的 1 所代表的值。
function lowBit(i) {
  return (-i) & i
}



// 树状数组类

class fenwickTree {
  // 构造函数
  constructor(size) {
    // 方便记忆，原数组记为  a[1, 2, 3……]
    this.size = size // 原数组的长度 
    this.tree = new Array(size + 1).fill(0) // 树状数组的下标从1开始！！！，并且全初始化为0
  }

  // lowBit函数 获取数字二进制表示中最低位的 1 所代表的值
  lowBit(i) {
    return (-i) & i
  }

  // 点更新  在树状数组的当前元素以及后继(也称 祖宗)上 添加新值
  // locate: 在树的哪个索引  num：要添加的数值
  update(locate, num) {
    // 写法一：
    for(locate; locate <= this.size; locate += lowBit(locate)) this.tree[locate] += num

    // 写法二：
    // while(locate <= this.size) {
    //   this.tree[locate] += num
    //   locate += lowBit(locate)
    // }
  }

  // 区间求和（前缀和）
  // n：原数组前n项的和，复杂度为  O(log n)    一般方法求和为O(n)
  getSum(n) {
    // 求前缀和：定义一个 sum 存放求和后的总值，每次都加上 tree[n]以及所有前驱的值
    let sum = 0
    
    // 写法一：
    for(n; n > 0; n -= lowBit(n)) sum += this.tree[n]

    // 写法二：
    // while(n > 0) {
    //   sum += this.tree[n]
    //   n -= lowBit(n)
    // }

    return sum
  }

  // JS居然不支持重载函数！！！
  getBlockSum(start, end) {
    return this.getSum(end) - this.getSum(start - 1)
  }
}



const arr = [1, 2, 3, 4, 5]
const fenwick = new fenwickTree(arr.length) // 创建一个树状数组实例

for(let i = 0; i < arr.length; i++) fenwick.update(i + 1, arr[i]) // 更新树状数组

console.log(fenwick.getSum(5)) // 15
console.log(fenwick.getBlockSum(3, 5)) // 3 + 4 + 5 = 12


// # 树状数组（Binary Indexed Tree）JavaScript 详细指南

// 树状数组（也称为 Binary Indexed Tree 或 Fenwick Tree）是一种高效处理动态前缀和查询与更新的数据结构。对于新手来说，理解它可能有些挑战，但我会用 JavaScript 示例和详细解释带你逐步掌握它。

// ## 一、什么是树状数组？

// 树状数组是一种可以高效进行以下两种操作的数据结构：
// 1. **单点更新**：给数组中的某个元素加上一个值（时间复杂度 O(log n)）
// 2. **前缀查询**：查询数组前 n 个元素的和（时间复杂度 O(log n)）

// 相比普通数组：
// - 普通数组：单点更新 O(1)，前缀查询 O(n)
// - 前缀和数组：单点更新 O(n)，前缀查询 O(1)
// - 树状数组：两者都是 O(log n)，在频繁更新和查询的场景下非常高效

// ## 二、核心概念：lowbit 函数

// 树状数组的核心是一个神奇的 `lowbit` 函数，它获取数字二进制表示中最低位的 1 所代表的值。

// ```javascript
// function lowbit(x) {
//     return x & -x;
// }
// ```

// 例如：
// - lowbit(6) = 2，因为 6 的二进制是 110，最低位的 1 代表 2
// - lowbit(8) = 8，因为 8 的二进制是 1000
// - lowbit(7) = 1，因为 7 的二进制是 111

// ## 三、树状数组的实现

// ### 1. 初始化树状数组

// ```javascript
// class FenwickTree {
//     constructor(size) {
//         this.size = size;
//         this.tree = new Array(size + 1).fill(0); // 树状数组下标从1开始
//     }
    
//     // 更新操作：给位置i的元素加上delta
//     update(i, delta) {
//         while (i <= this.size) {
//             this.tree[i] += delta;
//             i += lowbit(i); // 向上更新父节点
//         }
//     }
    
//     // 查询操作：求前i个元素的和
//     query(i) {
//         let sum = 0;
//         while (i > 0) {
//             sum += this.tree[i];
//             i -= lowbit(i); // 向左查询前驱节点
//         }
//         return sum;
//     }
    
//     // 区间查询：[i, j]的和
//     rangeQuery(i, j) {
//         return this.query(j) - this.query(i - 1);
//     }
// }
// ```

// ### 2. 使用示例

// ```javascript
// // 原始数组
// const nums = [1, 3, 5, 7, 9, 11]; // 下标从0开始

// // 初始化树状数组
// const fenwick = new FenwickTree(nums.length);

// // 构建树状数组
// for (let i = 0; i < nums.length; i++) {
//     fenwick.update(i + 1, nums[i]); // 注意树状数组下标从1开始
// }

// console.log(fenwick.query(3)); // 前3个元素的和：1 + 3 + 5 = 9
// console.log(fenwick.rangeQuery(2, 4)); // 第2到第4个元素的和：3 + 5 + 7 = 15

// // 更新第3个元素（原始数组的索引2）加2
// fenwick.update(3, 2); // 5 → 7

// console.log(fenwick.query(3)); // 现在前3个元素的和：1 + 3 + 7 = 11
// ```

// ## 四、详细原理解释

// ### 1. 树状数组结构

// 树状数组的每个节点存储的是一段区间的和：
// - `tree[1]` = `nums[0]`
// - `tree[2]` = `nums[0] + nums[1]`
// - `tree[3]` = `nums[2]`
// - `tree[4]` = `nums[0] + nums[1] + nums[2] + nums[3]`
// - 以此类推

// ### 2. 更新操作流程

// 当更新 `nums[i]` 时，需要更新所有包含它的区间：（即更新 **所有后继**，`tree[i]的直接后继为tree[i + lowbit(i)`）
// 1. 从 `i+1` 开始（因为树状数组下标从1开始）
// 2. 每次加上 `lowbit(i)`，直到超过数组长度
// 3. 沿途所有节点都加上变化值

// 例如更新 `nums[2]`（即第3个元素）：
// - 更新 `tree[3]`
// - `3 + lowbit(3)=4` → 更新 `tree[4]`
// - `4 + lowbit(4)=8` → 如果数组长度≥8则更新 `tree[8]`

// ### 3. 查询操作流程

// 查询前 `i` 个元素的和：（即每次要加上 **所有前驱**，`tree[i]的直接前驱为tree[i - lowbit(i)]`）
// 1. 从 `i` 开始
// 2. 每次减去 `lowbit(i)`，直到为0
// 3. 累加沿途所有节点的值

// 例如查询前5个元素的和：
// - 加上 `tree[5]`
// - `5 - lowbit(5)=4` → 加上 `tree[4]`
// - `4 - lowbit(4)=0` → 结束
// - 总和 = `tree[5] + tree[4]`

// ## 五、实际应用场景

// ### 1. 计算逆序对

// ```javascript
// function countInversions(nums) {
//     // 离散化处理
//     const sorted = [...new Set(nums)].sort((a, b) => a - b);
//     const rank = new Map(sorted.map((num, idx) => [num, idx + 1]));
    
//     const fenwick = new FenwickTree(sorted.length);
//     let inversions = 0;
    
//     // 从后向前遍历
//     for (let i = nums.length - 1; i >= 0; i--) {
//         const r = rank.get(nums[i]);
//         inversions += fenwick.query(r - 1); // 查询比当前数小的数的个数
//         fenwick.update(r, 1); // 当前数出现次数+1
//     }
    
//     return inversions;
// }

// console.log(countInversions([5, 3, 2, 4, 1])); // 输出逆序对数量
// ```

// ### 2. 区间更新与单点查询（差分数组）

// ```javascript
// class FenwickTreeRangeUpdate {
//     constructor(size) {
//         this.size = size;
//         this.tree1 = new Array(size + 1).fill(0); // 维护差分数组
//         this.tree2 = new Array(size + 1).fill(0); // 维护i*差分数组
//     }
    
//     // 区间[l,r]加上val
//     rangeUpdate(l, r, val) {
//         this._update(l, val);
//         this._update(r + 1, -val);
//     }
    
//     _update(i, val) {
//         const v1 = val;
//         const v2 = i * val;
//         while (i <= this.size) {
//             this.tree1[i] += v1;
//             this.tree2[i] += v2;
//             i += lowbit(i);
//         }
//     }
    
//     // 查询前i个元素的和
//     query(i) {
//         let sum = 0;
//         let x = i;
//         while (i > 0) {
//             sum += (x + 1) * this.tree1[i] - this.tree2[i];
//             i -= lowbit(i);
//         }
//         return sum;
//     }
    
//     // 单点查询
//     get(i) {
//         return this.query(i) - this.query(i - 1);
//     }
// }
// ```

// ## 六、与线段树的比较

// | 特性 | 树状数组 | 线段树 |
// |------|----------|--------|
// | 代码复杂度 | 简单 | 复杂 |
// | 时间复杂度 | 两者相同 | 两者相同 |
// | 功能 | 主要处理前缀和 | 可以处理各种区间操作 |
// | 空间 | O(n) | O(4n) |
// | 适用场景 | 前缀和、逆序对 | 区间最值、复杂区间操作 |

// ## 七、常见问题解答

// **Q: 为什么树状数组下标从1开始？**
// A: 因为 lowbit(0) = 0 会导致无限循环，从1开始更方便计算

// **Q: 树状数组能处理最大值/最小值吗？**
// A: 可以但不推荐，实现复杂且效率不如线段树，建议用线段树处理最值问题

// **Q: 如何选择树状数组和线段树？**
// A: 如果只需要前缀和/单点更新，用树状数组；需要更复杂的区间操作，用线段树

// ## 八、完整示例：动态排名系统

// ```javascript
// class DynamicRanking {
//     constructor(maxValue) {
//         this.maxValue = maxValue;
//         this.ft = new FenwickTree(maxValue);
//     }
    
//     // 插入一个数
//     insert(num) {
//         this.ft.update(num, 1);
//     }
    
//     // 删除一个数
//     remove(num) {
//         this.ft.update(num, -1);
//     }
    
//     // 查询小于num的数的个数
//     rank(num) {
//         return this.ft.query(num - 1);
//     }
    
//     // 查询第k小的数（k从1开始）
//     select(k) {
//         let left = 1, right = this.maxValue;
//         while (left < right) {
//             const mid = Math.floor((left + right) / 2);
//             if (this.ft.query(mid) < k) {
//                 left = mid + 1;
//             } else {
//                 right = mid;
//             }
//         }
//         return left;
//     }
// }

// const dr = new DynamicRanking(100);
// dr.insert(5);
// dr.insert(3);
// dr.insert(8);
// dr.insert(3);
// console.log(dr.rank(5)); // 输出2（有两个数小于5）
// console.log(dr.select(2)); // 输出3（第2小的数是3）
// ```

// 通过这个指南，你应该已经掌握了树状数组的基本概念、实现方法和实际应用。记住，理解 lowbit 函数是关键，而多练习实际编码会帮助你更好地掌握这种数据结构。