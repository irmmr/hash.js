;(function () {
    'use strict';

    // initial values
    let assert  = window.Hash_Assert,
        gh      = window.Hash_g,
        sh      = window.Hash_s,
        ch      = window.Hash_c;

    describe('Components: query components', function () {

        it('start components:query test', function () {
            console.info('start components:query test at', new Date());
        });

        it('query components should always returns `Hash value component` function', function () {
            assert.strictEqual(typeof Hash.q.set().add().clear().remove(), 'function');
        });

        describe('add', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('add should be able to can add queries to hash query', function () {
                sh('Hello-Babe?query');

                Hash.q.add('nova');
                assert.strictEqual(gh(), 'Hello-Babe?query&nova');

                Hash.q.add('page', 1);
                assert.strictEqual(gh(), 'Hello-Babe?query&nova&page=1');

                Hash.q.add({
                    pos: 'true',
                    page: 2,
                    handle: 'direct'
                });
                assert.strictEqual(gh(), 'Hello-Babe?query&nova&page=1&pos=true&handle=direct');

                ch();
            });
        });

        describe('clear', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('clear should be able to can clear all hash query', function () {
                ch();

                Hash.q.clear();
                assert.strictEqual(gh(), '');

                sh('hello-test');
                Hash.q.clear();
                assert.strictEqual(gh(), 'hello-test');

                sh('hello-test?query');
                Hash.q.clear();
                assert.strictEqual(gh(), 'hello-test');

                ch();
            });
        });

        describe('get', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('get should returns `hash` query as object', function () {
                sh('test-str');
                assert.deepEqual(Hash.q.get(), {});

                sh('test-str884g?page=1');
                assert.deepEqual(Hash.q.get(), {page: 1});

                sh('test-g?page&med=hello-man&ok=false');
                assert.deepEqual(Hash.q.get(), {page:null, med:'hello-man', ok:false});

                assert.deepEqual(Hash.q.get('page'), null);
                assert.deepEqual(Hash.q.get('med'), 'hello-man');
                assert.deepEqual(Hash.q.get('mec'), undefined);
                assert.deepEqual(Hash.q.get('ok'), false);

                sh('test?page&med=hello-man&q&a=b&def=9048832&pop=true');
                assert.deepEqual(Hash.q.get(['a', 'q']), {a: 'b', q: null});
                assert.deepEqual(Hash.q.get(['page', 'cq']), {page: null, cq: undefined});
                assert.deepEqual(Hash.q.get(['def', 'pop']), {def: 9048832, pop: true});

                ch();
            });

            it('get should work correctly with `parseQueryValue` option', function () {
                sh('te?page=1&is_change=false&name=ho&me&_df=Hey man how are you?');
                assert.deepEqual(Hash.q.get(), {
                    page: 1,
                    is_change: false,
                    name: 'ho',
                    me: null,
                    _df: 'Hey man how are you?'
                });

                Hash.config({ parseQueryValue: false });

                sh('te?page=1&is_change=false&name=ho&me&_df=Hey man how are you?');
                assert.deepEqual(Hash.q.get(), {
                    page: '1',
                    is_change: 'false',
                    name: 'ho',
                    me: null,
                    _df: 'Hey man how are you?'
                });

                Hash.config({ parseQueryValue: true });

                ch();
            });
        });

        describe('have', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('have should returns `true|false` for have containing query or not', function () {
                sh('Hello babe');
                assert.strictEqual(Hash.q.have(), false);
                sh('Hello babe?q');
                assert.strictEqual(Hash.q.have(), true);

                sh('?page=1&g=ccs');
                assert.strictEqual(Hash.q.have(), true);

                sh('');
                assert.strictEqual(Hash.q.have(), false);

                ch();
            });

            it('have should be able to check hash query includes queries', function () {
                sh('Hello-babe?internal=true&ee=2673&a&b&r=hello');
                assert.strictEqual(Hash.q.have('H'), false);
                assert.strictEqual(Hash.q.have('ll'), false);
                assert.strictEqual(Hash.q.have('r'), true);
                assert.strictEqual(Hash.q.have('internal'), true);
                assert.strictEqual(Hash.q.have('a'), true);

                assert.strictEqual(Hash.q.have(['a', 'b', 'r']), true);
                assert.strictEqual(Hash.q.have(['a', 'b', 'cv']), false);

                ch();
            });
        });

        describe('is', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('is should returns `true|false` for check url hash query data', function () {
                sh('Hellobabe-OPT?page=12&order=desc&hc&place=false');
                assert.strictEqual(Hash.q.is('order', 'desc'), true);
                assert.strictEqual(Hash.q.is(), false);
                assert.strictEqual(Hash.q.is('hc', null), true);
                assert.strictEqual(Hash.q.is('hcv', undefined), true);
                assert.strictEqual(Hash.q.is('page', undefined), false);
                assert.strictEqual(Hash.q.is('page', 12), true);
                assert.strictEqual(Hash.q.is('place', false), true);

                ch();
            });
        });

        describe('remove', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('remove should be able to can remove some parts of hash query', function () {
                sh('test?p=1&tgc&a=b&c=d&hhq=4398932');
                Hash.q.remove('p');
                assert.strictEqual(gh(), 'test?tgc&a=b&c=d&hhq=4398932');

                Hash.q.remove('a');
                assert.strictEqual(gh(), 'test?tgc&c=d&hhq=4398932');

                Hash.q.remove(['tgc', 'hhq']);
                assert.strictEqual(gh(), 'test?c=d');

                ch();
            });
        });

        describe('set', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('set should be able to can set url hash query', function () {
                Hash.q.set('q');
                assert.strictEqual(gh(), '?q');

                sh('hash-val?query')
                Hash.q.set('ev', 4773);
                assert.strictEqual(gh(), 'hash-val?query&ev=4773');

                Hash.q.set('');
                assert.strictEqual(gh(), 'hash-val?query&ev=4773');

                Hash.q.set('e', 'pager');
                assert.strictEqual(gh(), 'hash-val?query&ev=4773&e=pager');

                Hash.q.set('query', 'he');
                assert.strictEqual(gh(), 'hash-val?query=he&ev=4773&e=pager');

                Hash.q.set({
                    query: null,
                    ev: 23,
                    main: 'Hi'
                });
                assert.strictEqual(gh(), 'hash-val?query&ev=23&e=pager&main=Hi');

                ch();
            });
        });

        describe('define', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('define should be able to can define url hash query', function () {
                sh('hash-val?query')
                Hash.q.define({
                    ev: 4773
                });
                assert.strictEqual(gh(), 'hash-val?ev=4773');

                Hash.q.define({
                    e: 'pager'
                });
                assert.strictEqual(gh(), 'hash-val?e=pager');

                Hash.q.define({
                    query: null,
                    ev: 23,
                    main: 'Hi'
                });
                assert.strictEqual(gh(), 'hash-val?query&ev=23&main=Hi');

                ch();
            });
        });

        describe('update', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('update should be able to can update url hash query', function () {
                sh('hash-val?query&e&y=ssl')
                Hash.q.update('query', 'match');
                assert.strictEqual(gh(), 'hash-val?query=match&e&y=ssl');

                Hash.q.update({
                    e: 'pager'
                });
                assert.strictEqual(gh(), 'hash-val?query=match&e=pager&y=ssl');

                Hash.q.update({
                    query: 12,
                    e: null,
                    my: 'Hc'
                });
                assert.strictEqual(gh(), 'hash-val?query=12&e&y=ssl');

                ch();
            });
        });

    });

})();