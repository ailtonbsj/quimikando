let dataSource = [];
let dataSourceIndex = 0;
let itemNow = undefined;
let itemsDom = $('#items');

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
  dataSourceIndex = Math.floor(Math.random()*dataSource.length);
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

async function getData() {
  let res = await fetch("../data.json");
  data = await res.json();
  dataSource = data.map((item, index0) => {
    let indexs = Array.from(Array(data.length).keys());
    let i = indexs.indexOf(index0);
    indexs.splice(i, 1);
    
    index = Math.floor(Math.random()*indexs.length);
    index1 = indexs[index];
    i = indexs.indexOf(index1);
    indexs.splice(i, 1);

    index = Math.floor(Math.random()*indexs.length);
    index2 = indexs[index];
    i = indexs.indexOf(index2);
    indexs.splice(i, 1);

    index = Math.floor(Math.random()*indexs.length);
    index3 = indexs[index];
    i = indexs.indexOf(index3);
    indexs.splice(i, 1);

    item1 = data[index1].palavra;
    item2 = data[index2].palavra;
    item3 = data[index3].palavra;
    item.itens = [
      item.palavra, item1, item2, item3
    ];
    return item;
  });
  dataSourceIndex = Math.floor(Math.random()*dataSource.length);
  generateQuestion();
}

$(function(){
  getData();
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
