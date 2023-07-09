// set B question 1
var removeDuplicates = function(nums) {
    let i = 0;
    let j = 0;
    while(j < nums.length)
      {
        if(nums[i]==nums[j])
        {
          j++
        }
        else{
          i++;
          nums[i] = nums[j];
        }
         
      }
     i++;
     nums.length = i;
     return nums;
 };

nums = [1, 1, 1, 1, 2, 3, 4, 4, 5]
nums1 = [20, 20, 40]
console.log(removeDuplicates(nums));
console.log(removeDuplicates(nums1));
