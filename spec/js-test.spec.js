const fetch = require('node-fetch').default

if (!globalThis.fetch) {
	globalThis.fetch = fetch;
}

const { divisible, multipliedBy5, digitize, csvToObjArray, getPeople, fibonacci } = require('../js-test.js')

describe('divisible', () => {
  it('returns `4 and 5` if the argument is divisible both by 5 and 4', () => {
    expect(divisible(20)).toBe('4 and 5');
  });
  it('returns `4` if the argument is divisible by 4 and not divisible by 5', () => {
    expect(divisible(12)).toBe('4');
  });
  it('returns `5` if the argument is divisible by 5 and not divisible by 4', () => {
    expect(divisible(10)).toBe('5');
  });
  it('returns `none` if the argument is divisible neither by 4 nor by 5', () => {
    expect(divisible(12)).toBe('4');
  });
});

describe('multipliedBy5', () => {
  it('returns an array with elements multiplied by 5', () => {
    expect(multipliedBy5([1,4,-2,0])).toEqual([5, 20, -10, 0]);
  });   
  it('returns another array (not the one passed to the function)', () => {
     var arr = [1,4,-2,0];
    expect(multipliedBy5(arr)).not.toBe(arr);
  });
});

describe('digitize', () => {
  it('returns an array with the digits', () => {
    expect(digitize(1091123)).toEqual([1, 0, 9, 1, 1, 2, 3]);
  });
});

describe('csvToObjArray', () => {
  it('returns an array of objects', () => {
    var csv = 
`a;b;c
1;2;4
4;0;6`;
    expect(csvToObjArray(csv)).toEqual([{a:'1', b:'2', c:'4'}, {a:'4', b:'0', c:'6'}]);
  });
});



describe('getPeople', () => {

  const peopleEndPoint = 'https://swapi.dev/api/people/?page1';

  const expected = ["Luke Skywalker", "C-3PO", "R2-D2", "Darth Vader", "Leia Organa", "Owen Lars", "Beru Whitesun lars", "R5-D4", "Biggs Darklighter", "Obi-Wan Kenobi"];

  let peoplePromise;

    beforeEach(function() {
		  spyOn(globalThis, 'fetch').and.callThrough();
		  peoplePromise = getPeople();
	  });

	 it('fetches from the getPeople API', function() {
     
       expect(globalThis.fetch).toHaveBeenCalledWith(peopleEndPoint);
    
	 });

  it('returns a promise', function() {
		expect(peoplePromise).toEqual(jasmine.any(Promise));
	})

  it('returns a array with the names property of result objects', (done) => {
    peoplePromise.then(result => {
    expect(result).toEqual(expected);
		done();
  });
});
});

describe("fibonacci", () => {
  it("returns a promise", function() {
    expect(fibonacci(0)).toEqual(jasmine.any(Promise));
  });

  it("resolves with 0 when n == 0 ", async () => {
    const result = await fibonacci(0);
    expect(result).toEqual(0);
  });

  it("resolves with 1 when n == 2 ", async () => {
    const result = await fibonacci(2);
    expect(result).toEqual(1);
  });

  it("resolves with the nth fibonacci number ", async () => {
    const result = await fibonacci(10);
    expect(result).toEqual(55);
  });

  it("rejects if n < 0 ", async () => {
    try {
      await fibonacci(-10);
    } catch (ex) {
      expect(ex).toEqual('n has to be larger than -1');
    }
  });
});





