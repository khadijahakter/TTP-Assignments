function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    // console.log(right)
    while (left < right) {
        if (numbers[left] + numbers[right] === target) {
            return [numbers[left], numbers[right]];
        }
        else if (numbers[left] + numbers[right] < target) {
            left++;
        }
        else {
            right--;
        }
    }
    return [];
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([2, 3, 4], 6));
console.log(twoSum([-1, 0], -1));
console.log(twoSum([3, 4, 6], 10));
console.log(twoSum([3, 3, 6], 10));


/*
[2,7,11,15], target = 9
left = 2
right = 15
false, false, true 

left = 2
right = 11
false, false, true

left = 2;
right = 7;
true

[2, 7]
*/