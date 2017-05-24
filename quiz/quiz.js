var dataSource = [
  {
    frase:'Qual a formula da agua?',
    itens:['H2O','H2O2','CH4','O2']
  },
  {
    frase:'No nucleo de um atomo existem?',
    itens:['protons','eletrons','ions','cations']
  },
  {
    frase:'O ouro é um:',
    itens:['metal','semi-metal','ametal','gas nobre']
  },
  {
    frase:'A vitamina C é um tipo de:',
    itens:['ácido','base','sal','gás']
  }
];
var dataSourceIndex = 0;
var itemNow = undefined;
var itemsDom = $('#items');

function generateQuestion(){
  itemsDom.empty();
  itemNow = dataSource[dataSourceIndex];
  if(itemNow == undefined){
    bootbox.alert({
      title: "Alerta",
      message: "Você finalizou o Quiz!",
      callback: function(){
        window.location = '../index.html';
      }
    });
  }
  dataSourceIndex++;
  $('#frase-view').html(itemNow.frase);
  var indexs = shuffle([0,1,2,3]);
  for(index in indexs){
    var i = indexs[index];
    /*template*/
    var template = $.parseHTML(
      "<label class='element-animation1 btn btn-lg btn-primary btn-block'>"+
      "<span class='btn-label'>"+
      "<i class='glyphicon glyphicon-chevron-right'></i>"+
      "</span>"+
      itemNow.itens[i]+
      "</label>"
    );
    /*end-template*/
    $(template).attr('data-val',itemNow.itens[i]).click(function(){
      if($(this).attr('data-val') == itemNow.itens[0]){
        bootbox.alert({
          title: "Alerta",
          message: "Parabens você acertou!!!",
          callback: generateQuestion
        });
      }
      else {
        bootbox.alert({
          title: "Alerta",
          message: "Você errou! A resposta correta era "+itemNow.itens[0].toUpperCase(),
          callback: generateQuestion
        });
      }
    });
    itemsDom.append(template);
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

$(function(){
  generateQuestion();
});

/*$(function(){
var loading = $('#loadbar').hide();
$(document)
.ajaxStart(function () {
loading.show();
}).ajaxStop(function () {
loading.hide();
});

$("label.btn").on('click',function () {
var choice = $(this).find('input:radio').val();
$('#loadbar').show();
$('#quiz').fadeOut();
setTimeout(function(){
$( "#answer" ).html(  $(this).checking(choice) );
$('#quiz').show();
$('#loadbar').fadeOut();
// something else
}, 1500);
});

$ans = 3;

$.fn.checking = function(ck) {
if (ck != $ans)
return 'INCORRECT';
else
return 'CORRECT';
};
});
*/
