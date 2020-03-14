if (Hash.ready) {

    var lib = new Hash.lib();

    // lib.set({
    //     query : {
    //         'page' : 23,
    //     }
    // });

    var myQuery = {};
    
    if (!lib.have('page', 'query')) {
        myQuery['page'] = 155;
    }

    if (!lib.have('ajax', 'query')) {
        myQuery['ajax'] = true;
    }

    lib.add({
        query : myQuery
    });

}