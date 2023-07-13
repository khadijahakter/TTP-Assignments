const twoSum = require('./twoSum');

describe('Two Sum II - Input array is sorted', () => {
  it('returns the pair of numbers that sum up to the target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([2, 7]);
    expect(twoSum([2, 3, 4], 6)).toEqual([2, 4]);
    expect(twoSum([-1, 0], -1)).toEqual([-1, 0]);
    expect(twoSum([3, 4, 6], 10)).toEqual([4, 6]);
  });

  it('returns an empty array when no solution is found', () => {
    expect(twoSum([2, 7, 11, 15], 3)).toEqual([]);
    expect(twoSum([1, 2, 3, 4], 10)).toEqual([]);
    expect(twoSum([-1, 0], 5)).toEqual([]);
    expect(twoSum([], 5)).toEqual([]);
  });
});
