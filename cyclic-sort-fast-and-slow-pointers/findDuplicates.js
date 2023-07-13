function findDuplicates(nums) {

    let duplicates = new Set(); // let duplicates be a set
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) { // duplicate found
                duplicates.add(nums[i]); // add duplicate to the set
            }
        }

    }
    let arr = Array.from(duplicates); // make the set into a array
    return arr; // return duplicates
}

nums = [10, 5, 2, 2, 4, 3, 4, 6, 7, 8, 9, 101, 20, 101]
nums1 = [102, 100, 204, 100, 100, 102]
console.log(findDuplicates(nums));
console.log(findDuplicates(nums1));

module.exports = findDuplicates;

/*
nums = [4,3,2,7,8,2,3,1]
[2,3]

nums = [1,1,2]
[1]

cyclic sort does not mutate the original array and sorts in place
in this solution an array is created to track duplicates, since we had troubke
returning the array at first we used a set and added duplicates to the set
with two for loops where i is assigned the index value and j is assigned index + 1
the set is turned back into an array and duplicate values are returned
*/