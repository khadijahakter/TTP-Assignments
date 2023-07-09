const removeDuplicates = require('./removeDuplicates'); 

describe('Remove Duplicates from Sorted Array', () => {
  it('should remove duplicates from the given array and return the modified array', () => {
    const nums = [5, 4, 3, 2, 2, 1];
    const nums1 = [4, 4, 4, 4, 2, 1, 2];
  
    expect(removeDuplicates(nums)).toEqual([5, 4, 3, 2, 1]);
    expect(removeDuplicates(nums1)).toEqual([4, 2, 1]);
  });
});
