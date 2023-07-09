// set A question 1
function missingNumber(nums)
{
  let i = 0
        while (i < nums.length) {
            let correctIndex = nums[i]
            if (nums[i] < nums.length && nums[i] != nums[correctIndex])
             [nums[i],nums[correctIndex]]= [nums[correctIndex],nums[i]]
            else
             i++
        }
        //Search for 1st missing number
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] != j) {
                return j
            }
        }
        return nums.length;
}

console.log(missingNumber([0,1]));  
console.log(missingNumber([9,6,4,2,3,5,7,0,1]));
