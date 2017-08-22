import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import protoDeep from '../src/proto-deep';

chai.use(dirtyChai);

describe('protoDeep()', () => {
  const num = 42;
  const str = 'hello';
  const simpleObject = {
    num,
    str,
  };
  const simpleArray = [
    num,
    str,
  ];
  const complexObject = {
    num,
    obj: simpleObject,
    str,
    ary: simpleArray,
    some: {
      depth: {
        array: [
          666,
          {
            one: 1,
            two: [9, 8, 7, 'oops'],
          },
          'bye',
        ],
      },
    },
  };
  const complexArray = [
    num,
    complexObject,
    str,
    simpleObject,
  ];
  const obj1 = { a: 1, b: { x: 2, y: { s: 'hello' }, z: [3, { p: 4, q: 5 }] } };
  const obj2 = { a: 10, b: { x: 20, y: { s: 'bye' }, z: [30, { p: 40, q: 50, r: 60 }, 70], w: 80 }, c: 90 };

  it('copies numbers / strings', () => {
    expect(protoDeep(num)).to.equal(num);
    expect(protoDeep(str)).to.equal(str);
  });

  it('copies null / undefined', () => {
    expect(protoDeep(null)).to.be.a('null');
    expect(protoDeep(undefined)).to.be.an('undefined');
  });

  it('does not just copy objects / arrays', () => {
    expect(protoDeep(simpleObject)).not.equal(simpleObject);
    expect(protoDeep(simpleArray)).not.equal(simpleArray);
    expect(protoDeep(complexObject)).not.equal(complexObject);
    expect(protoDeep(complexArray)).not.equal(complexArray);
  });

  it('recreates all fields in simple objects / arrays', () => {
    expect(protoDeep(simpleObject)).to.deep.equal(simpleObject);
    expect(protoDeep(simpleArray)).to.deep.equal(simpleArray);
  });

  it('recreates all fields in complex objects / arrays', () => {
    expect(protoDeep(complexObject)).to.deep.equal(complexObject);
    expect(protoDeep(complexArray)).to.deep.equal(complexArray);
  });

  it('sets original object as a prototype', () => {
    expect(Object.getPrototypeOf(protoDeep(simpleObject))).to.equal(simpleObject);
    expect(Object.getPrototypeOf(protoDeep(complexObject))).to.equal(complexObject);
  });

  it('does not create own properties for simple object', () => {
    expect(protoDeep(simpleObject)).to.be.empty();
  });

  it('creates own properties for complex object', () => {
    expect(protoDeep(complexObject)).be.not.empty();
  });

  it('does not create own properties when ensureZeroOwnProperties = true', () => {
    expect(protoDeep(complexObject, true)).to.be.empty();
  });

  it('modifies own properties instead of prototype', () => {
    const obj = { a: 1, b: { x: 2, y: { s: 'hello' }, z: [3, { p: 4, q: 5 }] } };
    const res = protoDeep(obj);
    res.a = 10;
    res.b.x = 20;
    res.b.y.s = 'bye';
    res.b.z[0] = 30;
    res.b.z[1].p = 40;
    res.b.z[1].q = 50;
    res.b.z[1].r = 60;
    res.b.z[2] = 70;
    res.b.w = 80;
    res.c = 90;

    expect(obj).to.deep.equal(obj1);
    expect(res).to.deep.equal(obj2);
  });

  it('modifies own properties instead of prototype even when needZeroOwnProperties = true', () => {
    const obj = { a: 1, b: { x: 2, y: { s: 'hello' }, z: [3, { p: 4, q: 5 }] } };
    const res = protoDeep(obj, true);
    res.a = 10;
    res.b.x = 20;
    res.b.y.s = 'bye';
    res.b.z[0] = 30;
    res.b.z[1].p = 40;
    res.b.z[1].q = 50;
    res.b.z[1].r = 60;
    res.b.z[2] = 70;
    res.b.w = 80;
    res.c = 90;

    expect(obj).to.deep.equal(obj1);
    expect(res).to.deep.equal(obj2);
  });
});
