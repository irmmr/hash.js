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
    const SH = (v = '', element = '') => {
        if (element !== '') {
            document.getElementById(element).innerHTML += `<div class="l-a"><small>before: </small><span style="border-bottom:1px #000 dashed;">#${v}</span></div>`
        }
        window.location.hash = v;
    }
    const EP = (element) => {
        let v = window.location.hash
        if (v == '') {
            v = 'none'
        }
        document.getElementById(element).querySelector('.l-a').innerHTML += ` <span style="color:green"> ===> </span> <small>after: </small><span style="border-bottom:1px #000 dashed;">${v}</span>`
    }
    const VAL = (element, value, text = 'value') => {
        document.getElementById(element).innerHTML += `<div class="l-a"><small>${text}: </small>${value}</div>`
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
        let d = new Date()
        document.getElementById('all_changes').innerHTML += `<div class="c-loop"><b style="color:blue">(LOAD)</b> page's hash loaded in <code>${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}</code></div>`;
    });
    Hash.event('change', function () {
        let d = new Date()
        document.getElementById('all_changes').innerHTML += `<div class="c-loop"><b style="color:green">(CHANGE)</b> page's hash changed in <code>${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}</code></div>`;
    });

    let dr  = document.querySelectorAll('.l-loop'),
        ind = 1
    for (let i in dr) {
        if (dr.hasOwnProperty(i)) {
            let l = dr[i]
            l.querySelector('.f-l').querySelector('i').innerHTML = '#' + ind + ' '
            ind ++
        }
    }

    // All steps function
    function stepActionsTestHashJS() {
        // step 1
        SH('testForCLear', 'yjsggf783');
        hsh.clear();
        EP('yjsggf783');
        PASS('yjsggf783', GH() == '');

        // step 2
        PASS('fghhdf83', (typeof inf.version !== 'undefined' && inf.version !== '?'));
        VAL('fghhdf83', inf.version, 'collected')

        // step 3
        SH('aabbccddee', 'ffgerhjfg');
        hsh.remove(['a', 'b']);
        EP('ffgerhjfg');
        PASS('ffgerhjfg', GH() == '#ccddee');

        // step 4
        SH('aaccbbdd?a=b&c=d', 'ffgggjhrhg');
        hsh.removeValue(['a', 'b']);
        EP('ffgggjhrhg');
        PASS('ffgggjhrhg', GH() == '#ccdd?a=b&c=d');

        // step 5
        SH('?a=b&c=e&d', 'bhtyre4g');
        hsh.removeQuery(['c', 'd']);
        EP('bhtyre4g');
        PASS('bhtyre4g', GH() == '#?a=b');

        // step 6
        SH('abc');
        VAL('bdggrtyhd', 'abc');
        const h1 = hsh.have() && hsh.have('a');
        hsh.clear();
        const h2 = hsh.have();
        PASS('bdggrtyhd', h1 && !h2);

        // step 7
        SH('abc?b=c&e=f');
        VAL('fkljri4fg', 'abc?b=c&e=f');
        const h3 = hsh.haveValue() && hsh.haveValue('a');
        SH('?b=c&e=f');
        const h4 = hsh.haveValue();
        PASS('fkljri4fg', h3 && !h4);

        // step 8
        SH('abc?b=c&e=f');
        VAL('sf43hg657g', 'abc?b=c&e=f');
        const h5 = hsh.haveQuery() && hsh.haveQuery('b');
        SH('abc');
        const h6 = hsh.haveQuery();
        PASS('sf43hg657g', h5 && !h6);

        // step 8
        SH('abc?b=c&e=f', 'iuyf8yoig');
        hsh.clearValue();
        EP('iuyf8yoig');
        PASS('iuyf8yoig', GH() == '#?b=c&e=f');

        // step 8
        SH('abc?b=c&e=f', 'kjsdhyuew');
        hsh.clearQuery();
        EP('kjsdhyuew');
        PASS('kjsdhyuew', GH() == '#abc');

        // step 9
        SH('abcde?p=12');
        VAL('dkshihi4', hsh.get());
        PASS('dkshihi4', hsh.get() == 'abcde?p=12');

        // step 10
        SH('abcde?p=12');
        VAL('kufyii4ld', hsh.getValue());
        PASS('kufyii4ld', hsh.getValue() == 'abcde');
        
        // step 11
        SH('abcde?p=12');
        let q_3345 = hsh.getQuery()
        VAL('kgo8jdllk', JSON.stringify(q_3345));
        PASS('kgo8jdllk', hsh.getQuery('p') == 12);

        // step 12
        hsh.set('val?a=b&c=d');
        VAL('dsfhkhikd', GH(), 'hash');
        PASS('dsfhkhikd', GH() == '#val?a=b&c=d');

        // step 13
        SH('val?a=b&c=d', 'kijhvgyud');
        hsh.setValue('abc');
        EP('kijhvgyud');
        PASS('kijhvgyud', GH() == '#abc?a=b&c=d');

        // step 14
        SH('abc?a=b&c=d', 'fkhdkikt4');
        hsh.setQuery({
            a : 'f',
            c : 't',
            h : 14
        });
        EP('fkhdkikt4');
        PASS('fkhdkikt4', GH() == '#abc?a=f&c=t&h=14');

        // step 15
        SH('ab?e=f', 'lkjdshfny');
        hsh.add('ok');
        EP('lkjdshfny');
        PASS('lkjdshfny', GH() == '#ab?e=fok');

        // step 16
        SH('ar?r=e', 'dsfiirtef');
        hsh.addValue('te');
        EP('dsfiirtef');
        PASS('dsfiirtef', GH() == '#arte?r=e');

        // step 17
        SH('arc?r=e&p=q&f', 'slkjlfdjji');
        hsh.addQuery({
            g : 'h',
            c : null,
        });
        EP('slkjlfdjji');
        PASS('slkjlfdjji', GH() == '#arc?r=e&p=q&f&g=h&c');

        // step 18
        SH('ar?r=e&u=i', 'dsij43igfh');
        hsh.updateQuery('u', 'c');
        EP('dsij43igfh');
        PASS('dsij43igfh', GH() == '#ar?r=e&u=c');

        // step 19
        SH('arc');
        VAL('djfosdufou', 'arc');
        PASS('djfosdufou', hsh.is('arc'));

        // step 20
        SH('abc?a=f');
        VAL('gfdhgdfhdfg', 'abc?a=f');
        PASS('gfdhgdfhdfg', hsh.isValue('abc'));

        // step 21
        SH('ac?a=f&e=g');
        VAL('sdfkgietyr', 'ac?a=f&e=g');
        PASS('sdfkgietyr', hsh.isQuery('e', 'g'));

        
        // clear hash after test
        hsh.clear();
    }

    // set all-step functions to window listener
    window.addEventListener('load', stepActionsTestHashJS);

})(window);