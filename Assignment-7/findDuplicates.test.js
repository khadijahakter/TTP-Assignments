const findDuplicates = require('./findDuplicates'); 

describe('Find All Duplicates in an Array', () => {
  it('should return an array of duplicates in the given array', () => {
    const nums = [10, 5, 2, 2, 4, 3, 4, 6, 7, 8, 9, 101, 20, 101];
    const nums1 = [102, 100, 204, 100, 100, 102];
  
    expect(findDuplicates(nums)).toEqual([2, 4, 101]);
    expect(findDuplicates(nums1)).toEqual([100, 102]);
  });

  it('should return an empty array if no duplicates are found', () => {
    const nums = [1, 2, 3, 4, 5];
    const nums1 = [100, 200, 300];
  
    expect(findDuplicates(nums)).toEqual([]);
    expect(findDuplicates(nums1)).toEqual([]);
  });
});
