
var li = new Hash.lib(),
    inf = new Hash.info(),
    allQueries = li.get(true, {
        query : '*'
    });

function getQ(queryName) {
    if (allQueries.hasOwnProperty(queryName)) {
        return unescape(allQueries[queryName]);
    }

    return '';
}

function setQ(queryName, queryValue) {
    if (!li.have(queryName, 'query') || !li.is(queryValue, {query : queryName})) {
        var myQuery = {};
        myQuery[queryName] = queryValue;

        li.set({
            query : myQuery
        });
    }
}

function delQ(queryName) {
    if (li.have(queryName, 'query')) {
        li.remove({
            query : [queryName]
        });
    }
}

/* Make a simple project */
if (inf.addons.spa) {

    var sp = new Hash.spa(),
        xp = new sp.exports();

    var name = getQ('name'),
        mess = getQ('message');

    if (li.have('name', 'query') && li.have('message', 'query')) {
        var myMessage = `<h5>Your message informations</h5><br />
        <div class="txt">Sent from <b>${name}</b> : ${mess}</div>`;
    } else {
        var myMessage = `<h5>Hi, how are you?</h5><br />
        <div class="txt">You have not any message!</div>`;
    }


    xp.render({
        el : 'app-9',
        render : myMessage
    });

}