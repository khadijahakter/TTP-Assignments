function findDuplicate(nums) {

    let duplicate = new Set();
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) {
                duplicate.add(nums[i]);
            }
        }

    }
    let arr = Array.from(duplicate);
    return arr;
}

nums = [1, 3, 4, 2, 2]
// nums = [3, 1, 3, 4]
console.log(findDuplicate(nums));

module.exports = findDuplicate;

/*
the same concept is followed as the function to find all duplicate values
given the array has only one duplicate, only one duplicate value is returned
*/