
function seeQuery() {
    
    var name = document.getElementById('t_name').value
        mess = document.getElementById('t_mess').value;

    if (name !== '' && mess !== '') {
        window.location.href = 'https://irmmr.github.io/hash.js/demo/query.html#name=' + name + '&message=' + mess;
    } else {
        alert("Please enter informations!");
    }

}

var lib = new Hash.lib(),
    inf = new Hash.info(),
    adn = inf.addons;

if (adn.load) {

    var lo = new Hash.load(),
        le = document.getElementById('loading');

    lo.page({
        load : function() {
            le.innerHTML = '<img src="demo/loading.svg">';
        },
        do : function() {
            le.style.marginTop = '-228px';
            var st = setTimeout(function() {
                le.style.display = 'none';
                window.clearTimeout(st);
            }, 500);
        }
    });

}

function addQ(q) {
    for (var i in q) {
        if (!lib.have(i, 'query')) {

            var myQ = {};
            myQ[i] = q[i];

            lib.add({
                query : myQ
            });
        }
    }
}

function showNavs() {
       
    // query name => #nav=?
    var nav = 'nav';
    
    // check if page have `nav` query
    if (lib.have(nav, 'query')) {
        // if query is not null => !#nav
        if (!lib.is(null, { query : nav })) {
            
            //get 'nav' query
            var nav_val = lib.get(true, {
                query : nav
            })[nav];
            
            //get element => myElem : elm_$
            var elm = document.getElementById('nav_' + nav_val);
            
            if (elm !== null) {
                elm.scrollIntoView();
            } else {
                lib.remove({
                    query : [nav]
                });
            }
            
        } else {
            lib.remove({
                query : [nav]
            });
        }
    }
}

showNavs(), Hash.event('change', showNavs);