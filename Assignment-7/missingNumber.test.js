const missingNumber = require('./missingNumber'); 

describe('Find the Missing Number', () => {
  it('should return the missing number in the given array', () => {
    expect(missingNumber([0, 1])).toEqual(2);
    expect(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])).toEqual(8);
  });
});
