
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

// if Hash.spa is ready
if (adn.spa) {
    
    var spaApp = new Hash.spa();
    spaApp.router({
        router : 'go/{any}',
        do : function(e) {

            //get go_id
            var go = e[0],
                el = document.getElementById('handler_' + go);

            if (el !== null) {
                el.scrollIntoView();
            } else {
                lib.clear();
            }
            
        }
    });

}