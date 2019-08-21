window.onload = function() {
    /*
    AFRAME.registerComponent('log', {
      schema: {type: 'string'},

      init: function () {
        var stringToLog = this.data;
        console.log(stringToLog);
      }
    });
    */
    
    var KEYBASE = 65;
    var BOX = document.querySelector('#BOX_ID');
    
    function MoveObject(object, m_type){
        X_pos = object.getAttribute('position').x;
        Y_pos = object.getAttribute('position').y;
        Z_pos = object.getAttribute('position').z;
        if (m_type=="left") {   X_pos=X_pos+1;  }
        if (m_type=="right") {  X_pos=X_pos-1;  }
        object.setAttribute('position', { x:X_pos, y:Y_pos, z:Z_pos });
    }
    
    document.body.addEventListener('keydown', function(e){
        if (e.keyCode==KEYBASE) {  MoveObject(BOX, "left");      }
        if (e.keyCode==68) {  MoveObject(BOX, "right");     }
    });
    
}

