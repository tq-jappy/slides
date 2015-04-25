var Scene = Scene || {};

// ページの順番（ページを入れ替える場合はここを変更）
var pages = ["Title", "Theme",
             "PhaserLogo",
             "Phaser", "PhaserFeature",
             "Animation", "Monsters", "Impression",
             "Conclusion", "End"];

Scene.Title = function(game) {
  this.game = game;
}
Scene.Title.prototype = {
  preload: function() {
    game.load.image('logo', 'app/assets/phaser_pixel_large_shaded.png');
  },
  create: function() {
    game.stage.backgroundColor = color.font;

    var text = game.add.text(game.world.width/2, 120, "HTML5ゲームフレームワーク");
    text.anchor.setTo(0.5, 0.5);
    text.fontSize = 80;
    text.fill = color.background;
    text.stroke = color.font2;
    text.strokeThickness = 6;

    logo = game.add.sprite(offsetX(208*3), 200, 'logo');
    logo.scale.setTo(3, 3);

    var name = game.add.text(game.world.width/2, 460, "Takumi Endo");
    name.anchor.setTo(0.5, 0.5);
    name.fontSize = 80;
    name.fill = color.font2;

    var date = game.add.text(game.world.width/2, 540, "2015.04.24 LT");
    date.anchor.setTo(0.5, 0.5);
    date.fontSize = 32;
    date.fill = color.background;
  },
  update: function() {
    if (changePage("Title")) {
      game.stage.backgroundColor = color.background;
    }
  }
}

Scene.Theme = function(game) {
  this.game = game;
};
Scene.Theme.prototype = {
  create: function() {
    title("テーマ");
    textCenter([
      "最近興味のあること",
      "（4月版）"
    ], {fontSize: 80, y: 200});
  },
  update: function() {
    changePage("Theme");
  }
};

Scene.PhaserLogo = function(game) {
  this.game = game;
};
Scene.PhaserLogo.prototype = {
  phaserLogo: null,
  preload: function() {
    game.load.image('logo', 'app/lib/phaser/phaser-logo-small.png');
  },
  create: function() {
    game.stage.backgroundColor = color.font;

    phaserLogo = game.add.sprite(game.world.width/2, game.world.height/2, 'logo');
    phaserLogo.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    if (changePage("PhaserLogo")) {
      game.stage.backgroundColor = color.background;
    }
  }
};

Scene.Phaser = function(game) {
  this.game = game;
};
Scene.Phaser.prototype = {
  create: function() {
    title("Phaser");
    items([
      "・フェイザー",
      "・HTML5製の2Dゲームフレームワーク",
      "・クロスプラットフォーム",
      "・豊富なドキュメントとサンプル",
      "・オープンソース(MITライセンス)"
    ]);
  },
  update: function() {
    changePage("Phaser");
  }
};

Scene.PhaserFeature = function(game) {
  this.game = game;
};
Scene.PhaserFeature.prototype = {
  create: function() {
    title("Phaserの特徴");
    items([
      "・Canvas, WebGL レンダリング",
      "・フルスタック",
      "    ・アニメーション",
      "    ・物理エンジン",
      "    ・シーン制御",
      "    ・衝突判定",
      "    ・etc"
    ], {fontSize: 48});
  },
  update: function() {
    changePage("PhaserFeature");
  }
};

Scene.Animation = function(game) {
  this.game = game;
};
Scene.Animation.prototype = {
  monster: null,
  hone: null,
  kabocha: null,
  rotating: false,
  angle: 0.5,
  mode: 0,
  speed: 3,
  preload: function() {
    game.load.image('monster', 'app/assets/pipo-enemy016.png');
    game.load.spritesheet('hone', 'app/assets/hone.png', 32, 32, 12);
    game.load.spritesheet('kabocha', 'app/assets/kabocha.png', 32, 32, 12);
  },
  create: function() {
    title("アニメーション");

    var hone = game.add.sprite(40, 120, 'hone', 1);
    hone.scale.set(4);
    hone.smoothed = false;
    game.physics.arcade.enable(hone);
    this.hone = hone;

    var repeat = true;
    hone.animations.add('down', [0, 1, 2], 5, repeat);
    hone.animations.add('left', [3, 4, 5], 5, repeat);
    hone.animations.add('right', [6, 7, 8], 5, repeat);
    hone.animations.add('up', [9, 10, 11], 5, repeat);

    hone.animations.play('down');

    var kabocha = game.add.sprite(game.world.width/2, game.world.height/2, 'kabocha', 1);
    kabocha.anchor.setTo(0.5, 0.5);
    kabocha.scale.set(4);
    kabocha.smoothed = false;
    // game.physics.arcade.enable(hone);
    this.kabocha = kabocha;

    kabocha.animations.add('walk', [0, 1, 2], 5, repeat);
    // kabocha.animations.play('walk');
  },
  update: function() {
    var speed = this.speed;
    if (isKeyDown('J')) {
      this.hone.animations.play('down');
      this.hone.y += speed;
    } else if (isKeyDown('H')) {
      this.hone.animations.play('left');
      this.hone.x -= speed;
    } else if (isKeyDown('L')) {
      this.hone.animations.play('right');
      this.hone.x += speed;
    } else if (isKeyDown('K')) {
      this.hone.animations.play('up');
      this.hone.y -= speed;
    } else if (isKeyDown('A')) {
      this.hone.angle += 1;
    } else if (isKeyDown('S')) {
      this.speed = 6;
    }

    // Zを押すごとに回転が早くなる（やりすぎ注意）
    // Xで回転停止（回転速度もリセット）
    if (isKeyDown('Z')) {
      if (!this.rotating) {
        this.angle = 1;
      }
      this.rotating = true;
      this.angle += 0.5;
    }
    if (isKeyDown('X')) {
      this.rotating = false;
      this.angle = 0;;
    }

    if (this.rotating) {
      this.kabocha.angle += this.angle;
    } else {
      this.kabocha.angle += 1;
    }
    changePage("Animation");
  }
};

Scene.Monsters = function(game) {
  this.game = game;
};
Scene.Monsters.prototype = {
  monsterGroup: null,
  monsters: [],
  preload: function() {
    game.load.image('monster1', 'app/assets/pipo-enemy009.png');
    game.load.image('monster2', 'app/assets/pipo-enemy012.png');
    game.load.image('monster3', 'app/assets/pipo-enemy016.png');
    game.load.image('monster4', 'app/assets/pipo-enemy002a.png');
  },
  create: function() {
    title("物理エンジン");

    // monsterGroup = game.add.group();
    // monsterGroup.enableBody = true; // 物理演算をオン
    // monsterGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.monsterGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);

    var names = ["monster1", "monster2", "monster3", "monster4"];
    for (var i=0; i<12; i++) {
      var monster = this.monsterGroup.create(180+i*68, 80, names[i%4]);
      monster.body.collideWorldBounds = true;
      monster.body.gravity.setTo(0, 0);
      monster.body.bounce.setTo(0.9, 0.9);
      this.monsters.push(monster);
    }
  },
  update: function() {
    if (isKeyDown("Z")) {
      this.monsters.forEach(function(monster) {
        // monster.body.bounce.setTo(0.6, 0.6);
        monster.body.gravity.x = game.rnd.integerInRange(-50, 50);
        monster.body.gravity.y = 100 + Math.random() * 100;
      });
    }

    // game.physics.arcade.collide(this.monsterGroup);
    changePage("Monsters");
  }
};

Scene.Impression = function(game) {
  this.game = game;
};
Scene.Impression.prototype = {
  create: function() {
    title("所感");
    items([
      "お決まりのロジックはFWでサポート",
      "JavaScriptでゆるく書ける",
      "TypeScriptもサポート",
      "プレゼンテーションのお供として"
    ]);
  },
  update: function() {
    changePage("Impression");
  }
};

Scene.Future = function(game) {
  this.game = game;
};
Scene.Impression.prototype = {
  create: function() {
    title('ゲームUI × "何か"');
    items([
      '・"何か" is ...',
      "      Heroku",
      "      Salesforce",
      "      WebSocket",
      "      Ionic",
      "・JavaScriptなので応用範囲は広い"
    ], {fontSize: 50});
  },
  update: function() {
    changePage("Impression");
  }
};

Scene.Conclusion = function(game) {
  this.game = game;
};
Scene.Conclusion.prototype = {
  create: function() {
    title("まとめ");
    items([
      "・Phaserというライブラリの紹介",
      "    ・個人で遊ぶならとてもいい感じ",
      "・Presentation as Code",
      "    ・1回やってみたかった",
      "    ・やっぱりパワポは便利"
    ]);
  },
  update: function() {
    changePage("Conclusion");
  }
};

Scene.End = function(game) {
  this.game = game;
};
Scene.End.prototype = {
  create: function() {
    textCenter([
      "ありがとうございました"
    ], {fontSize: 80, y: (game.world.height/2)});
  },
  update: function() {
    changePage("End");
  }
};