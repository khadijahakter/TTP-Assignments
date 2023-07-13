function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    while (left < right) { // numbers[0] < numbers.length - 1
        if (numbers[left] + numbers[right] === target) { // target is found
            return [numbers[left], numbers[right]]; // return the integers
        }
        else if (numbers[left] + numbers[right] < target) { // target is greater
            left++;
        }
        else { 
            right--; // move right element back if target is smaller
        }
    }
    return []; // return empty array if no solution exists
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([2, 3, 4], 6));
console.log(twoSum([-1, 0], -1));
console.log(twoSum([3, 4, 6], 10));
console.log(twoSum([2, 8, 15], 6));

module.exports = twoSum;

/*
[2,7,11,15], target = 9
left = 2
right = 15
false, false, true (condition statements)

left = 2
right = 11
false, false, true

left = 2;
right = 7;
true

[2, 7]
*/