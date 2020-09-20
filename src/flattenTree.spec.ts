import flattenTree from './flattenTree'

describe("flattenTree", function () {
  it("should work", function () {
    const dummyTree = {
      'hi': [{
        'world': []
      }]
    }
    let result = flattenTree(dummyTree);
    expect(result).toEqual(['hi', 'world']);
  });
});