/* Hash.js encoder */

function change( value ) {
    var val = value;
    switch ( val ) {
        case "a" : val = "6n^*($#*hl" ;break;
        case "b" : val = "()&JKO70)$" ;break;
        case "c" : val = "kuHn(*^@%^" ;break;
        case "d" : val = "KNB&$#v&!@" ;break;
        case "e" : val = "!#^*((J8nd" ;break;
        case "f" : val = "JK*^%*$&(*" ;break;
        case "g" : val = "UHNIO%OI79" ;break;
        case "h" : val = "io%$@#^~~1" ;break;
        case "i" : val = "^&*%(^&%*%" ;break;
        case "j" : val = "<MN8968967" ;break;
        case "k" : val = "%$%&#*^08n" ;break;
        case "l" : val = "IOB&^(6909" ;break;
        case "m" : val = "ytFR^&^7r6" ;break;
        case "n" : val = "@##%&t87hn" ;break;
        case "o" : val = "JHBG786#&^" ;break;
        case "p" : val = "@%$#$&^nkl" ;break;
        case "q" : val = "()&&^(%&$)" ;break;
        case "r" : val = "@@##tuiGNs" ;break;
        case "s" : val = "ui%&%Y8ho9" ;break;
        case "t" : val = "&*T8yhioj9" ;break;
        case "u" : val = "&%&%^gihw4" ;break;
        case "v" : val = "ns&*Gty7ih" ;break;
        case "w" : val = "!@#ui^&I(8" ;break;
        case "x" : val = "UI7698y8n#" ;break;
        case "y" : val = "&^&^(&*(#$" ;break;
        case "z" : val = "rtg6$&%&$%" ;break;

        case " " : val = "6868GI*&%5" ;break;
        case "~" : val = "(J89575y*)" ;break;
        case "!" : val = "^(*Uyu887h" ;break;
        case "@" : val = "^(*^y(7979" ;break;
        case "#" : val = "jioIUO&(^&" ;break;
        case "$" : val = "h7(*UO&)97" ;break;
        case "%" : val = "OIY(TYRI68" ;break;
        case "^" : val = "BJKLGUTYUI" ;break;
        case "&" : val = "h7(*UO&)97" ;break;
        case "*" : val = "OIY(TYRI68" ;break;
        case "(" : val = "&()U(O&OJY" ;break;
        case ")" : val = "!@#!#dfguy" ;break;
        case "-" : val = "UGHBI%$$^&" ;break;
        case "_" : val = "&TEHGIOI%*" ;break;
        case "=" : val = "grerUYT&*E" ;break;
        case "+" : val = "OIOPN&*%^*" ;break;
        case "," : val = "po7nJ%CW&*" ;break;
        case "." : val = "@!$#@%Y&**" ;break;
        case "'" : val = "$%^&TY*HB(" ;break;
        case '"' : val = "Q^T*B*G&&G" ;break;
        case "<" : val = "^&%&G^*^(^" ;break;
        case '>' : val = "jhT&*^%%&*" ;break;
        case ";" : val = "&^VUTHIYih" ;break;
        case ':' : val = "jhr^%#YTIL" ;break;
        case '\\' : val = "^V&I*TYIU" ;break;
        case '[' : val = "*NO&O(^UIU" ;break;
        case ']' : val = "BNVC^&I%0^" ;break;
        case '{' : val = "7F&^&I()&g" ;break;
        case '}' : val = "!RYVI&)ikj" ;break;

        case "1" : val = "&*BTYIOJNO" ;break;
        case "2" : val = "!RWRT@*^(u" ;break;
        case "3" : val = "*I&(O^&^90" ;break;
        case "4" : val = ",l;ip*(**&" ;break;
        case "5" : val = "()OKJPP:((" ;break;
        case "6" : val = "%^TFVJMLJ<" ;break;
        case "7" : val = "TFU^$&^(&&" ;break;
        case "8" : val = "YTBUGHIY*^" ;break;
        case "9" : val = "#Q$@$&INJj" ;break;
        case "0" : val = "ht4tU%TETO" ;break;

        default : ;break;
    }
    return val;
}

function end_v( value ) {
    var spt = value.split('');

    var method = "";

    for ( var i=0 ; i<spt.length ; i++ ) {
        if ( i !== spt.length-1 ) {
            var char = escape(spt[i]);
            var bew = char.split('');

            for ( var j=0 ; j<bew.length ; j++ ) {
                bew[j] = change( bew[j] );
                method += bew[j];
            }

        } else {
            var char = escape(spt[i]);

            var bew = char.split('');
            for ( var j=0 ; j<bew.length ; j++ ) {
                bew[j] = change( bew[j] );
                method += bew[j];
            }
        }
    }


    return method;

}

function UnHash( value ) {


    for ( var i=0 ; i<30 ; i++ ) {
        value=value.replace('6n^*($#*hl','a');
        value=value.replace('()&JKO70)$','b');
        value=value.replace('kuHn(*^@%^','c');
        value=value.replace('KNB&$#v&!@','d');
        value=value.replace('!#^*((J8nd','e');
        value=value.replace('JK*^%*$&(*','f');
        value=value.replace('UHNIO%OI79','g');
        value=value.replace('io%$@#^~~1','h');
        value=value.replace('^&*%(^&%*%','i');
        value=value.replace('<MN8968967','j');
        value=value.replace('%$%&#*^08n','k');
        value=value.replace('IOB&^(6909','l');
        value=value.replace('ytFR^&^7r6','m');
        value=value.replace('@##%&t87hn','n');
        value=value.replace('JHBG786#&^','o');
        value=value.replace('@%$#$&^nkl','p');
        value=value.replace('()&&^(%&$)','q');
        value=value.replace('@@##tuiGNs','r');
        value=value.replace('ui%&%Y8ho9','s');
        value=value.replace('&*T8yhioj9','t');
        value=value.replace('&%&%^gihw4','u');
        value=value.replace('ns&*Gty7ih','v');
        value=value.replace('!@#ui^&I(8','w');
        value=value.replace('UI7698y8n#','x');
        value=value.replace('&^&^(&*(#$','y');
        value=value.replace('rtg6$&%&$%','z');
        value=value.replace('868GI*&%5"','"');
        value=value.replace('(J89575y*)','~');
        value=value.replace('^(*Uyu887h','!');
        value=value.replace('^(*^y(7979','@');
        value=value.replace('jioIUO&(^&','#');
        value=value.replace('h7(*UO&)97','$');
        value=value.replace('OIY(TYRI68','%');
        value=value.replace('BJKLGUTYUI','^');
        value=value.replace('h7(*UO&)97','&');
        value=value.replace('OIY(TYRI68','*');
        value=value.replace('&()U(O&OJY','(');
        value=value.replace('!@#!#dfguy',')');
        value=value.replace('UGHBI%$$^&','-');
        value=value.replace('&TEHGIOI%*','_');
        value=value.replace('grerUYT&*E','=');
        value=value.replace('OIOPN&*%^*','+');
        value=value.replace('po7nJ%CW&*',',');
        value=value.replace('@!$#@%Y&**','.');
        value=value.replace('$%^&TY*HB(',"'");
        value=value.replace('Q^T*B*G&&G','"');
        value=value.replace('^&%&G^*^(^','<');
        value=value.replace('jhT&*^%%&*','>');
        value=value.replace('&^VUTHIYih',';');
        value=value.replace('jhr^%#YTIL',':');
        value=value.replace('"^V&I*TYIU','\\');
        value=value.replace('*NO&O(^UIU','[');
        value=value.replace('BNVC^&I%0^',']');
        value=value.replace('7F&^&I()&g','{');
        value=value.replace('!RYVI&)ikj','}');
        value=value.replace('&*BTYIOJNO','1');
        value=value.replace('!RWRT@*^(u','2');
        value=value.replace('*I&(O^&^90','3');
        value=value.replace(',l;ip*(**&','4');
        value=value.replace('()OKJPP:((','5');
        value=value.replace('%^TFVJMLJ<','6');
        value=value.replace('TFU^$&^(&&','7');
        value=value.replace('YTBUGHIY*^','8');
        value=value.replace('#Q$@$&INJj','9');
        value=value.replace('ht4tU%TETO','0');
    }

    return unescape(value);


}