$(function(){
  $("#sobre-menu").click(function(){
    bootbox.confirm({
      title: "Sobre",
      message: "Aplicativo projetado por Suyanne Hellen Holanda Pinheiro.",
      callback: function(r){}
    });
  });

  for (var i = 65; i <= 90; i++) {
    var btn = document.createElement('button');
    $(btn).addClass('btn btn-sm btn-default col-xs-1').html(String.fromCharCode(i));
    $('#keyboard').append(btn);
  }

  $('#keyboard button').click(function(){
    var l = $(this).html();
    var i = palavraAtual.indexOf(l.toLowerCase());
    if(i != -1){
      while(i != -1){
        palavraUser[i] = l;
        i = palavraAtual.indexOf(l.toLowerCase(), i+1);
      }
      $('.hangword').html(palavraUser);
    } else {
      tentativas--;
      if(tentativas == 0){
        bootbox.alert({
          title: "Alerta",
          message: "Você matou o cabinha!",
          callback: function(r){
            //window.location = "index.html";
          }
        });
      }
      $('#imgman').attr('src','images/man'+tentativas+'.png');
    }
  });

  function novaFrase(){
    tentativas = 6;
    palavraAtual = dados[indice].palavra;
    fraseAtual = dados[indice].frase;
    indice++;
    $('#frase-view').html(fraseAtual);
    var len = palavraAtual.length;
    var map = Array.prototype.map;
    palavraUser = map.call(palavraAtual, function(x) { return '_' });
    $('.hangword').html(palavraUser);
  }

  dados = [
    {'palavra':'fosforo', 'frase': 'Ja fui feito de mijo e tenho a cabeça quente'},
    {'palavra':'carbono', 'frase': 'Tenho direito a quatro ligaões e sou pretinho algumas vezes.'},
    {'palavra':'agua', 'frase': 'Nao tenho cor e sou molhado.'}
  ];
  indice = 0;
  tentativas = 0;
  palavraAtual = '';
  palavraUser = '';
  fraseAtual = '';
  //novaFrase();
  novaFrase();
});
