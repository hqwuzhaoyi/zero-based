var EventsUtility = {
    addEvent: function (element, type, callback) {
        // 此处写代码
        if(typeof addEventListener!=='undefined'){
            element.addEventListener(type,callback,false);
        }else if(typeof attachEvent!=='undefined'){
            element.attachEvent('on'+type,callback);
        }else{
            element['on'+type]=callback;
        }
        
    },

    removeEvent: function (element, type, callback) {
        // 此处写代码
        if(typeof removeEventListener!=='undefined'){
            element.removeEventListener(type,callback,false);
        }else if(typeof attachEvent!=='undefined'){
            element.detachEvent('on'+type,callback);
        }else{
            element['on'+type]=null;
        }
    }
};
