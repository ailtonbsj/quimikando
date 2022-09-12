var dataset = [
  {
    pergunta: "Primeiro Elemento da Tabela Periodica",
    resposta: "hidrogenio",
    horizontal: true,
    x: 1,
    y: 1
  },
  {
    pergunta: "Um gas nobre",
    resposta: "helio",
    horizontal: false,
    x: 1,
    y: 1
  },
  {
    pergunta: "Existe em lampadas coloridas",
    resposta: "neonio",
    horizontal: false,
    x: 8,
    y: 1
  },
  {
    pergunta: "Existe no sal de cozinha",
    resposta: "iodo",
    horizontal: true,
    x: 1,
    y: 4
  },
  {
    pergunta: "Usado em moedas e premios",
    resposta: "prata",
    horizontal: true,
    x: 1,
    y: 7
  },
  {
    pergunta: "Terceiro numero por extenso",
    resposta: "tres",
    horizontal: false,
    x: 4,
    y: 7
  },
  {
    pergunta: "Tem no sal do mar",
    resposta: "sodio",
    horizontal: true,
    x: 4,
    y: 10
  },
  {
    pergunta: "Protege nosso planeta",
    resposta: "ozonio",
    horizontal: true,
    x: 8,
    y: 6
  }
];

function getMaxH(){
  var max = 0;
  dataset.forEach(function(item){
    if(item.horizontal){
      var last = item.x + (item.resposta.length-1);
      if(last > max) max = last;
    }
  });
  return max;
}

function getMaxV(){
  var max = 0;
  dataset.forEach(function(item){
    if(!item.horizontal){
      var last = item.y + (item.resposta.length-1);
      if(last > max) max = last;
    }
  });
  return max;
}

function genTable(){
  var cols = getMaxH();
  var rows = getMaxV();
  var tab = document.createElement('table');
  for (var j = 1; j <= rows; j++) {
    var tr = document.createElement('tr');
    for(var i = 1; i <= cols; i++){
      var td = document.createElement('td');
      $(td).attr('id',i+'td'+j).html();
      $(tr).append(td);
    }
    $(tab).append(tr);
  }
  var crossw = $('#crossword');
  crossw.append(tab);
}

function populateTable(){
  dataset.forEach(function(item, index){
    var resposta = item.resposta.toUpperCase();
    var x = item.x;
    var y = item.y;
    for (var i = 0; i < resposta.length; i++) {
      if(item.horizontal){
          $('#'+(x+i)+'td'+y).css('background-color','white')
          .attr('data-value',resposta[i])
          .attr('data-itemh',index);
      } else {
        $('#'+x+'td'+(y+i)).css('background-color','white')
        .attr('data-value',resposta[i])
        .attr('data-itemv',index);
      }
    }
  });
}

function transformItem(item, callackSelected){
  var resposta = item.resposta;
  var x = item.x;
  var y = item.y;
  for (var i = 0; i < resposta.length; i++) {
    if(item.horizontal){
        callackSelected($('#'+(x+i)+'td'+y));
    } else {
      callackSelected($('#'+x+'td'+(y+i)));
    }
  }
}

function selectItem(item){
  item = dataset[item];
  transformItem(lastSelectedItem, function(dom){
    dom.css('background-color','white');
  });
  transformItem(item, function(dom){
    dom.css('background-color','yellow');
  });
  $('#pergunta-view').html(item.pergunta);
  lastSelectedItem = item;
}

function generateKeyboard(){
  var kb = $('#keyboard');
  kb.empty();
  for (var i = 65; i <= 90; i++) {
    var btn = document.createElement('button');
    $(btn).addClass('btn btn-sm btn-default col-xs-1')
    .html(String.fromCharCode(i)).click(actionKeyboard);
    kb.append(btn);
  }
  for (var i = 0; i <= 9; i++) {
    var btn = document.createElement('button');
    $(btn).addClass('btn btn-sm btn-default col-xs-1')
    .html(i).click(actionKeyboard);
    kb.append(btn);
  }
}

function actionKeyboard(){
  var _key = $(this).text();
  var tam = lastSelectedItem.resposta.length-1;
  var domSel = $('#'+coords[0]+'td'+(coords[1]));
  if(domSel.attr('data-value') == _key) domSel.css('color','green');
  else domSel.css('color','red');
  domSel.text(_key);
  if(isHori){
    if(coords[0] < (lastSelectedItem.x+tam)) coords[0]++;
  } else {
    if(coords[1] < (lastSelectedItem.y+tam)) coords[1]++;
  }
}

var lastSelectedItem = dataset[0];
var isHori = true;
var coords;
$(function(){
  genTable();
  populateTable();
  generateKeyboard();
  $('#crossword td').click(function(){
    var _this = $(this);

    if(_this[0].hasAttribute("data-value")){
      var hasH = _this[0].hasAttribute("data-itemh");
      var hasV = _this[0].hasAttribute("data-itemv");
      if(hasH && hasV) isHori = !isHori;
      else if(hasH) isHori = true;
      else if(hasV) isHori = false;
      coords = _this.attr('id').split('td').map(function(i){return parseInt(i)});
      if (isHori) {
        item = _this.attr('data-itemh');
      } else {
        item = _this.attr('data-itemv');
      }
      selectItem(item);
    }

  });

});
