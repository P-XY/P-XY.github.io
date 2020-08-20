# 排序

| 排序算法 | 时间复杂度 | 是否基于比较 |
| --- | --- | --- |
| 冒泡、插入、选择 | O( n^2 ) | yes |
| 快排、归并 | O( nlogn ) | yes |
| 桶、计数、基数 | O( n ) | no |

冒泡和选择排序，可能就纯粹停留在理论的层面了，学习的目的也只是为了开拓思维，实际开发中应用并不多，但是插入排序还是挺有用的。这三种算法适合小规模数据的排序。    

归并排序和快速排序都用到了分治思想，而分治算法一般使用递归来实现。
（分治是一种解决问题的处理思想，递归是一种编程技巧，这两者并不冲突。）
这两种排序算法适合大规模的数据排序，比前三种排序算法要更常用。        

桶、计数、基数排序，都是线性排序算法，时间复杂度比较低，适用场景比较特殊。    


## 0. 如何分析一个排序算法? 
分析一个排序算法，需要从以下几个方面入手：

1. 排序算法的执行效率。    
(1) 最好情况、最坏情况、平均情况的，时间复杂度。    
(2) 时间复杂度的系数、常数、低阶。        
规模很小的数据，在对同一阶时间复杂度的排序算法性能对比的时候，就要把系数、常数、低阶也考虑进来。    
(3) 比较次数和交换（或移动）次数。      
基于比较的排序算法的执行过程，会涉及两种操作，一种是元素比较大小，另一种是元素交换或移动。所以，如果我们在分析排序算法的执行效率的时候，应该把比较次数和交换（或移动）次数也考虑进去。

2. 排序算法的内存消耗       
算法的内存消耗可以通过空间复杂度来衡量,原地排序，就是特指空间复杂度是 O(1) 的排序算法.

3. 排序算法的稳定性    
这个概念是说，如果待排序的序列中存在值相等的元素，经过排序之后，相等元素之间原有的先后顺序不变

## 1. 冒泡排序（Bubble Sort）
1. 冒泡排序是原地排序，它的空间复杂度为 O(1)
2. 冒泡排序是稳定的排序，当有相邻的两个元素大小相等的时候，我们不做交换，相同大小的数据在排序前后不会改变顺序
3. 冒泡排序的时间复杂度，最好情况时间复杂度是 O(n)，只需要进行一次冒泡操作；最坏的情况是，要排序的数据刚好是倒序排列的，我们需要进行 n 次冒泡操作，所以最坏情况时间复杂度为 O(n2)。平均时间复杂度就是加权平均期望时间复杂度，分析的时候要结合概率论的知识。

```js
function bubbleSort(arr){
    if(arr.length <= 1) return
    for(let i = 0; i < arr.length; i++){
        //考虑最好的情况为 O（n)
        let hasChange = false
        for(j = 0; j < arr.length - 1;j++){
            if(arr[j] > arr[j+1]){
                [ arr[j],[arr[j+1] ] = [ arr[j+1], arr[j] ]
                hasChange = true
            }
        }
        if(!hasChange) break
    }
}
```
## 2. 插入排序
1. 是原地排序
2. 是稳定的排序
3. 时间复杂度，最好为O(n),最差为 O(n^2)

```js
function insertionSort(arr){
    for(let i = 1; i < arr.length; i++ ){
        for(let j = i; j >= 1; j--){
            if(arr[j] < arr[j-1]){
                [ arr[j], arr[j-1] ] = [ arr[j-1], arr[j] ]
            }else{
                break
            } 
        }
    }
    console.log(arr)
}
```
## 3. 选择排序

1. 是原地排序
2. 不是稳定的排序
3. 时间复杂度，最好和最差都为 O(n^2)
```js
function selectionSort(arr){
    for(let i = 0;i < arr.length-1;i++){
        let minValueIndex = i
        for(let j = i+1;j < arr.length; j++){
            if(arr[j] < arr[minValueIndex]){
                minValueIndex = j
            }
        }
        [ arr[i],arr[minValueIndex] ] = [ arr[minValueIndex], arr[i] ]
    }
    console.log(arr)
}
```

## 4. 归并排序

1. 归并排序是一个稳定的排序算法 
2. 归并排序的时间复杂度是 O(nlogn)
3. 归并排序不是原地排序算法,空间复杂度是 O(n) 
   
```js
function mergeSort(arr){
    if(arr.length <= 1 ) return arr
    let middle = Math.floor( arr.length / 2)
    let left = arr.slice(0,middle)
    let right = arr.slice(middle)
    return merge( mergeSort(left),mergeSort(right) )
}
function merge(left,right){
    let leftIndex = 0
    let rightIndex = 0
    let temp = []
    while( leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex] < rightIndex[rightIndex]){
            temp.push(left[leftIndex])
            leftIndex++
        }else{
            temp.push(right[rightIndex])
            rightIndex++
        }
    }
    return temp.concat( left.slice(leftIndex)).concat(right.slice(rightIndex))
}

```       

## 5. 快排    

> 思考题1: 求无序数组的第k大元素，要求时间复杂度为O(n)

> 思考题2： 假设内存只有 1GB，如何把 10 个 300MB 的有序文件，合并成一个有序的大文件hz

1. 快排是一种原地、不稳定的排序算法
2. 时间复杂度 O(nlog n) ~ O(n^2)，屈取决于pivot 选择是否合适 

```js
function quickSort(arr,left,right){
    if(left < right){
        let partitionIndex = partition(arr,left,right)
        quickSort(arr,left,partitionIndex - 1 > left ? partitionIndex - 1 : left )//左边排序
        quickSort(arr,partitionIndex + 1, partitionIndex + 1 < right ? right : partitionIndex + 1)
    }
}
function partition(arr,left,right){
    let pivot = arr[right] //选择最左边的话，假如遇到排好序的情况会变成O(n^2),所以选最右边或者中间
    let partitionIndex = left
    for(let i = left; i < right; i++){
        if(arr[i] < pivot){
            [ arr[i], arr[partitionIndex] ] = [ arr[partitionIndex], arr[i] ]//把所有 < pivot 的值都排在 partittionIndex 之前
            partitionIndex++
        }
    }
    [ arr[partitionIndex], arr[right] ] = [ arr[right], arr[partitionIndex] ] //把pivot值放在中间： x < pivot < y
    return partitionIndex
}
```
## 6. 桶排序

桶排序比较适合用在外部排序中。所谓的外部排序就是数据存储在外部磁盘中，数据量比较大，内存有限，无法将数据全部加载到内存中。

> 应用案列： 根据年龄为 100w 用户排序。

```js
function bucketSort(arr, bucketSize=5){ //bucketSize 是桶的大小
    if(arr.length < 2) return arr
    const buckets = createBuckets(arr,bucketSize)
    return sortBuckets(buckets)
}
function createBuckets(arr,bucketSize){
    let minValue = arr[0]
    let maxValue = arr[0]
    //找出最小最大值
    for(let i = 1; i < arr.length;i++){
        if(arr[i] < minValue){
            minValue = arr[i]
        }else if(arr[i] > maxValue){
            maxValue = arr[i]
        }
    }
    //根据最小最大值，计算出桶的个数
    const bucketCount = Math.floor( (maxValue - minValue)/bucketSize) + 1)
    //建立一个二维数组，将桶存放在 buckets 中
    const buckets = []
    for(let i = 0;i < bucketCount; i++){
        buckets[i] = []
    }
    //计算每个值放入哪个桶中
    for( let i = 0; i < arr.length; i ++){
        let bucketIndex = Math.floor( (arr[i] - minValue)/ bucketSize)
        buckets[bucketIndex].push(arr[i])
    }
    return buckets
}
function sortBuckets(buckets){
    let sortedArray = []
    for(let i = 0; i < buckets.length;i++){
        if(buckets[i] != null){
            quickSort(buckets[i]) //调用快排排序
            sortedArray.push(...buckets[i])
        }
    }
    return sortedArray
}

```

## 7. 计数排序

计数排序其实是桶排序的一种特殊情况，每个桶只存放一个单位的元素。

> 应用案例： 根据高考成绩，为50w 考生排序。
``` js
function countingSort(arr){
    if(arr.length <= 1) return arr
    let max = findMaxValue(arr)
    //创建一个 counts 长度的数组，下标 0 ~ max ,
    let counts = new Array( max +1)
    arr.forEach( element =>{
        if(!counts[element]){
            counts[element] = 0
        }
        counts[element]++
    })
    //对原数组排序,counts 里的 ele 是 元素出现的总数，index 其实是元素
    let sortIndex = 0
    counts.forEach( (ele,index) =>{
        while(ele > 0){
            arr[sortIndex] = index
            ele--
            sortIndex++
        }
    })
    return arr
}
function findMaxValue(arr){
    let max = arr[0]
    for(let i = 1;i < arr.length; i++){
        if(arr[i] > max){
            max = arr[i]
        }
    }
    return max
}
```

## 8. 基数排序

> 应用案例：对 10w 个手机号排序

手机号码是 11 位，范围太大，不适合用桶排 和计数排。
基数排序，是从低位到高位排，先根据最小的一位排，一次到最高位。 假设元素的长度不一样，可以用 0 补全。

## 9. 实现一个通用的、高性能的排序函数

线性排序算法的时间复杂度比较低，适用场景比较特殊。所以如果要写一个通用的排序函数，不能选择线性排序算法。    

如果对小规模数据进行排序，可以选择时间复杂度是 O(n2) 的算法；如果对大规模数据进行排序，时间复杂度是 O(nlogn) 的算法更加高效。所以，为了兼顾任意规模数据的排序，一般都会首选时间复杂度是 O(nlogn) 的排序算法来实现排序函数。    

时间复杂度是 O(nlogn) 的排序算法有很多，除了归并和快排，还有堆排序。堆排序和快速排序都有比较多的应用，比如 Java 语言采用堆排序实现排序函数，C 语言使用快速排序实现排序函数。    


## 10. Arrays.sort 的源码

Arrays.sort的源码，主要采用TimSort算法, 大致思路是这样的：

1. 元素个数 < 32, 采用二分查找插入排序(Binary Sort)
2. 元素个数 >= 32, 采用归并排序，归并的核心是分区(Run)
3. 找连续升或降的序列作为分区，分区最终被调整为升序后压入栈
4. 如果分区长度太小，通过二分插入排序扩充分区长度到分区最小阙值
5. 每次压入栈，都要检查栈内已存在的分区是否满足合并条件，满足则进行合并
6. 最终栈内的分区被全部合并，得到一个排序好的数组

Timsort的合并算法非常巧妙：

1. 找出左分区最后一个元素(最大)及在右分区的位置
2. 找出右分区第一个元素(最小)及在左分区的位置
3. 仅对这两个位置之间的元素进行合并，之外的元素本身就是有序的
