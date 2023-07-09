// set A question 2
function findDuplicates(nums) {

    let duplicates = new Set();
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) {
                duplicates.add(nums[i]);
            }
        }

    }
    let arr = Array.from(duplicates);
    return arr;
}

nums = [10, 5, 2, 2, 4, 3, 4, 6, 7, 8, 9, 101, 20, 101]
nums1 = [102, 100, 204, 100, 100, 102]
console.log(findDuplicates(nums));
console.log(findDuplicates(nums1));

/*
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]

Input: nums = [1,1,2]
Output: [1]

Input: nums = [1]
Output: []

    steps:
    sort the array
    add duplicate value to new array to return
    but cyclic sort returns undefined, so possibly break up into sub array?

*/