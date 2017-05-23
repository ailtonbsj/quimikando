var dataSource = [
  {'palavra':'fosforo', 'frase': 'Descoberto por Henning Brand.'},
  {'palavra':'carbono', 'frase': 'Tenho direito a quatro ligaões.'},
  {'palavra':'agua', 'frase': 'Minha formula quimica é o H2O.'},
  {'palavra':'eletron', 'frase': 'Sou disparado na tela de um monitor CRT.'}
];
var dataSourceIndex = 0;
var life = 6;
var questionWord = '';

function generateKeyboard(){
  var kb = $('#keyboard');
  kb.empty();
  for (var i = 65; i <= 90; i++) {
    var btn = document.createElement('button');
    $(btn).addClass('btn btn-sm btn-default col-xs-1')
    .html(String.fromCharCode(i)).click(actionUserClick);
    kb.append(btn);
  }
}

function generateQuestion(){
  life = 6;
  $('#imgman').attr('src','images/man'+life+'.png');
  if(dataSource[dataSourceIndex] == undefined){
    bootbox.alert({
      title: "Alerta",
      message: "Fim de jogo! Parabens você finalizou o jogo!",
      callback: function(r){
        window.location = "../index.html";
      }
    });
  }
  questionWord = dataSource[dataSourceIndex].palavra;
  questionPhrase = dataSource[dataSourceIndex].frase;
  dataSourceIndex++;
  $('#frase-view').html(questionPhrase);
  var len = questionWord.length;
  var map = Array.prototype.map;
  userWord = map.call(questionWord, function(x) { return '_' });
  $('.hangword').html(userWord);
  generateKeyboard();
}

function actionUserClick(){
  var letter = $(this).html();
  var i = questionWord.indexOf(letter.toLowerCase());
  if(i != -1){
    while(i != -1){
      userWord[i] = letter;
      i = questionWord.indexOf(letter.toLowerCase(), i+1);
    }
    $('.hangword').html(userWord);
    var i_ = userWord.indexOf('_');
    if(i_ == -1){
      bootbox.alert({
        title: "Alerta",
        message: "Parabens! A palavra era "+questionWord.toUpperCase(),
        callback: function(r){
          generateQuestion();
        }
      });
    }
  } else {
    life--;
    if(life <= 0){
      bootbox.alert({
        title: "Alerta",
        message: "Você matou o cabinha!",
        callback: function(r){
          window.location = "../index.html";
        }
      });
    }
    $('#imgman').attr('src','images/man'+life+'.png');
  }
  $(this).remove();
}

$(function(){
  generateQuestion();
});
