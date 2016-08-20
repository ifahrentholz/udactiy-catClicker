$(function() {

  var model = {
    currentCat: null,
    showAdmin: false,
    cats: [
      {
        name: "Ingo kitty",
        img: 'http://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150&bg=ff00ff',
        count: 0
      },
      {
        name: "Claudi kitty",
        img: 'http://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150&bg=ff00ff',
        count: 0
      },
      {
        name: "Bad kitty",
        img: 'http://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150&bg=ff00ff',
        count: 0
      },
      {
        name: "Good kitty",
        img: 'http://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150&bg=ff00ff',
        count: 0
      }
    ]
  };


  var catListView = {
    init: function() {
      this.catList = $("#catList");
      this.render();
    },

    render: function() {
      var cat, li, i;
      var cats = controller.getAllCats();
      this.catList.empty();
      for(i = 0; i < cats.length; i++) {
        cat = cats[i];
        li = document.createElement('li');
        li.innerText = cat.name;
        li.addEventListener('click', (function(catCopy) {
          return function() {
            controller.setCurrentCat(catCopy);
          }
        })(cat));
        this.catList.append(li);
      }
    }
  };


  var catView = {
    init: function() {
      this.nameNode = document.getElementById('catName');
      this.imgNode = document.getElementById('catImg');
      this.countNode = document.getElementById('catClickCount');

      this.imgNode.addEventListener('click', function() {
        controller.incrementCount();
      });

      this.render();
    },

    render: function() {
      var cat = controller.getCurrentCat();
      this.nameNode.textContent = cat.name;
      this.imgNode.src = cat.img;
      this.countNode.textContent = cat.count;
    }
  };

  var adminView = {
    init: function() {
      var self = this;
      var currentCat = controller.getCurrentCat();
      this.editButton = document.getElementById('editCat');
      this.adminView = document.getElementById('adminView');
      this.anameNode = document.getElementById('aname');
      this.aimgNode = document.getElementById('aimg');
      this.acountNode = document.getElementById('acount');
      this.saveBtn = document.getElementById('save');
      this.cancelBtn = document.getElementById('cancel');

      this.cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        controller.setAdminView(false);
      });

      this.editButton.addEventListener('click', function(e) {
        e.preventDefault();
        controller.setAdminView(true);
      });

      this.saveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var newCat = {
          name: self.anameNode.value,
          img: self.aimgNode.value,
          count: self.acountNode.value
        };
        controller.updateCat(currentCat, newCat);
      });
    },

    update: function() {
      var cat = controller.getCurrentCat();
      this.anameNode.value = cat.name;
      this.aimgNode.value = cat.img;
      this.acountNode.value = cat.count;
    },

    render: function() {
      this.adminView.className = '';
    },

    hide: function() {
      this.adminView.className = 'hidden';
    }
  };


  var controller = {
    init: function() {
      model.currentCat = model.cats[0];
      catListView.init();
      catView.init();
      return adminView.init();
    },

    incrementCount: function() {
      model.currentCat.count++;
      return catView.render();
    },

    setAdminView: function(bool) {
      model.showAdmin = bool;
      if(model.showAdmin) {
        adminView.render();
      } else {
        adminView.hide();
      }
    },

    updateCat: function(oldCat, newCat) {
      var currentCat = controller.getCurrentCat();
      model.cats = model.cats.map(function(item) {
        return item.name === currentCat.name ? newCat : item;
      });
      controller.setCurrentCat(newCat);
      catListView.render();
    },

    setCurrentCat: function(cat) {
      model.currentCat = cat;
      catView.render();
      adminView.update();
    },

    getCurrentCat: function() {
      return model.currentCat;
    },

    getAllCats: function() {
      return model.cats;
    }
  };

  controller.init();

});