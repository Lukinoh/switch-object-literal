import {expect} from 'chai';
import Switch from '../index.js';

const safe = Switch.safe;
const unsafe = Switch.unsafe;

// The switch1
//let res;
//switch (value) {
//    case 'case1':
//        res = 'case1';
//        break;
//    case 'case2':
//        res = 'case2';
//        break;
//    case 'case3':
//    case 'case4':
//        res = 'case3 and case4'
//}

const switch1 = {};
switch1['case1'] = () => 'case1';
switch1['case2'] = 'case2';
switch1['case3'] = 'case3 and case4';
switch1['case4'] = 'case3 and case4';

const switch1D = {};
switch1D['case1'] = 'case1';
switch1D['case2'] = 'case2';
switch1D['case3'] = 'case3 and case4';
switch1D['case4'] = 'case3 and case4';
switch1D['default'] = 'default case';


const switch2 = {};
switch2['kase1'] = switch1;
switch2['kase1D'] = switch1D;

const switch2D = {};
switch2D['kase1'] = switch1;
switch2D['kase1D'] = switch1D;
switch2D['default'] = 'default kase';

const switch3D = {};
switch3D['quase'] = 'quase';
switch3D['default'] = switch2D;

const switchShortcut = {};
switchShortcut['path1'] = 'path1';
switchShortcut['path2'] = {};
switchShortcut['path2']['patha'] = 'path2a';
switchShortcut['path2']['pathb'] = 'path2b';

// The only difference between safe and unsafe is how it is handle the error.
// with safe it is an explicit error
// with unsafe, it returns the last switchTree/value found (the text is of test of unsafe are wrong)

describe('Switch', () => {

    describe('safe', () => {

        describe('called with switch1', () => {

            // Simple

            it('and (case1) should return \'case1\'', () => {
                expect(safe(switch1, 'case1')).to.be.equal('case1');
            });

            it('and (case2) should return \'case2\'', () => {
                expect(safe(switch1, 'case2')).to.be.equal('case2');
            });

            it('and (case3) should return \'case3 and case4\'', () => {
                expect(safe(switch1, 'case3')).to.be.equal('case3 and case4');
            });

            it('and (case4) should return \'case3 and case4\'', () => {
                expect(safe(switch1, 'case4')).to.be.equal('case3 and case4');
            });

            it('and (undefined) should throw an exception', () => {
                expect(safe(switch1, undefined)).to.be.equal('throw exception');
            });

            it('and (any) should throw an exception', () => {
                expect(safe(switch1, 'any')).to.be.equal('throw exception');
            });

            // Complex

            it('and (case1, any) should throw an exception', () => {
                expect(safe(switch1, 'case1', 'any')).to.be.equal('throw exception');
            });

            it('and (any, case1) should throw an exception', () => {
                expect(safe(switch1, 'any', 'case1')).to.be.equal('throw exception');
            });

            it('and (case1, undefined) should return \'case1\'', () => {
                expect(safe(switch1, 'case1', undefined)).to.be.equal('case1');
            });

            it('and (undefined, case1) should throw an exception', () => {
                expect(safe(switch1, undefined, 'case')).to.be.equal('throw exception');
            });

            it('and (any, undefined) should throw an exception', () => {
                expect(safe(switch1, 'any', undefined)).to.be.equal('throw exception');
            });

            it('and (undefined, any) should throw an exception', () => {
                expect(safe(switch1, undefined, 'any')).to.be.equal('throw exception');
            });

        });

        describe('called with switch1D', () => {

            // Simple

            it('and (case1) should return \'case1\'', () => {
                expect(safe(switch1D, 'case1')).to.be.equal('case1');
            });

            it('and (case2) should return \'case2\'', () => {
                expect(safe(switch1D, 'case2')).to.be.equal('case2');
            });

            it('and (case3) should return \'case3 and case4\'', () => {
                expect(safe(switch1D, 'case3')).to.be.equal('case3 and case4');
            });

            it('and (case4) should return \'case3 and case4\'', () => {
                expect(safe(switch1D, 'case4')).to.be.equal('case3 and case4');
            });

            it('and (undefined) should return \'default case\'', () => {
                expect(safe(switch1D, undefined)).to.be.equal('default case');
            });

            it('and (any) should return \'default case\'', () => {
                expect(safe(switch1D, 'any')).to.be.equal('default case');
            });

            // Complex

            it('and (case1, any) should throw an exception', () => {
                expect(safe(switch1D, 'case1', 'any')).to.be.equal('throw exception');
            });

            it('and (any, case1) should throw an exception', () => {
                expect(safe(switch1D, 'any', 'case1')).to.be.equal('throw exception');
            });

            it('and (case1, undefined) should return \'case1\'', () => {
                expect(safe(switch1D, 'case1', undefined)).to.be.equal('case1');

            });

            it('and (undefined, case1) should throw an exception', () => {
                expect(safe(switch1D, undefined, 'case1')).to.be.equal('throw exception');
            });

            it('and (any, undefined) should return \'default case\'', () => {
                expect(safe(switch1D, 'any', undefined)).to.be.equal('default case');
            });

            it('and (undefined, any) should throw an exception', () => {
                expect(safe(switch1D, undefined, 'any')).to.be.equal('throw exception');
            });

        });

        describe('called with switch2', () => {

            // kase1

            it('and (kase1, undefined) should throw an exception', () => {
                expect(safe(switch2, 'kase1', undefined)).to.be.equal('throw exception');
            });

            it('and (kase1, case1) should return \'case1\'', () => {
                expect(safe(switch2, 'kase1', 'case1')).to.be.equal('case1');
            });

            it('and (kase1, any) should throw an exception', () => {
                expect(safe(switch2, 'kase1', 'any')).to.be.equal('throw exception');
            });

            it('and (kase1, case1, undefined) should return \'case1\'', () => {
                expect(safe(switch2, 'kase1', 'case1', undefined)).to.be.equal('case1');
            });

            // kase1D

            it('and (kase1D, undefined) should throw an exception', () => {
                expect(safe(switch2, 'kase1D', undefined)).to.be.equal('throw exception');
            });

            it('and (kase1D, case1) should return \'case1\'', () => {
                expect(safe(switch2, 'kase1D', 'case1')).to.be.equal('case1');
            });

            it('and (kase1D, any) should return \'default case\'', () => {
                expect(safe(switch2, 'kase1D', 'any')).to.be.equal('default case');
            });

            it('and (kase1D, case1, undefined) should return \'case1\'', () => {
                expect(safe(switch2, 'kase1D', 'case1', undefined)).to.be.equal('case1');
            });

            // any

            it('and (any, undefined) should throw an exception', () => {
                expect(safe(switch2, 'any', undefined)).to.be.equal('throw exception');
            });

            it('and (any, case1) should throw an exception', () => {
                expect(safe(switch2, 'any', 'case1')).to.be.equal('throw exception');
            });

            it('and (any, any) should throw an exception', () => {
                expect(safe(switch2, 'any', 'any')).to.be.equal('throw exception');
            });

            it('and (any, case1, undefined) should throw an exception', () => {
                expect(safe(switch2, 'any', 'case1', undefined)).to.be.equal('throw exception');
            });

            // undefined

            it('and (undefined, undefined) should throw an error', () => {
                expect(safe(switch2, undefined, undefined)).to.be.equal('throw exception');
            });

            it('and (undefined, case1) should throw an exception', () => {
                expect(safe(switch2, undefined, 'case1')).to.be.equal('throw exception');
            });

            it('and (undefined, any) should throw an exception', () => {
                expect(safe(switch2, undefined, 'any')).to.be.equal('throw exception');
            });

            it('and (undefined, case1, undefined) should throw an exception', () => {
                expect(safe(switch2, undefined, 'case1', undefined)).to.be.equal('throw exception');
            });

        });

        describe('called with switch2D', () => {

            // kase1

            it('and (kase1, undefined) should throw an exception', () => {
                expect(safe(switch2D, 'kase1', undefined)).to.be.equal('throw exception');
            });

            it('and (kase1, case1) should return \'case1\'', () => {
                expect(safe(switch2D, 'kase1', 'case1')).to.be.equal('case1');
            });

            it('and (kase1, any) should throw an exception', () => {
                expect(safe(switch2D, 'kase1', 'any')).to.be.equal('throw exception');
            });

            it('and (kase1, case1, undefined) should return \'case1\'', () => {
                expect(safe(switch2D, 'kase1', 'case1', undefined)).to.be.equal('case1');
            });

            // kase1D

            it('and (kase1D, undefined) should throw an exception', () => {
                expect(safe(switch2D, 'kase1D', undefined)).to.be.equal('throw exception');
            });

            it('and (kase1D, case1) should return \'case1\'', () => {
                expect(safe(switch2D, 'kase1D', 'case1')).to.be.equal('case1');
            });

            it('and (kase1D, any) should return \'default case\'', () => {
                expect(safe(switch2D, 'kase1D', 'any')).to.be.equal('default case');
            });

            it('and (kase1D, case1, undefined) should return \'case1\'', () => {
                expect(safe(switch2D, 'kase1D', 'case1', undefined)).to.be.equal('case1');
            });

            // any

            it('and (any, undefined) should return \'default kase\'', () => {
                expect(safe(switch2D, 'any', undefined)).to.be.equal('default kase');
            });

            it('and (any, case1) should throw an exception', () => {
                expect(safe(switch2D, 'any', 'case1')).to.be.equal('throw exception');
            });

            it('and (any, any) should throw an exception', () => {
                expect(safe(switch2D, 'any', 'any')).to.be.equal('throw exception');
            });

            it('and (any, case1, undefined) should throw an exception', () => {
                expect(safe(switch2D, 'any', 'case1', undefined)).to.be.equal('throw exception');
            });

            // undefined

            it('and (undefined, undefined) should throw an exception', () => {
                expect(safe(switch2D, undefined, undefined)).to.be.equal('default kase');
            });

            it('and (undefined, case1) should throw an exception', () => {
                expect(safe(switch2D, undefined, 'case1')).to.be.equal('throw exception');
            });

            it('and (undefined, any) should throw an exception', () => {
                expect(safe(switch2D, undefined, 'any')).to.be.equal('throw exception');
            });

            it('and (undefined, case1, undefined) should throw an exception', () => {
                expect(safe(switch2D, undefined, 'case1', undefined)).to.be.equal('throw exception');
            });

        });

        describe('called with switch3D', () => {

            it('and (any) should return \'default kase\'', () => {
                expect(safe(switch3D, 'any')).to.be.equal('default kase');
            });

            it('and (any, any) should return \'default kase\'', () => {
                expect(safe(switch3D, 'any', 'any')).to.be.equal('default kase');
            });

            it('and (any, any, any) should throw an exception', () => {
                expect(safe(switch3D, 'any', 'any', 'any')).to.be.equal('throw exception');
            });

        });

        describe('called with switchShortcut', () => {

            it('and (path1) should return \'path1\'', () => {
                expect(safe(switchShortcut, 'path1')).to.be.equal('path1');
            });

            it('and (path1, patha) should throw an exception', () => {
                expect(safe(switchShortcut, 'path1', 'patha')).to.be.equal('throw exception');
            });

            it('and (path1, pathb) should throw an exception', () => {
                expect(safe(switchShortcut, 'path1', 'pathb')).to.be.equal('throw exception');
            });

            it('and (path2) should throw an exception', () => {
                expect(safe(switchShortcut, 'path2')).to.be.equal('throw exception');
            });

            it('and (path2, patha) should return \'path2a\'', () => {
                expect(safe(switchShortcut, 'path2', 'patha')).to.be.equal('path2a');
            });

            it('and (path2, pathb) should return \'path2b\'', () => {
                expect(safe(switchShortcut, 'path2', 'pathb')).to.be.equal('path2b');
            });

        });

    });

    describe('unsafe', () => {

        describe('called with switch1', () => {

            // Simple

            it('and (case1) should return \'case1\'', () => {
                expect(unsafe(switch1, 'case1')).to.be.equal('case1');
            });

            it('and (case2) should return \'case2\'', () => {
                expect(unsafe(switch1, 'case2')).to.be.equal('case2');
            });

            it('and (case3) should return \'case3 and case4\'', () => {
                expect(unsafe(switch1, 'case3')).to.be.equal('case3 and case4');
            });

            it('and (case4) should return \'case3 and case4\'', () => {
                expect(unsafe(switch1, 'case4')).to.be.equal('case3 and case4');
            });

            it('and (undefined) should throw an exception', () => {
                expect(unsafe(switch1, undefined)).to.be.equal(switch1);
            });

            it('and (any) should throw an exception', () => {
                expect(unsafe(switch1, 'any')).to.be.equal(switch1);
            });

            // Complex

            it('and (case1, any) should throw an exception', () => {
                expect(unsafe(switch1, 'case1', 'any')).to.be.equal('case1');
            });

            it('and (any, case1) should throw an exception', () => {
                expect(unsafe(switch1, 'any', 'case1')).to.be.equal(switch1);
            });

            it('and (case1, undefined) should return \'case1\'', () => {
                expect(unsafe(switch1, 'case1', undefined)).to.be.equal('case1');
            });

            it('and (undefined, case1) should throw an exception', () => {
                expect(unsafe(switch1, undefined, 'case')).to.be.equal(switch1);
            });

            it('and (any, undefined) should throw an exception', () => {
                expect(unsafe(switch1, 'any', undefined)).to.be.equal(switch1);
            });

            it('and (undefined, any) should throw an exception', () => {
                expect(unsafe(switch1, undefined, 'any')).to.be.equal(switch1);
            });

        });

        describe('called with switch1D', () => {

            // Simple

            it('and (case1) should return \'case1\'', () => {
                expect(unsafe(switch1D, 'case1')).to.be.equal('case1');
            });

            it('and (case2) should return \'case2\'', () => {
                expect(unsafe(switch1D, 'case2')).to.be.equal('case2');
            });

            it('and (case3) should return \'case3 and case4\'', () => {
                expect(unsafe(switch1D, 'case3')).to.be.equal('case3 and case4');
            });

            it('and (case4) should return \'case3 and case4\'', () => {
                expect(unsafe(switch1D, 'case4')).to.be.equal('case3 and case4');
            });

            it('and (undefined) should return \'default case\'', () => {
                expect(unsafe(switch1D, undefined)).to.be.equal('default case');
            });

            it('and (any) should return \'default case\'', () => {
                expect(unsafe(switch1D, 'any')).to.be.equal('default case');
            });

            // Complex

            it('and (case1, any) should throw an exception', () => {
                expect(unsafe(switch1D, 'case1', 'any')).to.be.equal('case1');
            });

            it('and (any, case1) should throw an exception', () => {
                expect(unsafe(switch1D, 'any', 'case1')).to.be.equal('default case');
            });

            it('and (case1, undefined) should return \'case1\'', () => {
                expect(unsafe(switch1D, 'case1', undefined)).to.be.equal('case1');

            });

            it('and (undefined, case1) should throw an exception', () => {
                expect(unsafe(switch1D, undefined, 'case1')).to.be.equal('default case');
            });

            it('and (any, undefined) should return \'default case\'', () => {
                expect(unsafe(switch1D, 'any', undefined)).to.be.equal('default case');
            });

            it('and (undefined, any) should throw an exception', () => {
                expect(unsafe(switch1D, undefined, 'any')).to.be.equal('default case');
            });

        });

        describe('called with switch2', () => {

            // kase1

            it('and (kase1, undefined) should throw an exception', () => {
                expect(unsafe(switch2, 'kase1', undefined)).to.be.equal(switch1);
            });

            it('and (kase1, case1) should return \'case1\'', () => {
                expect(unsafe(switch2, 'kase1', 'case1')).to.be.equal('case1');
            });

            it('and (kase1, any) should throw an exception', () => {
                expect(unsafe(switch2, 'kase1', 'any')).to.be.equal(switch1);
            });

            it('and (kase1, case1, undefined) should return \'case1\'', () => {
                expect(unsafe(switch2, 'kase1', 'case1', undefined)).to.be.equal('case1');
            });

            // kase1D

            it('and (kase1D, undefined) should throw an exception', () => {
                expect(unsafe(switch2, 'kase1D', undefined)).to.be.equal(switch1D);
            });

            it('and (kase1D, case1) should return \'case1\'', () => {
                expect(unsafe(switch2, 'kase1D', 'case1')).to.be.equal('case1');
            });

            it('and (kase1D, any) should return \'default case\'', () => {
                expect(unsafe(switch2, 'kase1D', 'any')).to.be.equal('default case');
            });

            it('and (kase1D, case1, undefined) should return \'case1\'', () => {
                expect(unsafe(switch2, 'kase1D', 'case1', undefined)).to.be.equal('case1');
            });

            // any

            it('and (any, undefined) should throw an exception', () => {
                expect(unsafe(switch2, 'any', undefined)).to.be.equal(switch2);
            });

            it('and (any, case1) should throw an exception', () => {
                expect(unsafe(switch2, 'any', 'case1')).to.be.equal(switch2);
            });

            it('and (any, any) should throw an exception', () => {
                expect(unsafe(switch2, 'any', 'any')).to.be.equal(switch2);
            });

            it('and (any, case1, undefined) should throw an exception', () => {
                expect(unsafe(switch2, 'any', 'case1', undefined)).to.be.equal(switch2);
            });

            // undefined

            it('and (undefined, undefined) should throw an error', () => {
                expect(unsafe(switch2, undefined, undefined)).to.be.equal(switch2);
            });

            it('and (undefined, case1) should throw an exception', () => {
                expect(unsafe(switch2, undefined, 'case1')).to.be.equal(switch2);
            });

            it('and (undefined, any) should throw an exception', () => {
                expect(unsafe(switch2, undefined, 'any')).to.be.equal(switch2);
            });

            it('and (undefined, case1, undefined) should throw an exception', () => {
                expect(unsafe(switch2, undefined, 'case1', undefined)).to.be.equal(switch2);
            });

        });

        describe('called with switch2D', () => {

            // kase1

            it('and (kase1, undefined) should throw an exception', () => {
                expect(unsafe(switch2D, 'kase1', undefined)).to.be.equal(switch1);
            });

            it('and (kase1, case1) should return \'case1\'', () => {
                expect(unsafe(switch2D, 'kase1', 'case1')).to.be.equal('case1');
            });

            it('and (kase1, any) should throw an exception', () => {
                expect(unsafe(switch2D, 'kase1', 'any')).to.be.equal(switch1);
            });

            it('and (kase1, case1, undefined) should return \'case1\'', () => {
                expect(unsafe(switch2D, 'kase1', 'case1', undefined)).to.be.equal('case1');
            });

            // kase1D

            it('and (kase1D, undefined) should throw an exception', () => {
                expect(unsafe(switch2D, 'kase1D', undefined)).to.be.equal(switch1D);
            });

            it('and (kase1D, case1) should return \'case1\'', () => {
                expect(unsafe(switch2D, 'kase1D', 'case1')).to.be.equal('case1');
            });

            it('and (kase1D, any) should return \'default case\'', () => {
                expect(unsafe(switch2D, 'kase1D', 'any')).to.be.equal('default case');
            });

            it('and (kase1D, case1, undefined) should return \'case1\'', () => {
                expect(unsafe(switch2D, 'kase1D', 'case1', undefined)).to.be.equal('case1');
            });

            // any

            it('and (any, undefined) should return \'default kase\'', () => {
                expect(unsafe(switch2D, 'any', undefined)).to.be.equal('default kase');
            });

            it('and (any, case1) should throw an exception', () => {
                expect(unsafe(switch2D, 'any', 'case1')).to.be.equal('default kase');
            });

            it('and (any, any) should throw an exception', () => {
                expect(unsafe(switch2D, 'any', 'any')).to.be.equal('default kase');
            });

            it('and (any, case1, undefined) should throw an exception', () => {
                expect(unsafe(switch2D, 'any', 'case1', undefined)).to.be.equal('default kase');
            });

            // undefined

            it('and (undefined, undefined) should throw an exception', () => {
                expect(unsafe(switch2D, undefined, undefined)).to.be.equal('default kase');
            });

            it('and (undefined, case1) should throw an exception', () => {
                expect(unsafe(switch2D, undefined, 'case1')).to.be.equal('default kase');
            });

            it('and (undefined, any) should throw an exception', () => {
                expect(unsafe(switch2D, undefined, 'any')).to.be.equal('default kase');
            });

            it('and (undefined, case1, undefined) should throw an exception', () => {
                expect(unsafe(switch2D, undefined, 'case1', undefined)).to.be.equal('default kase');
            });

        });

        describe('called with switch3D', () => {

            it('and (any) should return \'default kase\'', () => {
                expect(unsafe(switch3D, 'any')).to.be.equal('default kase');
            });

            it('and (any, any) should return \'default kase\'', () => {
                expect(unsafe(switch3D, 'any', 'any')).to.be.equal('default kase');
            });

            it('and (any, any, any) should throw an exception', () => {
                expect(unsafe(switch3D, 'any', 'any', 'any')).to.be.equal('default kase');
            });

        });

        describe('called with switchShortcut', () => {

            it('and (path1) should return \'path1\'', () => {
                expect(unsafe(switchShortcut, 'path1')).to.be.equal('path1');
            });

            it('and (path1, patha) should throw an exception', () => {
                expect(unsafe(switchShortcut, 'path1', 'patha')).to.be.equal('path1');
            });

            it('and (path1, pathb) should throw an exception', () => {
                expect(unsafe(switchShortcut, 'path1', 'pathb')).to.be.equal('path1');
            });

            it('and (path2) should throw an exception', () => {
                expect(unsafe(switchShortcut, 'path2')).to.be.eql({
                    'patha': 'path2a',
                    'pathb': 'path2b',
                });
            });

            it('and (path2, patha) should return \'path2a\'', () => {
                expect(unsafe(switchShortcut, 'path2', 'patha')).to.be.equal('path2a');
            });

            it('and (path2, pathb) should return \'path2b\'', () => {
                expect(unsafe(switchShortcut, 'path2', 'pathb')).to.be.equal('path2b');
            });

        });

    });
});

