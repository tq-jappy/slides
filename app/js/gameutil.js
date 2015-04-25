function changePage(currentPage) {
  var idx = pages.indexOf(currentPage);

  if (isLeftDown() && idx > 0) {
    game.state.start(pages[idx-1]);
    return true;
  } else if (isRightDown() && idx < (pages.length-1)) {
    game.state.start(pages[idx+1]);
    return true;
  }

  return false;
}

function offsetX(width) {
  return (game.world.width-width) / 2;
}

function isLeftDown() {
  return game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
}

function isRightDown() {
  return game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
}

function isKeyDown(key) {
  return game.input.keyboard.isDown(Phaser.Keyboard[key]);
}

// 見出し
function title(text) {
  var text = game.add.text(20, 20, text);
  text.fontSize = 100;
  text.fill = color.font2;
  // text.stroke = '#ffffff';
  // text.strokeThickness = 6;
};

// 箇条書き
function items(items, options) {
  var options = options || {};
  if (!options.fontSize) {
    options.fontSize = 64;
  }

  var y = 172;
  items.forEach(function(msg) {
    var text = game.add.text(20, y, msg);
    text.fontSize = options.fontSize;
    text.fill = color.font;
    y += options.fontSize+16;
  });
}

// 中央揃えテキスト
function textCenter(texts, options) {
  var options = options || {};
  if (!options.fontSize) {
    options.fontSize = 48;
  }
  if (!options.y) {
    options.y = 172;
  }

  var y = options.y;
  texts.forEach(function(s) {
    var x = (game.world.width - (s.length*options.fontSize))/2;
    var text = game.add.text(x, y, s);
    text.fontSize = options.fontSize;
    text.fill = color.font;
    y += options.fontSize+16;
  });
}