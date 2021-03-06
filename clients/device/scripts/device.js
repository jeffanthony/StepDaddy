(function() {

  mixr.Device = function() {

    var _isJoinedToRoom = null;
    var _patternEditor;
    var _model;
    var _conn;


var _padsAreInitialized = false;

var container = document.getElementById('modifiers');

var _onModifierChange = function(data) {
  _conn.execute(mixr.enums.Events.MODIFIER_CHANGE, data);
};

var _createPads = function(_model) {

  

/*
        if (typeof window.insControls !== 'undefined') {
            console.log('window.insControls', window.insControls);
            //console.log('controls', _model.instrument.controls);
        } //*/



  /*  var input = new mixr.ui.Input(2, 'Tempo', container).initialize();
    input.on(mixr.enums.Events.MODIFIER_CHANGE, _onModifierChange); */
};



var _onModifierChangeInput = function(data) {
  console.log('_onModifierChange: ', data);
};


    var _onRegistered = function(data) {
      console.log('Registered', data);
      if (_isJoinedToRoom) {
        _conn.joinRoom(_isJoinedToRoom, _onRoomJoined, function(e) {
          console.log('Room not joined!', e);
        });
      }

      var url = mixr.Utils.parseURL(location.href);

      if (url.query) {
        _conn.joinRoom(url.query,
            _onRoomJoined,
            function(e) {
              console.log('Room not joined!', e);
            });
      }
    };

    var _onEmit = function() {
      _conn.send(mixr.enums.Events.EMIT, { data: new Date().getTime() });
    };

    var _onDisconnect = function() {
      _conn.disconnect();
      _isJoinedToRoom = null;
    };

    var _onRoomJoined = function(data) {
      _isJoinedToRoom = data.room;
      console.log('Room joined!', data);


      _model = new mixr.models.PatternEditor(_conn);
      _patternEditor = new mixr.controllers.PatternEditor(_model).initialize();
      //_patternEditor = new mixr.controllers.PatternEditor(new mixr.models.PatternEditor(_conn)).initialize();
      _patternEditor.show();


      //console.log('controls', _model.instrument.controls); // _patternEditor.returnInstrument()

      
//console.log('_patternEditor', _patternEditor);

if (!_padsAreInitialized) {
  _createPads(_model);
  _padsAreInitialized = true;
}
      
    };

    var _onRoomClosed = function(data) {
      _isJoinedToRoom = false;
      console.log('Room with id', data.room, 'is closed. You have been removed from the room');
    };

    this.initialize = function() {

      _conn = new mixr.net.Connection();
      _conn.connect(window.SERVER)
      .on(mixr.enums.Events.REGISTER, _onRegistered)
      .on(mixr.enums.Events.ROOM_CLOSED, _onRoomClosed)
      .on(mixr.enums.Events.MODIFIER_CHANGE, _onModifierChangeInput);

      setTimeout(function() {
        window.scrollTo(0, 1);
        //window.scrollTo(0,9999); // document.body.scrollHeight
        //document.body.scrollTop = document.body.scrollHeight - document.body.clientHeight
      //var element_to_scroll_to = document.getElementById('modifiers');
      //element_to_scroll_to.scrollIntoView();

      }, 0); 

      //window.scrollTo(0,99999);
      //$('html').animate({ scrollTop: element.offset().top }, 'slow');

    };

  };

  new mixr.Device().initialize();

}());


