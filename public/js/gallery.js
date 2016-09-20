
// Set the default category that will be shown on page load.
var currentCategory = "weddings";

//Make elements
var library = [

  //Wedding Cakes
  createElement('img/gallery/2x2-W-01.png', 2, 2, "weddings"),
  createElement('img/gallery/2x3-W-01.png', 2, 3, "weddings"),
  createElement('img/gallery/2x1-W-01.png', 2, 1, "weddings"),
  createElement('img/gallery/3x2-W-01.png', 3, 2, "weddings"),
  createElement('img/gallery/1x2-W-01.png', 1, 2, "weddings"),
  createElement('img/gallery/1x2-W-02.png', 1, 2, "weddings"),
  createElement('img/gallery/2x2-W-02.png', 2, 2, "weddings"),
  createElement('img/gallery/1x2-W-03.png', 1, 2, "weddings"),
  createElement('img/gallery/2x3-W-02.png', 2, 3, "weddings"),
  createElement('img/gallery/2x3-W-03.png', 2, 3, "weddings"),
  createElement('img/gallery/1x1-W-01.png', 1, 1, "weddings"),
  createElement('img/gallery/2x1-W-03.png', 2, 1, "weddings"),
  createElement('img/gallery/1x1-W-02.png', 1, 1, "weddings"),
  createElement('img/gallery/2x3-W-04.png', 2, 3, "weddings"),
  createElement('img/gallery/2x3-W-05.png', 2, 3, "weddings"),

  //Birthday Cakes
  createElement('img/gallery/2x2-B-01.png', 2, 2, "birthdays"),
  createElement('img/gallery/2x1-B-01.png', 2, 1, "birthdays"),
  createElement('img/gallery/1x1-B-02.png', 1, 1, "birthdays"),
  createElement('img/gallery/1x1-B-03.png', 1, 1, "birthdays"),
  createElement('img/gallery/1x2-B-02.png', 1, 2, "birthdays"),
  createElement('img/gallery/2x2-B-04.png', 2, 2, "birthdays"),
  createElement('img/gallery/1x1-B-04.png', 1, 1, "birthdays"),
  createElement('img/gallery/1x1-B-05.png', 1, 1, "birthdays"),
  createElement('img/gallery/3x2-B-01.png', 3, 2, "birthdays"),
  createElement('img/gallery/1x2-B-04.png', 1, 2, "birthdays"),
  createElement('img/gallery/2x3-B-01.png', 2, 3, "birthdays"),
  createElement('img/gallery/1x1-B-06.png', 1, 1, "birthdays"),
  createElement('img/gallery/1x1-B-07.png', 1, 1, "birthdays"),
  createElement('img/gallery/2x1-B-02.png', 2, 1, "birthdays"),
  createElement('img/gallery/1x1-B-08.png', 1, 1, "birthdays"),
  createElement('img/gallery/1x1-B-01.png', 1, 1, "birthdays"),

  //Christening Cakes
  createElement('img/gallery/1x1-C-02.png', 1, 1, "christenings"),
  createElement('img/gallery/2x1-C-02.png', 2, 1, "christenings"),
  createElement('img/gallery/1x1-C-03.png', 1, 1, "christenings"),
  createElement('img/gallery/2x3-C-01.png', 2, 3, "christenings"),
  createElement('img/gallery/2x3-C-04.png', 2, 3, "christenings"),
  createElement('img/gallery/1x2-C-01.png', 1, 2, "christenings"),
  createElement('img/gallery/2x2-C-03.png', 2, 2, "christenings"),
  createElement('img/gallery/1x2-C-02.png', 1, 2, "christenings"),
];

// Function to create the img elements that will populate the gallery.
function createElement(img, width, height, category) {
  var elem = document.createElement('img');
  elem.setAttribute('src', img);
  elem.setAttribute('id', category);
  elem.className = 'grid-item ' +
                   'grid-item-wx' + width +
                   ' grid-item-hx' + height;
  return elem;
}

//Function to refresh the array of elements displayed in gallery.
function refreshCategory() {
  //Create elements array..
  var elems = [];

  //Populate it from the library with only the images in current category
  for(var i = 0; i < library.length; i++) {
    var id = library[i].id;
    if(id == currentCategory) {
      elems.push(library[i]);
    }
  }

  //Return the array
  return elems;
}

//When the page loads up, this stuff is ready to be run. Main bulk.
$(document).ready(function() {
  var $grid = $('.gallery').imagesLoaded( function() {
    // init Masonry after all images have loaded
    $grid.masonry({
      // options
      itemSelector: '.grid-item',
      columnWidth: 210,
      gutter: 10,
      transitionDuration: 250
    });

    //Check if there is a category in the URL, if so switch to it.
    var url = document.URL;
    var id = url.substring(url.lastIndexOf('#') + 1);

    if (id == "weddings" || id == "birthdays" ||
        id == "christenings" || id == "celebrations" ||
        id == "offers") {
          currentCategory = id;
        }

    //Get the array of elements to populate gallery.
    var elems = refreshCategory();

    // Make the array into a jQuery object, then append, and refresh
    // masonry.
    var $elems = $( elems );
    $grid.append( $elems ).masonry( 'appended', $elems );
  });

    //When one of the category buttons is pushed, check if it
    //is the current category. Do nothing if it is.
    $('.cat-trigger').click(function () {
      if(currentCategory != this.id) {
        currentCategory = this.id;
        var $elems = refreshCategory();

        //Remove old elements and add new ones.

        $grid.masonry('remove', $('.gallery img')).masonry()
          .append( $elems ).masonry( 'appended', $elems );
      }
    });
});
