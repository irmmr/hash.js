;(function () {
    'use strict';

    // initial values
    let assert  = window.Hash_Assert,
        helper  = Hash.h,
        gh      = window.Hash_g,
        sh      = window.Hash_s,
        ch      = window.Hash_c;

    describe('Helpers: All helpers', function () {

        it('start helpers test', function () {
            console.info('start helpers test at', new Date());
        });

        // #helper isArr
        describe('isArr', function () {
            it('isArr should returns `true` for arrays', function () {
                assert.strictEqual(helper.isArr([1, 2, 3]), true);
                assert.strictEqual(helper.isArr(["Hello", 2, {}]), true);
                assert.strictEqual(helper.isArr(function () {
                    return ['g', [], 1, 8];
                }()), true);
                assert.strictEqual(helper.isArr(Array.call([])), true);
            });

            it('isArr should returns `false` for non-arrays', function () {
                assert.strictEqual(helper.isArr('hello'), false);
                assert.strictEqual(helper.isArr(724), false);
                assert.strictEqual(helper.isArr({a:3}), false);
                assert.strictEqual(helper.isArr(/[a-z]/g), false);
                assert.strictEqual(helper.isArr(function () {
                    let x = 5;
                }), false);
            });
        });

        // #helper isString
        describe('isString', function () {
            it('isString should returns `true` for strings', function () {
                assert.strictEqual(helper.isString('hello boy!'), true);
                assert.strictEqual(helper.isString("gg world"), true);
                assert.strictEqual(helper.isString([1, 5].toString()), true);
                assert.strictEqual(helper.isString('a'), true);
            });

            it('isString should returns `false` for non-strings', function () {
                assert.strictEqual(helper.isString([1, 3, 6]), false);
                assert.strictEqual(helper.isString({hello: 25, bnb: 'op'}), false);
                assert.strictEqual(helper.isString(925.3), false);
                assert.strictEqual(helper.isString(/\./g), false);
                assert.strictEqual(helper.isString(function () {}), false);
            });
        });

        // #helper isBool
        describe('isBool', function () {
            it('isBool should returns `true` for booleans', function () {
                assert.strictEqual(helper.isBool(true), true);
                assert.strictEqual(helper.isBool(false), true);
                assert.strictEqual(helper.isBool('a' !== 'b'), true);
                assert.strictEqual(helper.isBool(typeof 'a' === 'object'), true);
                assert.strictEqual(helper.isBool(/[0-9]/g instanceof RegExp), true);
                assert.strictEqual(helper.isBool("abcd".includes('v')), true);
            });

            it('isBool should returns `false` for non-booleans', function () {
                assert.strictEqual(helper.isBool('hello'), false);
                assert.strictEqual(helper.isBool(654), false);
                assert.strictEqual(helper.isBool([1]), false);
                assert.strictEqual(helper.isBool({g: 'v'}), false);
                assert.strictEqual(helper.isBool(function () {}), false);
                assert.strictEqual(helper.isBool(/\+/), false);
            });
        });

        // #helper isObj
        describe('isObj', function () {
            it('isObj should returns `true` for objects', function () {
                assert.strictEqual(helper.isObj({}), true);
                assert.strictEqual(helper.isObj({a: 'b'}), true);
                assert.strictEqual(helper.isObj({page: 1, l: []}), true);
                assert.strictEqual(helper.isObj({0: [], 1: 'hk'}), true);
            });

            it('isObj should returns `false` for non-objects', function () {
                assert.strictEqual(helper.isObj('string haha!'), false);
                assert.strictEqual(helper.isObj(9445), false);
                assert.strictEqual(helper.isObj([1, 9, 'c']), false);
                assert.strictEqual(helper.isObj(true), false);
            });
        });

        // #helper isNum
        describe('isNum', function () {
            it('isNum should returns `true` for numbers', function () {
                assert.strictEqual(helper.isNum(8 * 2), true);
                assert.strictEqual(helper.isNum([1, 2].length), true);
                assert.strictEqual(helper.isNum(7684), true);
            });

            it('isNum should returns `false` for non-numbers', function () {
                assert.strictEqual(helper.isNum('string c!'), false);
                assert.strictEqual(helper.isNum({a: 7}), false);
                assert.strictEqual(helper.isNum([1, 9, 'c']), false);
                assert.strictEqual(helper.isNum(true), false);
            });
        });

        // #helper isNumeric
        describe('isNumeric', function () {
            it('isNum should returns `true` for numerics', function () {
                assert.strictEqual(helper.isNumeric(756), true);
                assert.strictEqual(helper.isNumeric([1, 2].length), true);
                assert.strictEqual(helper.isNumeric('76804'), true);
                assert.strictEqual(helper.isNumeric(true), true);
            });

            it('isNum should returns `false` for non-numerics', function () {
                assert.strictEqual(helper.isNumeric('string c!'), false);
                assert.strictEqual(helper.isNumeric({a: 7}), false);
                assert.strictEqual(helper.isNumeric([1, 9, 'c']), false);
                assert.strictEqual(helper.isNumeric(''), false);
            });
        });

        // #helper isFunc
        describe('isFunc', function () {
            it('isFunc should returns `true` for functions', function () {
                assert.strictEqual(helper.isFunc(function () {}), true);
                assert.strictEqual(helper.isFunc(() => {}), true);
                assert.strictEqual(helper.isFunc(Array.isArray), true);
                assert.strictEqual(helper.isFunc("a".toString), true);
            });

            it('isFunc should returns `false` for non-functions', function () {
                assert.strictEqual(helper.isFunc('string!'), false);
                assert.strictEqual(helper.isFunc(784), false);
                assert.strictEqual(helper.isFunc([1, 2, 3]), false);
                assert.strictEqual(helper.isFunc({a: 6}), false);
                assert.strictEqual(helper.isFunc(true), false);
            });
        });

        // #helper isEmpty
        describe('isEmpty', function () {
            it('isEmpty should returns `true` for empty data', function () {
                assert.strictEqual(helper.isEmpty(''), true);
                assert.strictEqual(helper.isEmpty([]), true);
                assert.strictEqual(helper.isEmpty({}), true);
                assert.strictEqual(helper.isEmpty(null), true);
            });

            it('isEmpty should returns `false` for non-empty data', function () {
                assert.strictEqual(helper.isEmpty(function () {}), false);
                assert.strictEqual(helper.isEmpty('hello'), false);
                assert.strictEqual(helper.isEmpty([1, 2]), false);
                assert.strictEqual(helper.isEmpty({a: 3}), false);
                assert.strictEqual(helper.isEmpty(574), false);
                assert.strictEqual(helper.isEmpty(/h/g), false);
            });
        });

        // #helper replaceAll
        describe('replaceAll', function () {
            it('replaceAll should replace all worlds/chars in a string', function () {
                let a = 'hello babe! how are you?';

                assert.strictEqual(helper.replaceAll(a, ' ', ''), 'hellobabe!howareyou?');
                assert.strictEqual(helper.replaceAll(a, 'hello', 'hi'), 'hi babe! how are you?');
                assert.strictEqual(helper.replaceAll(a, 'b', 'u'), 'hello uaue! how are you?');
            });
        });

        // #helper getBool
        describe('getBool', function () {
            it('getBool should returns its data in he same way if it is boolean', function () {
                assert.strictEqual(helper.getBool(true), true);
                assert.strictEqual(helper.getBool(false), false);
            });

            it('getBool should convert string to boolean as `true,false`', function () {
                assert.strictEqual(helper.getBool('true'), true);
                assert.strictEqual(helper.getBool('false'), false);
            });

            it('getBool should convert number to boolean as `1,0`', function () {
                assert.strictEqual(helper.getBool(1), true);
                assert.strictEqual(helper.getBool(0), false);
            });

            it('getBool should returns `false` for other data types', function () {
                assert.strictEqual(helper.getBool([1, 2]), false);
                assert.strictEqual(helper.getBool(function () {}), false);
                assert.strictEqual(helper.getBool({a: 'c'}), false);
            });
        });

        // #helper objSize
        describe('objSize', function () {
            it('objSize should returns object length for objects', function () {
                assert.strictEqual(helper.objSize({a: 1, b: 2}), 2);
                assert.strictEqual(helper.objSize({7: 'ac'}), 1);
                assert.strictEqual(helper.objSize({
                    conf: {page: 1, m: {p: 3 + 'Hello'}},
                    regExp: /\[/i
                }), 2);
            });

            it('objSize should returns `0` for non-objects', function () {
                assert.strictEqual(helper.objSize(true), 0);
                assert.strictEqual(helper.objSize([5, 6, 4]), 0);
                assert.strictEqual(helper.objSize([]), 0);
            });
        });

        // #helper lunchFunc
        describe('lunchFunc', function () {
            it('lunchFunc should run a functions with arguments', function () {
                let f = function ([a, b]) {
                    return a * b;
                };

                let u = function ([a]) {
                    return a;
                };

                let i = function () {
                    return typeof this.func === 'function' &&
                        this.args[0] === 'ar';
                };

                assert.strictEqual(helper.lunchFunc(f, 2, 5), 10);
                assert.strictEqual(helper.lunchFunc(f, 0, 8), 0);
                assert.strictEqual(helper.lunchFunc(f, 63, 78), 78 * 63);
                assert.strictEqual(helper.lunchFunc(u, 'hello'), 'hello');
                assert.strictEqual(helper.lunchFunc(i, 'ar'), true);
            });
        });

        // #helper splitOnce
        describe('splitOnce', function () {
            it('splitOnce should split string only one time', function () {
                let sp1 = helper.splitOnce('a,b,c', ',');
                assert.strictEqual(sp1.length, 2);
                assert.strictEqual(sp1[0], 'a');
                assert.strictEqual(sp1[1], 'b,c');
            });
        });

        // #helper splitOnceEnd
        describe('splitOnceEnd', function () {
            it('splitOnceEnd should split string only one time from end', function () {
                let sp1 = helper.splitOnceEnd('a,b,c', ',');
                assert.strictEqual(sp1.length, 2);
                assert.strictEqual(sp1[0], 'a,b');
                assert.strictEqual(sp1[1], 'c');
            });
        });

        // #helper isQuery
        describe('isQuery', function () {
            it('isQuery should returns `true` for queries', function () {
                assert.strictEqual(helper.isQuery('?data&js'), true);
                assert.strictEqual(helper.isQuery('?p=1'), true);
                assert.strictEqual(helper.isQuery('?a=1&b=2&c=3'), true);
                assert.strictEqual(helper.isQuery('?w=hello world'), true);
            });

            it('isQuery should returns `false` for non-queries', function () {
                assert.strictEqual(helper.isQuery([1, 2]), false);
                assert.strictEqual(helper.isQuery({}), false);
                assert.strictEqual(helper.isQuery(434), false);
            });
        });

        // #helper getQuery
        describe('getQuery', function () {
            it('getQuery should returns queries as key-value', function () {
                assert.deepEqual(helper.getQuery('data&js'), {data: null, js: null});
                assert.deepEqual(helper.getQuery('page=1&vendor=hl-p'), {page: 1, vendor: 'hl-p'});
            });

            it('getQuery should distinguish between blank and null data', function () {
                assert.deepEqual(helper.getQuery('a=&b'), {a: '', b: null});
            });

            it('getQuery should returns values with `decodeURIComponent`', function () {
                assert.deepEqual(helper.getQuery('w=why%20%3F'), {w: 'why ?'});
            });

            it('getQuery should returns empty object for non-query or non-string data', function () {
                assert.deepEqual(helper.getQuery(''), {});
                assert.deepEqual(helper.getQuery({}), {});
                assert.deepEqual(helper.getQuery([1, 4]), {});
            });

            it('getQuery should be able to use `parseQueryValue` option', function () {
                assert.deepEqual(helper.getQuery('a=str&b=true&c=false&d=12&c=14g&d=019'), {
                    a: 'str',
                    b: true,
                    c: false,
                    d: 12,
                    c: '14g',
                    d: 19
                });

                Hash.config({ parseQueryValue: false });

                assert.deepEqual(helper.getQuery('a=true&page=984&hey=ifv dsf'), {
                    a: 'true',
                    page: '984',
                    hey: 'ifv dsf'
                });

                Hash.config({ parseQueryValue: true });
            });
        });

        // #helper isQueParOk
        describe('isQueParOk', function () {
            it('isQueParOk should returns `true` for strings, null values, undefined, numbers, boolean', function () {
                assert.strictEqual(helper.isQueParOk('Hello'), true);
                assert.strictEqual(helper.isQueParOk(583), true);
                assert.strictEqual(helper.isQueParOk(null), true);
                assert.strictEqual(helper.isQueParOk(undefined), true);
                assert.strictEqual(helper.isQueParOk(true), true);
                assert.strictEqual(helper.isQueParOk(false), true);
            });

            it('isQueParOk should returns `false` for other values', function () {
                assert.strictEqual(helper.isQueParOk({a: '4gv'}), false);
                assert.strictEqual(helper.isQueParOk({a: '4gv'}), false);
                assert.strictEqual(helper.isQueParOk(/o/i), false);
                assert.strictEqual(helper.isQueParOk(function () {}), false);
            });
        });

        // #helper filterQueEntry
        describe('filterQueEntry', function () {
            it('filterQueEntry should returns `empty object` for non-objects or empty entries', function () {
                assert.deepEqual(helper.filterQueEntry('Hello'), {});
                assert.deepEqual(helper.filterQueEntry(435), {});
                assert.deepEqual(helper.filterQueEntry([1, 6]), {});
                assert.deepEqual(helper.filterQueEntry({}), {});
            });

            it('filterQueEntry should filters objects correctly', function () {
                assert.deepEqual(helper.filterQueEntry({
                    a: 1,
                    b: 'u'
                }), {a: 1, b: 'u'});
                assert.deepEqual(helper.filterQueEntry({
                    page: '67',
                    'nova-hl': 'Page',
                    'H c': 72
                }), {page: '67', 'nova-hl': 'Page', 'H c': 72});
            });

            it('filterQueEntry should filters non-string values', function () {
                assert.deepEqual(helper.filterQueEntry({
                    a: [1, 2],
                    b: {h: 2},
                    c: function () {},
                    y: 'Ok!',
                    e: /t/g
                }), {y: 'Ok!'});
                assert.deepEqual(helper.filterQueEntry({
                    page: '67',
                    'nova-hl': 'Page',
                    'H c': 72
                }), {page: '67', 'nova-hl': 'Page', 'H c': 72});
            });

            it('filterQueEntry should filters empty keys', function () {
                assert.deepEqual(helper.filterQueEntry({
                    '': 'Hello',
                    order: 'desc'
                }), {order: 'desc'});
            });
        });

        // #helper toQuery
        describe('toQuery', function () {
            it('toQuery should returns `empty object` for empty entries or non-object entry', function () {
                assert.strictEqual(helper.toQuery({}), '');
                assert.strictEqual(helper.toQuery([1, 2]), '');
                assert.strictEqual(helper.toQuery(47745), '');
                assert.strictEqual(helper.toQuery('a&c'), '');
                assert.strictEqual(helper.toQuery(function () {}), '');
                assert.strictEqual(helper.toQuery(null), '');
            });

            it('toQuery should convert object to a string query correctly', function () {
                assert.strictEqual(helper.toQuery({
                    a: 1,
                    b: 'test'
                }), 'a=1&b=test');
            });

            it('toQuery should ignore `undefined` values', function () {
                assert.strictEqual(helper.toQuery({
                    page: 10,
                    base: undefined
                }), 'page=10');
            });

            it('toQuery should distinguish between blank and null data', function () {
                assert.strictEqual(helper.toQuery({
                    a: 1,
                    b: 'str',
                    c: null,
                    h: ''
                }), 'a=1&b=str&c&h=');
            });

            it('config: toQuery should build queries with custom `equal` char (def: =)', function () {
                Hash.config({
                    equSymbol: ':'
                });

                assert.strictEqual(helper.toQuery({
                    aa: 'page',
                    bg: '#ccc'
                }), 'aa:page&bg:#ccc');

                Hash.config().reset();
            });

            it('config: toQuery should build queries with custom `and` symbol (def: &)', function () {
                Hash.config({
                    andSymbol: '(AND)'
                });

                assert.strictEqual(helper.toQuery({
                    name: 'Ali',
                    age: 63
                }), 'name=Ali(AND)age=63');

                Hash.config().reset();
            });
        });

        // #helper lenOfChar
        describe('lenOfChar', function () {
            it('lenOfChar should returns `0` for not includes chars or non-string entry', function () {
                assert.strictEqual(helper.lenOfChar('Hello world!', 'b'), 0);
                assert.strictEqual(helper.lenOfChar('Hello world!', [1, 4, 5]), 0);
                assert.strictEqual(helper.lenOfChar({a: 'c'}, 'v'), 0);
            });

            it('lenOfChar should returns `len-of-char` correctly', function () {
                assert.strictEqual(helper.lenOfChar('Hello world!', 'l'), 3);
                assert.strictEqual(helper.lenOfChar('a a a a a a b', 'a'), 6);
                assert.strictEqual(helper.lenOfChar('a a a a a a b', ' '), 6);
                assert.strictEqual(helper.lenOfChar('Ver ?!?', '?'), 2);
            });
        });

        // #helper isTrueHash
        describe('isTrueHash', function () {
            it('isTrueHash should returns `true` for a correct hash', function () {
                assert.strictEqual(helper.isTrueHash('Hey'), true);
                assert.strictEqual(helper.isTrueHash('/hey main how ?@\";dv'), true);
                assert.strictEqual(helper.isTrueHash('value of hash ? query'), true);
                assert.strictEqual(helper.isTrueHash('/val?query'), true);
                assert.strictEqual(helper.isTrueHash('?page=1&order'), true);
            });

            it('isTrueHash should returns `false` for a incorrect hash or non-string|empty entry', function () {
                assert.strictEqual(helper.isTrueHash([1, 2]), false);
                assert.strictEqual(helper.isTrueHash({a: 1}), false);
                assert.strictEqual(helper.isTrueHash(''), false);
            });

            it('config: isTrueHash should works with custom `que` symbol (def: ?)', function () {
                Hash.config({
                    queSymbol: '$'
                });

                assert.strictEqual(helper.isTrueHash('/val$query'), true);
                assert.strictEqual(helper.isTrueHash('$page=1&order'), true);

                Hash.config().reset();
            });
        });

        // #helper getTrueHash
        describe('getTrueHash', function () {
            it('getTrueHash should only returns an `array` with 2 loops', function () {
                assert.strictEqual(Array.isArray(helper.getTrueHash('')), true);
                assert.strictEqual(Array.isArray(helper.getTrueHash()), true);
                assert.strictEqual(Array.isArray(helper.getTrueHash({a: 4})), true);
                assert.strictEqual(Array.isArray(helper.getTrueHash(function () {})), true);
                assert.strictEqual(helper.getTrueHash('val').length, 2);
                assert.strictEqual(helper.getTrueHash(/g/g).length, 2);
            });

            it('getTrueHash should parse a hash string as `value,query` string', function () {
                assert.deepEqual(helper.getTrueHash('value?query'), ['value', 'query']);
                assert.deepEqual(helper.getTrueHash('?just-query'), ['', 'just-query']);
                assert.deepEqual(helper.getTrueHash(''), ['', '']);
                assert.deepEqual(helper.getTrueHash('only-value'), ['only-value', '']);
            });

            it('config: getTrueHash should works with custom `que` symbol (def: ?)', function () {
                Hash.config({
                    queSymbol: '$'
                });

                assert.deepEqual(helper.getTrueHash('v$q'), ['v', 'q']);
                assert.deepEqual(helper.getTrueHash('$Hello?P=c'), ['', 'Hello?P=c']);
                assert.deepEqual(helper.getTrueHash('Hello babe$a=1&b=2'), ['Hello babe', 'a=1&b=2']);

                Hash.config().reset();
            });
        });

        // #helper getWinHash
        describe('getWinHash', function () {
            // clear page hash
            ch();

            // first test
            it('getWinHash should returns window hash correctly', function () {
                assert.strictEqual(helper.getWinHash(), '');

                sh('test');
                assert.strictEqual(helper.getWinHash(), 'test');

                sh('hey?page=1');
                assert.strictEqual(helper.getWinHash(), 'hey?page=1');

                sh('hello ?c 0943-=-3295-=43c d');
                assert.strictEqual(decodeURIComponent(helper.getWinHash()), 'hello ?c 0943-=-3295-=43c d');

                // clear page hash
                ch();
            });

            it('config: getWinHash should returns window hash by custom `getHashCallback` correctly (static data)', function () {
                Hash.config({
                    getHashCallback: function () {
                        return 'Hello-babe!';
                    }
                });

                assert.strictEqual(helper.getWinHash(), 'Hello-babe!');

                sh('anything-str !');
                assert.strictEqual(helper.getWinHash(), 'Hello-babe!');

                sh('hello ?c 0943-=-3295-=43c d');
                assert.strictEqual(helper.getWinHash(), 'Hello-babe!');

                Hash.config().reset();
                // clear page hash
                ch();
            });

            it('config: getWinHash should returns window hash by custom `getHashCallback` correctly (dynamic data)', function () {
                Hash.config({
                    getHashCallback: function () {
                        return document.URL;
                    }
                });

                assert.strictEqual(helper.getWinHash(), document.URL);

                sh('any!');
                assert.strictEqual(helper.getWinHash(), document.URL);

                Hash.config().reset();
                // clear page hash
                ch();
            });

            it('config: getWinHash should returns window hash by using `getHashFilter`', function () {
                Hash.config({
                    getHashFilter: function ([d]) {
                        return d.replace(/%20/g, '');
                    }
                });

                sh('hello');
                assert.strictEqual(helper.getWinHash(), 'hello');

                sh('a b c d ? e');
                assert.strictEqual(helper.getWinHash(), 'abcd?e');

                sh('hello world');
                assert.strictEqual(helper.getWinHash(), 'helloworld');

                Hash.config().reset();
                // clear page hash
                ch();
            });

        });

        // #helper setWinHash
        describe('setWinHash', function () {
            // clear page hash
            ch();

            it('setWinHash should set window hash correctly', function () {
                assert.strictEqual(helper.getWinHash(), '');

                helper.setWinHash('test-string');
                assert.strictEqual(gh(), 'test-string');

                helper.setWinHash('v?q=2&a=c&g&u=');
                assert.strictEqual(gh(), 'v?q=2&a=c&g&u=');

                helper.setWinHash('sdj 98 3f sc3 vf');
                assert.strictEqual(gh(true), 'sdj 98 3f sc3 vf');

                // clear page hash
                ch();
            });

            it('config: setWinHash should set window hash by custom `setHashCallback` correctly', function () {
                Hash.config({
                    setHashCallback: function ([v]) {
                        window.location.hash = v.substr(0, 8);
                    }
                });


                let v1 = 'Hello-guys!';
                helper.setWinHash(v1);
                assert.strictEqual(gh(), v1.substr(0, 8));

                let v2 = 'Hey man how are u?';
                helper.setWinHash(v2);
                assert.strictEqual(gh(true), v2.substr(0, 8));

                Hash.config().reset();
                // clear page hash
                ch();
            });

            it('config: setWinHash should returns window hash by using `setHashFilter`', function () {
                Hash.config({
                    setHashFilter: function ([d]) {
                        return escape(d);
                    }
                });

                let v1 = 'indeed.page=1';
                helper.setWinHash(v1);
                assert.strictEqual(gh(), escape(v1));

                let v2 = 'Product !!!! >> << //;';
                helper.setWinHash(v2);
                assert.strictEqual(gh(), escape(v2));

                Hash.config().reset();
                // clear page hash
                ch();
            });

        });

        // #helper createObjVal
        describe('createObjVal', function () {
            it('createObjVal should returns window hash correctly', function () {
                assert.deepEqual(helper.createObjVal('hello', true), {
                    hello: true
                });

                assert.deepEqual(helper.createObjVal(['a', 'b', 'c', 'd'], 'Str'), {
                    a: 'Str',
                    b: 'Str',
                    c: 'Str',
                    d: 'Str'
                });

                assert.deepEqual(helper.createObjVal(['page', 'id'], 1), {
                    page: 1,
                    id: 1
                });

                assert.deepEqual(helper.createObjVal(['loop', 'find'], undefined), {
                    loop: undefined,
                    find: undefined
                });
            });
        });

        // #helper getHref
        describe('getHref', function () {
            it('getHref should returns page url', function () {
                assert.strictEqual(helper.getHref(), window.location.href);
            });

            it('config: getHref should returns page url by custom `getHrefCallback`', function () {
                Hash.config({
                    getHrefCallback: function () {
                        // return page title
                        return document.title;
                    }
                });

                assert.strictEqual(helper.getHref(), document.title);

                Hash.config().reset();
            });
        });

        // #helper getWindow
        describe('getWindow', function () {
            it('getWindow should returns `window`', function () {
                assert.strictEqual(helper.getWindow(), window);
            });

            it('config: getWindow should returns custom `window`', function () {
                Hash.config({
                    window: document
                });

                assert.strictEqual(helper.getWindow(), document);

                Hash.config().reset();
            });
        });

        // #helper err
        describe('err', function () {
            it('err thrown `Error` without any problem', function () {
                assert.throw(function () {helper.err('Hey, error');}, Error, '(HashJs) Hey, error');
                assert.throw(function () {helper.err(['1', '2']);}, Error, '(HashJs) 1, 2');
            });
        });

        // #helper getHashValue
        describe('getHashValue', function () {
            it('getHashValue should returns hash value as string', function () {
                sh('value-x?query');
                assert.strictEqual(helper.getHashValue(gh()), 'value-x');

                sh('css');
                assert.strictEqual(helper.getHashValue(gh()), 'css');

                sh('?op');
                assert.strictEqual(helper.getHashValue(gh()), '');

                ch();
            });
        });

        // #helper getHashQuery
        describe('getHashQuery', function () {
            it('getHashQuery should returns hash query as string', function () {
                sh('value-x?query');
                assert.strictEqual(helper.getHashQuery(gh()), 'query');

                sh('css');
                assert.strictEqual(helper.getHashQuery(gh()), '');

                sh('?op');
                assert.strictEqual(helper.getHashQuery(gh()), 'op');

                ch();
            });
        });

        // #helper setEvHash
        describe('setEvHash', function () {
            it('setEvHash should set hash for `value`', function () {
                ch();

                helper.setEvHash({
                    value: 'Hello'
                });
                assert.strictEqual(gh(), 'Hello');

                sh('any-string?any-query=ByBy');
                helper.setEvHash({
                    value: 'n!me'
                });
                assert.strictEqual(gh(), 'n!me?any-query=ByBy');

                ch();
            });

            it('setEvHash should set hash for `query`', function () {
                ch();

                helper.setEvHash({
                    query: {
                        entry: {
                            a: 'Hello',
                            b: 'Ba'
                        }
                    }
                });
                assert.strictEqual(gh(), '?a=Hello&b=Ba');
                ch();

                sh('a?c');
                helper.setEvHash({
                    query: {
                        entry: {
                            v: null,
                            h: ''
                        }
                    }
                });
                assert.strictEqual(gh(), 'a?c&v&h=');
                ch();
            });

            it('setEvHash should set hash as `string`', function () {
                ch();

                helper.setEvHash({
                    string: {
                        value: 'a-test',
                        query: 'b-test'
                    }
                });
                assert.strictEqual(gh(), 'a-test?b-test');

                helper.setEvHash({
                    string: {
                        value: 'oh'
                    }
                });
                assert.strictEqual(gh(), 'oh?b-test');

                ch();
            });

            it('setEvHash should works good', function () {
                ch();

                sh('test?p=c');
                helper.setEvHash({
                    value: 'vc',
                    query: {
                        entry: {
                            a: 1,
                            b: 2
                        },
                        type: 'define'
                    }
                });
                assert.strictEqual(gh(), 'vc?a=1&b=2');

                helper.setEvHash({
                    value: 'h',
                    query: {
                        entry: {
                            c: null
                        }
                    }
                });
                assert.strictEqual(gh(), 'h?a=1&b=2&c');

                ch();
            });
        });

        // #helper toArray
        describe('toArray', function () {
            it('toArray should returns data as `array`', function () {
                assert.deepEqual(helper.toArray(''), []);
                assert.deepEqual(helper.toArray('hb'), ['hb']);
                assert.deepEqual(helper.toArray([1, 2]), [1, 2]);
                assert.deepEqual(helper.toArray([1, 2]), [1, 2]);
            });
        });

        // #helper objForeach
        describe('objForeach', function () {
            it('objForeach should works good', function () {
                let c1 = '';
                helper.objForeach({a: 1, b: 2}, function ([k, v]) {
                    c1 += k + v + ';';
                });
                assert.strictEqual(c1, 'a1;b2;');
            });
        });

        // #helper objForeach
        describe('objFilter', function () {
            it('objFilter should works good', function () {
                let u1 = helper.objFilter({a: 1, b: 2, c: 'o'}, function ([k, v]) {
                    return k !== 'a';
                });
                assert.deepEqual(u1, {b: 2, c: 'o'});
            });
        });

        // #helper objMap
        describe('objMap', function () {
            it('objMap should works good', function () {
                let u2 = helper.objMap({a: 'A', b: 'B'}, function (k, v) {
                    return [k + '1', v + '1'];
                });
                assert.deepEqual(u2, {a1: 'A1', b1: 'B1'});
            });
        });

        // #helper parseKv
        describe('parseKv', function () {
            it('parseKv should parse string as `key,value`', function () {
                assert.deepEqual(helper.parseKv('a:1,b:2'), {a: '1',b: '2'});
            });
        });

        // #helper insertStr
        describe('insertStr', function () {
            it('insertStr should insert string in any index that entered', function () {
                assert.strictEqual(helper.insertStr('hello baby', 'me: ', 0), 'me: hello baby');
                assert.strictEqual(helper.insertStr('hello', '$', '2'), 'he$llo');
                assert.strictEqual(helper.insertStr('hello', '.', '-'), 'hello.');
                assert.strictEqual(helper.insertStr('hello', '4', -1), 'hell4o');
            });
        });

        // #helper getUrlHash
        describe('getUrlHash', function () {
            it('getUrlHash should get hash from string url', function () {
                assert.strictEqual(helper.getUrlHash('https://site.com/#hash?pv'), 'hash?pv');
                assert.strictEqual(helper.getUrlHash('https://site.com/#/Hy/#hash?pv'), '/Hy/#hash?pv');
                assert.strictEqual(helper.getUrlHash('https://site.com'), '');
            });
        });

        // #helper isRegExp
        describe('isRegExp', function () {
            it('isRegExp should returns `true` for regexp data', function () {
                assert.strictEqual(helper.isRegExp(/a/g), true);
                assert.strictEqual(helper.isRegExp(new RegExp('([a-zA-Z])', 'gi')), true);
                assert.strictEqual(helper.isRegExp(/<([\s+])+>/gm), true);
            });

            it('isRegExp should returns `false` for non-regexp data', function () {
                assert.strictEqual(helper.isRegExp([1]), false);
                assert.strictEqual(helper.isRegExp({a: 2}), false);
                assert.strictEqual(helper.isRegExp('Hello'), false);
            });
        });

        // #helper makeRandStr
        describe('makeRandStr', function () {
            it('makeRandStr should returns a right created string with true length', function () {
                const a = helper.makeRandStr(3);
                assert.strictEqual(a.length, 3);

                const b = helper.makeRandStr(20);
                assert.strictEqual(b.length, 20);
            });
        });

    });

    console.info('end helpers test at', new Date());

})();