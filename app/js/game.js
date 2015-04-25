// ゲームオブジェクト（グローバルに持つ）
// Phaser.AUTO だとローカルでブラウザで見た時(WebGL)に Sprite がロードできないので、
// とりあえず Canvas を使っておく
var game = new Phaser.Game('100%', '100%', Phaser.CANVAS, 'gameContainer', null, false, false);

// 色(azusa)
var color = {
  background: "#fff5e2",
  font: "#3e4157",
  font2: "#33b490"
};

for (var sceneName in Scene) {
  var scene = Scene[sceneName];
  game.state.add(sceneName, scene);

  Scene[sceneName].prototype.pageNumber = pages.indexOf(sceneName)+1;

  // ページ番号(各シーンでrenderが定義されているとNGかも)
  Scene[sceneName].prototype.render = function() {
    game.debug.text('P. ' + this.pageNumber, game.world.width-80, 20, color.font2);
  };
}

// game.time.advancedTiming = true;
game.state.start('Title');
