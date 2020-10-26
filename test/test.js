/* 
 * HashJs test script (v1.0)
 * Copyright (c) 2020 IRMMR
 * MIT License
 */

;(function (window) {

    // Use the main library of hash
    const hsh = new Hash.lib(),
        inf = Hash.info();

    // Simple get and set window hash without Hash.js for test
    const GH = () => {
        return window.location.hash;
    }
    const SH = (v = '') => {
        window.location.hash = v;
    }
    const PASS = (code, s = true) => {
        let el = document.getElementById(`ap_${code}`);
        if (el == null) {
            return false;
        }
        if (s) {
            el.classList.add('co-g');
            el.classList.remove('co-r');
            el.innerHTML = 'PASSED';
        } else {
            el.classList.add('co-r');
            el.classList.remove('co-g');
            el.innerHTML = 'FAILED';
        }
        return true;
    }

    // Hash event to check for page hash changes
    Hash.event('load', function () {
        let d = new Date();
        document.getElementById('all_changes').innerHTML += `<div class="c-loop"><b style="color:blue">(LOAD)</b> window location hash loaded in <code>${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}</code></div>`;
    });
    Hash.event('change', function () {
        let d = new Date();
        document.getElementById('all_changes').innerHTML += `<div class="c-loop"><b style="color:green">(CHANGE)</b> window location hash changed in <code>${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}</code></div>`;
    });

    // All steps function
    function stepActionsTestHashJS() {
        // step 1
        SH('testForCLear');
        hsh.clear();
        PASS('yjsggf783', GH() == '');

        // step 2
        PASS('fghhdf83', (typeof inf.hashVersion !== 'undefined' && inf.hashVersion !== '?') && (typeof inf.packVersion !== 'undefined' && inf.packVersion !== '?'));

        // step 3
        SH('aabbccddee');
        hsh.remove(['a', 'b']);
        PASS('ffgerhjfg', GH() == '#ccddee');

        // step 4
        SH('aaccbbdd?a=b&c=d');
        hsh.removeValue(['a', 'b']);
        PASS('ffgggjhrhg', GH() == '#ccdd?a=b&c=d');

        // step 5
        SH('?a=b&c=e&d');
        hsh.removeQuery(['c', 'd']);
        PASS('bhtyre4g', GH() == '#?a=b');

        // step 6
        SH('abc');
        const h1 = hsh.have() && hsh.have('a');
        hsh.clear();
        const h2 = hsh.have();
        PASS('bdggrtyhd', h1 && !h2);

        // step 7
        SH('abc?b=c&e=f');
        const h3 = hsh.haveValue() && hsh.haveValue('a');
        SH('?b=c&e=f');
        const h4 = hsh.haveValue();
        PASS('fkljri4fg', h3 && !h4);

        // step 8
        SH('abc?b=c&e=f');
        const h5 = hsh.haveQuery() && hsh.haveQuery('b');
        SH('abc');
        const h6 = hsh.haveQuery();
        PASS('sf43hg657g', h5 && !h6);

        // step 8
        SH('abc?b=c&e=f');
        hsh.clearValue();
        PASS('iuyf8yoig', GH() == '#?b=c&e=f');

        // step 8
        SH('abc?b=c&e=f');
        hsh.clearQuery();
        PASS('kjsdhyuew', GH() == '#abc');

        // step 9
        SH('abcde?p');
        PASS('dkshihi4', hsh.get() == 'abcde?p');

        // step 10
        SH('abc?po=e');
        PASS('kufyii4ld', hsh.getValue() == 'abc');
        
        // step 11
        SH('abc?a=b&c=d&e');
        PASS('kgo8jdllk', hsh.getQuery('e')['e'] == null && hsh.getQuery('a')['a'] == 'b');

        // step 12
        hsh.set('a?b');
        PASS('dsfhkhikd', GH() == '#a?b');

        // step 13
        SH('a?b=c');
        hsh.setValue('abc');
        PASS('kijhvgyud', GH() == '#abc?b=c');

        // step 14
        SH('abcd?b=c&e=q');
        hsh.setQuery({
            a : 'b',
            c : 'd',
        });
        PASS('fkhdkikt4', GH() == '#abcd?a=b&c=d');

        // step 15
        SH('ab?e=f');
        hsh.add('ok');
        PASS('lkjdshfny', GH() == '#ab?e=fok');

        // step 16
        SH('ar?r=e');
        hsh.addValue('te');
        PASS('dsfiirtef', GH() == '#arte?r=e');

        // step 17
        SH('arc?r=e&p=q&f');
        hsh.addQuery({
            g : 'h',
            c : null,
        });
        PASS('slkjlfdjji', GH() == '#arc?g=h&c&r=e&p=q&f');

        // step 18
        SH('ar?r=e&u=i');
        hsh.updateQuery('u', 'c');
        PASS('dsij43igfh', GH() == '#ar?r=e&u=c');

        // step 19
        SH('arc');
        PASS('djfosdufou', hsh.is('arc'));

        // step 20
        SH('abc?a=f');
        PASS('gfdhgdfhdfg', hsh.isValue('abc'));

        // step 21
        SH('ac?a=f&e=g');
        PASS('sdfkgietyr', hsh.isQuery('e', 'g'));

        
        // clear hash after test
        hsh.clear();
    }

    // set all-step functions to window listener
    window.addEventListener('load', stepActionsTestHashJS);

})(window);