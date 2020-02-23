/* demo script */

var hashInfo = new Hash.info(),
    hashAddons = hashInfo.addons;


if (hashAddons.server && hashAddons.spa) {
    
    var server = new Hash.server();

    server.ajax({
        type : 'GET',
        url : 'file.txt',
        // data : {a : 1, b : 2},
        result : {
            success : function(res) {
                document.getElementById('file').innerHTML = res;
            },
            error : function(errCode) {
                document.getElementById('file').innerHTML = 'We have an error to send request : ' + '(code:'+errCode+')' + '<br />'
                + '<small>Notice: Hash.server() just run when HTML file (and ...) run in server.</small>';
            }
        }
    });

}

