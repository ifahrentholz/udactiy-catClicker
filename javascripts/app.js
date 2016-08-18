$(function() {

  var controller = {

    init: function() {
      model.currentCat = model.cats[0];
      catView.init();
      catListView.init();
    },


    getAllCats: function() {
      return model.cats;
    },


    setCurrentCat: function(cat) {
      return model.currentCat = cat;
    },


    counterIncrement: function() {
      model.currentCat.clickCount++;
      return catView.render();
    }

  };


  var model = {
    currentCat: null,
    cats: [
      {
        name: "Ingo Cat",
        imgSrc: "https://placeholdit.imgix.net/~text?txtsize=38&txt=Ingo&w=350&h=150",
        clickCount: 0
      },
      {
        name: "Claudi Cat",
        imgSrc: "https://placeholdit.imgix.net/~text?txtsize=38&txt=Claudi&w=350&h=150",
        clickCount: 0
      },
      {
        name: "Xenia Cat",
        imgSrc: "https://placeholdit.imgix.net/~text?txtsize=38&txt=Xenia&w=350&h=150",
        clickCount: 0
      }
    ]
  };


  var catView = {
    init: function() {
      this.nameNode = document.getElementById("name");
      this.imageNode = document.getElementById("image");
      this.counterNode = document.getElementById("counter");

      this.imageNode.addEventListener('click', function() {
        controller.counterIncrement();
      });

      this.render();
    },


    render: function() {
      this.nameNode.textContent = model.currentCat.name;
      this.imageNode.src = model.currentCat.imgSrc;
      this.counterNode.textContent = model.currentCat.clickCount;
    }
  };


  var catListView = {
    init: function() {
      this.listNode = document.getElementById('list');
      this.render();
    },


    render: function() {
      var cat, elem, i;
      var cats = controller.getAllCats();

      this.listNode.innerHTML = '';

      for(i = 0; i < cats.length; i++) {
        cat = cats[i];
        elem = document.createElement('li');
        elem.textContent = cat.name;

        elem.addEventListener('click', (function(catClone) {
          return function() {
            controller.setCurrentCat(catClone);
            catView.render();
          }
        })(cat));

        this.listNode.appendChild(elem);
      }
    }
  };


  controller.init();

});