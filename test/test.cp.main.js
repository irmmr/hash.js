;(function () {
    'use strict';

    // initial values
    let assert  = window.Hash_Assert,
        gh      = window.Hash_g,
        sh      = window.Hash_s,
        ch      = window.Hash_c;

    describe('Components: main components', function () {

        it('start components:main test', function () {
            console.info('start components:test test at', new Date());
        });

        describe('add', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('add should returns main `HashComponent` function', function () {
                assert.strictEqual(typeof Hash.add(), 'function');
            });

            it('add should be able to can add string in position after', function () {
                sh('Hello-Babe');

                Hash.add('-Test');
                assert.strictEqual(gh(), 'Hello-Babe-Test');

                Hash.add('-Test', 'after');
                assert.strictEqual(gh(), 'Hello-Babe-Test-Test');

                Hash.add('-Op', {
                    position: 'after'
                });
                assert.strictEqual(gh(), 'Hello-Babe-Test-Test-Op');

                ch();
            });

            it('add should be able to can add string on after a string', function () {
                sh('test-string');

                Hash.add('j-', 'after:-');
                assert.strictEqual(gh(), 'test-j-string');

                Hash.add('-p+', 'after:j-string');
                assert.strictEqual(gh(), 'test-j-string-p+');

                Hash.add('HEY', 'after:-');
                assert.strictEqual(gh(), 'test-HEYj-string-p+');

                Hash.add('A', {
                    position: 'after:-',
                    multiple: true
                });
                assert.strictEqual(gh(), 'test-AHEYj-Astring-Ap+');

                ch();
            });

            it('add should be able to can add string in position before', function () {
                sh('hello-guys');

                Hash.add('Oh,', 'before');
                assert.strictEqual(gh(), 'Oh,hello-guys');

                Hash.add('cc-', {
                    position: 'before'
                });
                assert.strictEqual(gh(), 'cc-Oh,hello-guys');

                ch();
            });

            it('add should be able to can add string on before a string', function () {
                sh('hi-how-are-you-?');

                Hash.add('I', 'before:you');
                assert.strictEqual(gh(), 'hi-how-are-Iyou-?');

                Hash.add('-p', 'before:-how');
                assert.strictEqual(gh(), 'hi-p-how-are-Iyou-?');

                Hash.add('O', 'before:o');
                assert.strictEqual(gh(), 'hi-p-hOow-are-Iyou-?');

                Hash.add('$', {
                    position: 'before:o',
                    multiple: true
                });
                assert.strictEqual(gh(), 'hi-p-hO$ow-are-Iy$ou-?');

                ch();
            });

            it('add should be able to can add string by index', function () {
                sh('abcdefg?main=true');

                Hash.add('Iam|', 'index:0');
                assert.strictEqual(gh(), 'Iam|abcdefg?main=true');

                Hash.add('y', 'index:1');
                assert.strictEqual(gh(), 'Iyam|abcdefg?main=true');

                Hash.add('META14', 'index:18');
                assert.strictEqual(gh(), 'Iyam|abcdefg?main=META14true');

                Hash.add('rr', 'index:-5');
                assert.strictEqual(gh(), 'Iyam|abcdefg?main=META1rr4true');

                Hash.add('HY', 'index:-');
                assert.strictEqual(gh(), 'Iyam|abcdefg?main=META1rr4trueHY');

                ch();
            });
        });

        describe('clear', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('clear should returns main `HashComponent` function', function () {
                assert.strictEqual(typeof Hash.clear(), 'function');
            });

            it('clear should be able to can clear all hash with `push_state`', function () {
                sh('Hello-Babe');

                Hash.clear();
                assert.strictEqual(gh(), '');
                assert.strictEqual(window.location.href.includes('#'), false);

                ch();
            });

            it('clear should be able to can clear all hash without `push_state`', function () {
                sh('Hello-o');

                Hash.clear(false);
                assert.strictEqual(gh(), '');
                assert.strictEqual(window.location.href.includes('#'), true);

                ch();
            });
        });

        describe('get', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('get should returns `hash` as string', function () {
                sh('test-str');
                assert.strictEqual(Hash.get(), 'test-str');

                sh('test-str884g');
                assert.strictEqual(Hash.get(), 'test-str884g');

                ch();
            });
        });

        describe('have', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('have should returns `true|false` for url containing hash or not', function () {
                sh('Hello babe');
                assert.strictEqual(Hash.have(), true);

                ch();
                assert.strictEqual(Hash.have(), false);

                sh('');
                assert.strictEqual(Hash.have(), false);

                ch();
            });

            it('have should be able to check url includes some words or not', function () {
                sh('Hello-babe');
                assert.strictEqual(Hash.have('H'), true);
                assert.strictEqual(Hash.have('ll'), true);
                assert.strictEqual(Hash.have('Hello'), true);
                assert.strictEqual(Hash.have('-'), true);
                assert.strictEqual(Hash.have('Opc'), false);
                assert.strictEqual(Hash.have('Hey'), false);
                assert.strictEqual(Hash.have('Hello-babe'), true);

                assert.strictEqual(Hash.have(['Hello-babe', 'H', 'b']), true);
                assert.strictEqual(Hash.have(['ello', 'babe']), true);
                assert.strictEqual(Hash.have(['ello', 'babe', 'uug']), false);

                ch();
            });
        });

        describe('is', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('is should returns `true|false` for check url hash data', function () {
                sh('Hello babe-OPT');
                assert.strictEqual(Hash.is('Op'), false);
                assert.strictEqual(Hash.is(), false);
                assert.strictEqual(Hash.is('Hello%20babe-OPT'), true);

                ch();
                assert.strictEqual(Hash.is(''), true);
                assert.strictEqual(Hash.is('v'), false);

                ch();
            });
        });

        describe('lock', function () {
            window.Mocha_delay(window.Mocha_sec);

            describe('lock: lock url hash', function () {
                it('lock should be able to can lock url hash', async function () {
                    sh('Hello');
                    Hash.lock();
                    assert.strictEqual(gh(), 'Hello');

                    await function () {
                        sh('opt!change');
                        assert.strictEqual(gh(), 'Hello');

                        sh('');
                        assert.strictEqual(gh(), 'Hello');
                    }
                });
            });

            describe('unlock: unlock url hash', function () {
                it('unlock should be able to can unlock url hash', async function () {
                    assert.strictEqual(gh(), 'Hello');

                    sh('test-str-cc');
                    assert.strictEqual(gh(), 'test-str-cc');

                    Hash.unlock();

                    await function () {
                        sh('opt!change');
                        assert.strictEqual(gh(), 'opt!change');

                        sh('');
                        assert.strictEqual(gh(), '');
                    }
                });
            });

            describe('isLocked: get url hash lock status', function () {
                it('isLocked should returns `true` if url hash is locked', function () {
                    Hash.lock();
                    assert.strictEqual(Hash.isLocked(), true);
                });

                it('isLocked should returns `false` if url hash is not locked', function () {
                    Hash.unlock();
                    assert.strictEqual(Hash.isLocked(), false);

                    ch();
                });
            });
        });

        describe('remove', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('remove should be able to can remove some parts of url hash', function () {
                sh('test?p=1&gc');
                Hash.remove('?');
                assert.strictEqual(gh(), 'testp=1&gc');

                Hash.remove('test');
                assert.strictEqual(gh(), 'p=1&gc');

                sh('test?p=1&gc&v=Hello-p;&uc=j');
                Hash.remove(['=', '&', '?', 'test', 'j']);
                assert.strictEqual(gh(), 'p1gcvHello-p;uc');

                ch();
            });
        });

        describe('replace', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('replace should be able to can replace some parts of url hash', function () {
                sh('the-value-string?the-query-string');
                Hash.replace('?', '%%');
                assert.strictEqual(gh(), 'the-value-string%%the-query-string');

                Hash.replace('the', 'eh');
                assert.strictEqual(gh(), 'eh-value-string%%the-query-string');

                Hash.replace(/-/g, '+');
                assert.strictEqual(gh(), 'eh+value+string%%the+query+string');

                Hash.replace(/string/g, '');
                assert.strictEqual(gh(), 'eh+value+%%the+query+');

                ch();
            });
        });

        describe('set', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('set should be able to can set url hash as string', function () {
                Hash.set('the-value');
                assert.strictEqual(gh(), 'the-value');

                Hash.set('the-values');
                assert.strictEqual(gh(), 'the-values');

                Hash.set('');
                assert.strictEqual(gh(), '');

                ch();
            });
        });
    });

})();