/* demo script */

var hashInfo = new Hash.info(),
    hashAddons = hashInfo.addons;


if (hashAddons.server && hashAddons.spa) {
    
    var server = new Hash.server(),
        single = new Hash.spa();

    single.router({
        router : 'read/file/{any}',
        do : function(data) {
            server.ajax({
                type : 'GET',
                url : data[0],
                // data : {a : 1, b : 2},
                result : {
                    success : function(res) {
                        document.getElementById('file').innerHTML = res;
                    },
                    error : function(errCode) {
                        document.getElementById('file').innerHTML = 'We have an error to send request : ' + '(code:'+errCode+')';
                    }
                }
            });
        }
    });


}

