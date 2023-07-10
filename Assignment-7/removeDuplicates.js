var removeDuplicates = function (nums) {
  let i = 0; // pointer for the current unique element
  let j = 0; // pointer for iterating through the array
  while (j < nums.length) { 
    if (nums[i] == nums[j]) { 
      j++; // move the j pointer if the current element is a duplicate
    }
    else {
      i++;  // move the i pointer to the next unique element
      nums[i] = nums[j]; // replace the element at i with the unique element at j
    }

  }

  i++; // increment i to include the last unique element
  nums.length = i; // set the length of the array to remove any remaining duplicate elements
  return nums;

};

nums = [1, 1, 1, 1, 2, 3, 4, 4, 5]
nums1 = [20, 20, 40]
console.log(removeDuplicates(nums));
console.log(removeDuplicates(nums1));

module.exports = removeDuplicates;
