;(function () {
    'use strict';

    // initial values
    let assert  = window.Hash_Assert,
        gh      = window.Hash_g,
        sh      = window.Hash_s,
        ch      = window.Hash_c;

    describe('Components: query string components', function () {

        it('start components:query-str test', function () {
            console.info('start components:query-str test at', new Date());
        });

        it('query string components should always returns `Hash queryStr component` function', function () {
            assert.strictEqual(typeof Hash.q.str.set().replace().add().remove(), 'function');
        });

        describe('add', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('add should be able to can add string in position after', function () {
                sh('Hello-Babe?query');

                Hash.q.str.add('-Test');
                assert.strictEqual(gh(), 'Hello-Babe?query-Test');

                Hash.q.str.add('-Test', 'after');
                assert.strictEqual(gh(), 'Hello-Babe?query-Test-Test');

                Hash.q.str.add('-Op', {
                    position: 'after'
                });
                assert.strictEqual(gh(), 'Hello-Babe?query-Test-Test-Op');

                ch();
            });

            it('add should be able to can add string on after a string', function () {
                sh('test-string?query=val-opt');

                Hash.q.str.add('j-', 'after:-');
                assert.strictEqual(gh(), 'test-string?query=val-j-opt');

                Hash.q.str.add('-p+', 'after:query');
                assert.strictEqual(gh(), 'test-string?query-p+=val-j-opt');

                Hash.q.str.add('HEY', 'after:-');
                assert.strictEqual(gh(), 'test-string?query-HEYp+=val-j-opt');

                Hash.q.str.add('A', {
                    position: 'after:-',
                    multiple: true
                });
                assert.strictEqual(gh(), 'test-string?query-AHEYp+=val-Aj-Aopt');

                ch();
            });

            it('add should be able to can add string in position before', function () {
                sh('hello-guys?q');

                Hash.q.str.add('Oh', 'before');
                assert.strictEqual(gh(), 'hello-guys?Ohq');

                Hash.q.str.add('cc-', {
                    position: 'before'
                });
                assert.strictEqual(gh(), 'hello-guys?cc-Ohq');

                ch();
            });

            it('add should be able to can add string on before a string', function () {
                sh('hi?call=change-my-mind-please&a&b');

                Hash.q.str.add('now', 'before:=');
                assert.strictEqual(gh(), 'hi?callnow=change-my-mind-please&a&b');

                Hash.q.str.add('!', 'before:-');
                assert.strictEqual(gh(), 'hi?callnow=change!-my-mind-please&a&b');

                Hash.q.str.add('O', 'before:c');
                assert.strictEqual(gh(), 'hi?Ocallnow=change!-my-mind-please&a&b');

                Hash.q.str.add('$', {
                    position: 'before:-',
                    multiple: true
                });
                assert.strictEqual(gh(), 'hi?Ocallnow=change!$-my$-mind$-please&a&b');

                ch();
            });

            it('add should be able to can add string by index', function () {
                sh('abcdefg?main=true');

                Hash.q.str.add('Iam', 'index:0');
                assert.strictEqual(gh(), 'abcdefg?Iammain=true');

                Hash.q.str.add('y', 'index:1');
                assert.strictEqual(gh(), 'abcdefg?Iyammain=true');

                Hash.q.str.add('META14', 'index:4');
                assert.strictEqual(gh(), 'abcdefg?IyamMETA14main=true');

                Hash.q.str.add('rr', 'index:-5');
                assert.strictEqual(gh(), 'abcdefg?IyamMETA14mainrr=true');

                Hash.q.str.add('HY', 'index:-');
                assert.strictEqual(gh(), 'abcdefg?IyamMETA14mainrr=trueHY');

                ch();
            });
        });

        describe('get', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('get should returns `hash` query as string', function () {
                sh('test-str?que=page&ed=true');
                assert.strictEqual(Hash.q.str.get(), 'que=page&ed=true');

                sh('test-str884g?page=1');
                assert.strictEqual(Hash.q.str.get(), 'page=1');

                sh('');
                assert.strictEqual(Hash.q.str.get(), '');

                ch();
            });
        });

        describe('have', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('have should returns `true|false` for have containing query string or not', function () {
                sh('?query');
                assert.strictEqual(Hash.q.str.have(), true);

                sh('Hello');
                assert.strictEqual(Hash.q.str.have(), false);

                sh('er?page=1&g=ccs');
                assert.strictEqual(Hash.q.str.have(), true);

                ch();
            });

            it('have should be able to check hash query includes some words or not', function () {
                sh('ou?Hello-babe=true&ee=2673');
                assert.strictEqual(Hash.q.str.have('H'), true);
                assert.strictEqual(Hash.q.str.have('ll'), true);
                assert.strictEqual(Hash.q.str.have('Hello'), true);
                assert.strictEqual(Hash.q.str.have('-'), true);
                assert.strictEqual(Hash.q.str.have('Opc'), false);
                assert.strictEqual(Hash.q.str.have('Hey'), false);
                assert.strictEqual(Hash.q.str.have('Hello-babe'), true);

                assert.strictEqual(Hash.q.str.have(['Hello-babe', 'H', 'b']), true);
                assert.strictEqual(Hash.q.str.have(['ello', 'babe', '&']), true);
                assert.strictEqual(Hash.q.str.have(['ello', 'babe', 'uug']), false);

                ch();
            });
        });

        describe('is', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('is should returns `true|false` for check url hash query data as string', function () {
                sh('Hello babe-OPT?page=12');
                assert.strictEqual(Hash.q.str.is('Op'), false);
                assert.strictEqual(Hash.q.str.is(), false);
                assert.strictEqual(Hash.q.str.is('page=12'), true);

                sh('val?que');
                assert.strictEqual(Hash.q.str.is('que'), true);
                assert.strictEqual(Hash.q.str.is('q'), false);

                sh('Mo');
                assert.strictEqual(Hash.q.str.is(''), true);

                ch();
                assert.strictEqual(Hash.q.str.is(''), true);
                assert.strictEqual(Hash.q.str.is('2s'), false);
            });
        });

        describe('remove', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('remove should be able to can remove some parts of hash query as string', function () {
                sh('test?p=1&tgc&HHQ=server');
                Hash.q.str.remove('t');
                assert.strictEqual(gh(), 'test?p=1&gc&HHQ=server');

                Hash.q.str.remove('&');
                assert.strictEqual(gh(), 'test?p=1gcHHQ=server');

                Hash.q.str.remove(['s', 'HHQ', 'e']);
                assert.strictEqual(gh(), 'test?p=1gc=rvr');

                ch();
            });
        });

        describe('replace', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('replace should be able to can replace some parts of url hash query as string', function () {
                sh('the-value-string?the-query-string');
                Hash.q.str.replace('-', '!');
                assert.strictEqual(gh(), 'the-value-string?the!query-string');

                Hash.q.str.replace('the', 'eh');
                assert.strictEqual(gh(), 'the-value-string?eh!query-string');

                Hash.q.str.replace(/[!-]/g, '+');
                assert.strictEqual(gh(), 'the-value-string?eh+query+string');

                Hash.q.str.replace(/string/g, '');
                assert.strictEqual(gh(), 'the-value-string?eh+query+');

                ch();
            });
        });

        describe('set', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('set should be able to can set url hash query as string', function () {
                Hash.q.str.set('the-query');
                assert.strictEqual(gh(), '?the-query');

                sh('hash-val?query')
                Hash.q.str.set('page=1&y');
                assert.strictEqual(gh(), 'hash-val?page=1&y');

                Hash.q.str.set('');
                assert.strictEqual(gh(), 'hash-val');

                ch();
            });
        });
    });

})();