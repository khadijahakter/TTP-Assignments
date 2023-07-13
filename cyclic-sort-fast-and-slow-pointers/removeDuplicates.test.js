const removeDuplicates = require('./removeDuplicates'); 

describe('Remove Duplicates from Sorted Array', () => {
  it('should remove duplicates from the given array and return the modified array', () => {
    const nums = [5, 4, 3, 2, 2, 1];
      
    expect(removeDuplicates(nums)).toEqual([5, 4, 3, 2, 1]);
  });
});
