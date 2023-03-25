/**
 * Function for returning a forms, tikkio or nettskjema link from a string
 * 
 * @param {string} string String containing forms, tikkio or nettskjema link
 * @returns Link as string
 */
export default function FetchJoinLink(string) {
    if(string != undefined) {
        let formStart = string.lastIndexOf('https://forms');
        let formEnd = string.lastIndexOf("</a>");

        let tikkioStart = string.lastIndexOf('https://tikkio');
        let tikkioEnd = string.lastIndexOf('</a>');

        let netStart = string.lastIndexOf('https://nettskjema.no');
        let netEnd = string.lastIndexOf('</a>')

        var formLink = string.slice(formStart, formEnd);
        var tikkioLink = string.slice(tikkioStart, tikkioEnd);
        var netLink = string.slice(netStart, netEnd);
      
        if(formLink)    return formLink.trim();
        if(tikkioLink)  return tikkioLink.trim();
        if(netLink)     return netLink.trim();

        return null;
    }else return null
}