const findDuplicate = require('./findDuplicate');

describe('Find the Duplicate Number', () => {
  it('returns an array of duplicate numbers', () => {
    expect(findDuplicate([1, 3, 4, 2, 2])).toEqual([2]);
    expect(findDuplicate([3, 1, 3, 4])).toEqual([3]);
    expect(findDuplicate([1, 2, 3, 4, 5])).toEqual([]);
    expect(findDuplicate([1, 1, 1, 1])).toEqual([1]);
  });

  it('returns an empty array when no duplicates are found', () => {
    expect(findDuplicate([])).toEqual([]);
    expect(findDuplicate([1])).toEqual([]);
    expect(findDuplicate([1, 2, 3, 4, 5])).toEqual([]);
  });
});
