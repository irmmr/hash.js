;(function () {
    'use strict';

    // initial values
    let assert  = window.Hash_Assert,
        gh      = window.Hash_g,
        sh      = window.Hash_s,
        ch      = window.Hash_c;

    describe('Components: value components', function () {

        it('start components:value test', function () {
            console.info('start components:value test at', new Date());
        });

        it('value components should always returns `Hash value component` function', function () {
            assert.strictEqual(typeof Hash.v.set().replace().add().clear().remove(), 'function');
        });

        describe('add', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('add should be able to can add string in position after', function () {
                sh('Hello-Babe?query');

                Hash.v.add('-Test');
                assert.strictEqual(gh(), 'Hello-Babe-Test?query');

                Hash.v.add('-Test', 'after');
                assert.strictEqual(gh(), 'Hello-Babe-Test-Test?query');

                Hash.v.add('-Op', {
                    position: 'after'
                });
                assert.strictEqual(gh(), 'Hello-Babe-Test-Test-Op?query');

                ch();
            });

            it('add should be able to can add string on after a string', function () {
                sh('test-string?query=val-opt');

                Hash.v.add('j-', 'after:-');
                assert.strictEqual(gh(), 'test-j-string?query=val-opt');

                Hash.v.add('-p+', 'after:j-string');
                assert.strictEqual(gh(), 'test-j-string-p+?query=val-opt');

                Hash.v.add('HEY', 'after:-');
                assert.strictEqual(gh(), 'test-HEYj-string-p+?query=val-opt');

                Hash.v.add('A', {
                    position: 'after:-',
                    multiple: true
                });
                assert.strictEqual(gh(), 'test-AHEYj-Astring-Ap+?query=val-opt');

                ch();
            });

            it('add should be able to can add string in position before', function () {
                sh('hello-guys?q');

                Hash.v.add('Oh', 'before');
                assert.strictEqual(gh(), 'Ohhello-guys?q');

                Hash.v.add('cc-', {
                    position: 'before'
                });
                assert.strictEqual(gh(), 'cc-Ohhello-guys?q');

                ch();
            });

            it('add should be able to can add string on before a string', function () {
                sh('hi-how-are-you-?call=change');

                Hash.v.add('I', 'before:you');
                assert.strictEqual(gh(), 'hi-how-are-Iyou-?call=change');

                Hash.v.add('-p', 'before:-how');
                assert.strictEqual(gh(), 'hi-p-how-are-Iyou-?call=change');

                Hash.v.add('O', 'before:o');
                assert.strictEqual(gh(), 'hi-p-hOow-are-Iyou-?call=change');

                Hash.v.add('$', {
                    position: 'before:o',
                    multiple: true
                });
                assert.strictEqual(gh(), 'hi-p-hO$ow-are-Iy$ou-?call=change');

                ch();
            });

            it('add should be able to can add string by index', function () {
                sh('abcdefg?main=true');

                Hash.v.add('Iam|', 'index:0');
                assert.strictEqual(gh(), 'Iam|abcdefg?main=true');

                Hash.v.add('y', 'index:1');
                assert.strictEqual(gh(), 'Iyam|abcdefg?main=true');

                Hash.v.add('META14', 'index:4');
                assert.strictEqual(gh(), 'IyamMETA14|abcdefg?main=true');

                Hash.v.add('rr', 'index:-5');
                assert.strictEqual(gh(), 'IyamMETA14|abrrcdefg?main=true');

                Hash.v.add('HY', 'index:-');
                assert.strictEqual(gh(), 'IyamMETA14|abrrcdefgHY?main=true');

                ch();
            });
        });

        describe('clear', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('clear should be able to can clear all hash value', function () {
                ch();

                Hash.v.clear();
                assert.strictEqual(gh(), '');
                assert.strictEqual(window.location.href.includes('#'), false);

                sh('hello-test');
                Hash.v.clear();
                assert.strictEqual(gh(), '');

                sh('hello-test?query');
                Hash.v.clear();
                assert.strictEqual(gh(), '?query');

                ch();
            });
        });

        describe('get', function () {
            window.Mocha_delay(window.Mocha_sec);

            it('get should returns `hash` value as string', function () {
                sh('test-str');
                assert.strictEqual(Hash.v.get(), 'test-str');

                sh('test-str884g?page=1');
                assert.strictEqual(Hash.v.get(), 'test-str884g');

                sh('');
                assert.strictEqual(Hash.v.get(), '');

                ch();
            });
        });

        describe('have', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('have should returns `true|false` for have containing value or not', function () {
                sh('Hello babe');
                assert.strictEqual(Hash.v.have(), true);

                ch();
                assert.strictEqual(Hash.v.have(), false);

                sh('?page=1&g=ccs');
                assert.strictEqual(Hash.v.have(), false);

                ch();
            });

            it('have should be able to check hash value includes some words or not', function () {
                sh('Hello-babe?internal=true&ee=2673');
                assert.strictEqual(Hash.v.have('H'), true);
                assert.strictEqual(Hash.v.have('ll'), true);
                assert.strictEqual(Hash.v.have('Hello'), true);
                assert.strictEqual(Hash.v.have('-'), true);
                assert.strictEqual(Hash.v.have('Opc'), false);
                assert.strictEqual(Hash.v.have('Hey'), false);
                assert.strictEqual(Hash.v.have('Hello-babe'), true);

                assert.strictEqual(Hash.v.have(['Hello-babe', 'H', 'b']), true);
                assert.strictEqual(Hash.v.have(['ello', 'babe']), true);
                assert.strictEqual(Hash.v.have(['ello', 'babe', 'uug']), false);

                ch();
            });
        });

        describe('is', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('is should returns `true|false` for check url hash value data', function () {
                sh('Hello babe-OPT?page=12');
                assert.strictEqual(Hash.v.is('Op'), false);
                assert.strictEqual(Hash.v.is(), false);
                assert.strictEqual(Hash.v.is('Hello%20babe-OPT'), true);

                sh('val?que');
                assert.strictEqual(Hash.v.is('val'), true);
                assert.strictEqual(Hash.v.is('v'), false);

                sh('?que');
                assert.strictEqual(Hash.v.is(''), true);

                ch();
                assert.strictEqual(Hash.v.is(''), true);
                assert.strictEqual(Hash.v.is('v'), false);

                ch();
            });
        });

        describe('remove', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('remove should be able to can remove some parts of hash value', function () {
                sh('test-world-HHQ?p=1&tgc');
                Hash.v.remove('t');
                assert.strictEqual(gh(), 'es-world-HHQ?p=1&tgc');

                Hash.v.remove('-');
                assert.strictEqual(gh(), 'esworldHHQ?p=1&tgc');

                Hash.v.remove(['w', 'HHQ', 'l']);
                assert.strictEqual(gh(), 'esord?p=1&tgc');

                ch();
            });
        });

        describe('replace', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('replace should be able to can replace some parts of url hash', function () {
                sh('the-value-string?the-query-string');
                Hash.v.replace('-', '%%');
                assert.strictEqual(gh(), 'the%%value-string?the-query-string');

                Hash.v.replace('the', 'eh');
                assert.strictEqual(gh(), 'eh%%value-string?the-query-string');

                Hash.v.replace(/-/g, '+');
                assert.strictEqual(gh(), 'eh%%value+string?the-query-string');

                Hash.v.replace(/string/g, '');
                assert.strictEqual(gh(), 'eh%%value+?the-query-string');

                ch();
            });
        });

        describe('set', function () {
            window.Mocha_delay(window.Mocha_sec);
            it('set should be able to can set url hash as string', function () {
                Hash.v.set('the-value');
                assert.strictEqual(gh(), 'the-value');

                sh('hash-val?query')
                Hash.v.set('ev');
                assert.strictEqual(gh(), 'ev?query');

                Hash.v.set('');
                assert.strictEqual(gh(), '?query');

                ch();
            });
        });
    });

})();