# 搜索

搜索有，顺序搜索和二分查找，顺序搜索是条件最差的。
二分查找针对的是一个有序的数据集合，查找思想有点类似分治思想。每次都通过跟区间的中间元素对比，将待查找的区间缩小为之前的一半，直到找到要查找的元素，或者区间被缩小为 0。    

**二分查找应用场景的局限性**    
首先，二分查找依赖的是顺序表结构，简单点说就是数组。主要原因是二分查找算法需要按照下标随机访问元素。
如果数据使用链表存储，二分查找的时间复杂就会变得很高。

其次，二分查找针对的是有序数据。    

再次，数据量太小不适合二分查找。只有数据量比较大的时候，二分查找的优势才会比较明显，处理的数据量很小，完全没有必要用二分查找，顺序遍历就足够了。    

最后，数据量太大也不适合二分查找。    

二分查找的底层需要依赖数组这种数据结构。要求内存空间连续，对内存的要求比较苛刻。



## 1. 二分查找

```js
// 数组必须是有序，且无重复元素
function binaryFind(sortedArr,target){
    if(sortedArr.length === 0 ) return -1
    let low = 0
        high = sortedArr.length - 1
    while(low <= high){
        let mid = Math.floor( (high + low)/2 )
        if(targe === mid){
            return mid
        }else if(target < mid){
            high = mid -1
        }else{
            low = mid +1
        }
    }
    return -1
}

```
## 2. 应用: 二分查找的变形问题

> 问题1： 如何快速定位IP对应的省份地址？

变形问题1： 查找第一个等于给定值
```js
function binaryFindFirst(sortedArr,target){
    if(sortedArr.length === 0) return -1
    let low = o
        high = sortedArr.length - 1
    while(low <= high){
        const mid = Math.floor( (low + high)/2)
        if(target < sortedArr[mid]){
            high = mid - 1
        }else if(target > sortedArr[mid]){
            low = mid + 1
        }else{
            //判断左边是否有相同大小的数据
            if(mid === 0 || sortedArr[mid - 1] < target ) return mid
            high = mid - 1
        }
    }
    return -1
}
```

变形问题2： 查找最后一个相等的数
```js
function binaryFindLast(sortedArr,target){
    if(sortedArr.length == 0) return -1
    let low = 0
        high = sortdArr.length - 1
    while(low <= high){
        const mid = Math.floor( (low + high)/2 )
        if(target < sortedArr[mid]){
            high = mid - 1
        }else if(target > sortedArr[mid]){
            low = mid + 1
        }else{
            if(mid === sortedArr.length - 1 || sortedArr[mid + 1] > target) return mid
            low = mid + 1
        }

    }
    return -1
}
```

变形问题3： 查找第一个大于等于给定值的元素
```js
function binaryFindFirstBig(sortedArr,target){
    if(sortedArr.length === 0 ) return -1
    let low = 0
        high = sortedArr.length - 1
    while(low <= high){
        let mid = Math.floor( (low + high)/2 )
        if(sortedArr[mid] < target){
            low = mid + 1
        }else{
            if(sortedArr[mid - 1] < target || mid === 0) return mid
            high = mid - 1
        }
    }
    return -1
}
```

变形问题4： 查找最后一个小于等于给定值的元素
```js
function binaryFindLastSmall(sortedArr,target){
    if(sortedArr.length === 0) return -1
    let low = 0
        high = sortedArr.length -1
    while(low <= high){
        const mid = Math.floor( (low + high)/2 )
        if(sortedArr[mid] > target){
            high = mid - 1
        }else{
            if(mid === sortedArr.length - 1 || sortedArr[mid + 1] > target) return -1
            low = mid + 1
        }
    }
}
```

