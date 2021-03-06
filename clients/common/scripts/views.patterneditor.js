(function() {

  /**
   * The PatternEditor class is responsible for the search UI component
   *
   * @constructor
   * @class PatternEditor
   * @param {Object} id The id of this specific connection.
   */
  mixr.views.PatternEditor = function(item) {

    /**
     * Mixins
     */
    mixr.mixins.Wrapper.call(this);

    var _self = this;

    var trackCount = 0;

    var $item = item;
    var $table = $item.find('table');
    //var $itemAddClass = $item.addClass( "myClass yourClass" );
    //var controllers = document.getElementById('modifiers');

    var _onToggleNote = function() {

      var noteIndex = $(this).index();

      if (noteIndex === 0) return;

      noteIndex--; // compensate for label

      var isItOn = $(this).toggleClass('active').hasClass('active');
      console.log('You clicked me dude', this, noteIndex, $(this).parent().index(), isItOn ? 1 : 0);
      _self.emit(mixr.enums.Events.NOTE, {
        volume: isItOn ? 1 : 0,
        note: noteIndex,
        trackId: $(this).parent().data('id')
      });
    };

    /**
     * Adds all the listeners to the elements.
     *
     * @private
     * @function
     */
    var _addEventListeners = function() {
      $table.on('click', 'td', _onToggleNote);
    };


    /*
    var _startPlayHead = function () {
      var playheadDuration = 60 / 120 * 4;
      var $playhead = $('#playhead');
      $playhead.css('-webkit-animation-duration', playheadDuration + 's');
    };
    */
    this.drawPlayhead = function (beat) {
      var $tds = $('th:nth-child(' + (beat + 2) + ')');
      $tds.on('webkitAnimationEnd', function () {
        $tds.removeClass('beat');
      });
      $tds.addClass('beat');
    };


    this.addTrack = function (track, color) {
      //console.log('addTrack', track);
  
      // Check if we already have a row for that track
      if ($table.find('tr[data-id="' + track.id + '"]').length > 0) {
        return;
      }

      if (trackCount === 0) {
        _renderHeader(track.notes.length);
      }

      var $row = $('<tr>').attr('data-id', track.id);

      $row.append($('<td><h1>' + track.name + '</h1></td>'));

      for (var i = 0; i < track.notes.length; i++) {
        var $td = $('<td>');
        var number = i+1;
        var stepNumber = '0' +number;
        var stepNumber = stepNumber.slice(-2);
        //$td.append(i+1);
        $td.append(stepNumber);
        if (track.notes[i] === 1) {
          $td.addClass('active');
        }
        $row.append($td);
      }

      $row.css('background', color);
      $table.append($row);
      trackCount++;
    };

    var _renderHeader = function (length) {
      var $head = $('<thead>');
      for (var i = 0; i < length; i++) {
        var $th = $('<th>');
        $head.append($th);
      }

      $head.children().eq(0).attr('id', 'playhead');

      $table.append($head);
    };

    /**
     * Shows an HTML element
     * @return {mixr.views.PatternEditor} A reference to this instance.
     */
    this.show = function() {
      $item.show();

      //_startPlayHead();

      return this;
    };

    /**
     * Initializes the component
     *
     * @private
     * @function
     * @return {mixr.views.PatternEditor} A reference to this instance.
     */
    this.initialize = function() {
      _addEventListeners();
      return this;
    };

  };

}());
