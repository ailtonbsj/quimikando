let dataSourceIndex = 0;
let life = 6;
let questionWord = '';
let dataSource;

function generateKeyboard() {
  var kb = $('#keyboard');
  kb.empty();
  for (var i = 65; i <= 90; i++) {
    var btn = document.createElement('button');
    $(btn).addClass('btn btn-sm btn-default col-xs-1')
      .html(String.fromCharCode(i)).click(actionUserClick);
    kb.append(btn);
  }
}

function generateQuestion() {
  life = 6;
  $('#imgman').attr('src', 'images/man' + life + '.png');
  if (dataSource[dataSourceIndex] == undefined) {
    bootbox.alert({
      title: "Alerta",
      message: "Fim de jogo! Parabens você finalizou o jogo!",
      callback: function (r) {
        window.location = "../index.html";
      }
    });
  }
  questionWord = dataSource[dataSourceIndex].palavra
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  questionPhrase = dataSource[dataSourceIndex].frase;
  dataSourceIndex = Math.floor(Math.random()*dataSource.length);
  $('#frase-view').html(questionPhrase);
  var len = questionWord.length;
  var map = Array.prototype.map;
  userWord = map.call(questionWord, function (x) {
    return x === ' ' ? ' ' : '_'
  });
  console.log(questionWord);
  $('.hangword').html(userWord);
  generateKeyboard();
}

function actionUserClick() {
  var letter = $(this).html();
  var i = questionWord.indexOf(letter.toLowerCase());
  if (i != -1) {
    while (i != -1) {
      userWord[i] = letter;
      i = questionWord.indexOf(letter.toLowerCase(), i + 1);
    }
    $('.hangword').html(userWord);
    var i_ = userWord.indexOf('_');
    if (i_ == -1) {
      bootbox.alert({
        title: "Alerta",
        message: "Parabens! A palavra era " + questionWord.toUpperCase(),
        callback: function (r) {
          generateQuestion();
        }
      });
    }
  } else {
    life--;
    if (life <= 0) {
      bootbox.alert({
        title: "Alerta",
        message: "Você matou o cabinha!",
        callback: function (r) {
          window.location = "../index.html";
        }
      });
    }
    $('#imgman').attr('src', 'images/man' + life + '.png');
  }
  $(this).remove();
}

async function getData() {
  let res = await fetch("../data.json");
  dataSource = await res.json();
  dataSourceIndex = Math.floor(Math.random()*dataSource.length);
  generateQuestion();
}

$(function () {
  getData();
});
