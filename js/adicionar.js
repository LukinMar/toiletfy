$('input[type="radio"]').click(function () {
var avaliacao = [];
if  ($('#star1').is(':checked')){
avaliacao = "<img src=''img/1estrela.png''  width=''170px'' title=''1 estrela''  alt=''1 estrela''>"
}else if ($('#star2').is(':checked')){
avaliacao = "<img src=''img/2estrelas.png''  width=''170px'' title=''2 estrelas''  alt=''2 estrelas''>"
}else if ($('#star3').is(':checked')){
  avaliacao = "<img src=''img/3estrelas.png''  width=''170px'' title=''3 estrelas''  alt=''3 estrelas''>"
}else if ($('#star4').is(':checked')){
  avaliacao = "<img src=''img/4estrelas.png''  width=''170px'' title=''4 estrelas''  alt=''4 estrelas''>"
}else if ($('#star5').is(':checked')){
  avaliacao = "<img src=''img/5estrelas.png''  width=''170px'' title=''5 estrelas''  alt=''5 estrelas''>"
}else{
  avaliacao = "Sem avaliação";
}

$('#inputavaliacao').val(avaliacao)

});


  $(".procurar").click(function(){
    $(".content").slideToggle("fast");
  });
  


  $('input[type="checkbox"]').click(function () {
    var informacao = []
    if ($('#pagamento').is(':checked') && $('#adaptado').is(':checked') && $('#fraldario').is(':checked')){
      informacao = "<img src=''img/moneypcdfrald.png'' width=''120px'' title=''Necessita pagamento, possui banheiro adaptado e possui fraldário'' alt=''Necessita pagamento, possui banheiro adaptado e possui fraldário''>"
    }
    else if ($('#pagamento').is(':checked') && $('#adaptado').is(':checked')){
      informacao = "<img src=''img/moneypcd.png'' width=''120px'' title=''Necessita pagamento e possui banheiro adaptado'' alt=''Necessita pagamento e possui banheiro adaptado''>"
    }
    else if ($('#pagamento').is(':checked') && $('#fraldario').is(':checked')){
      informacao = "<img src=''img/moneyfrald.png'' width=''120px'' title=''Necessita pagamento e possui fraldário'' alt=''Necessita pagamento e possui fraldário''>"
    }  
    else if ($('#adaptado').is(':checked') && $('#fraldario').is(':checked')){
      informacao = "<img src=''img/pcdfrald.png'' width=''120px'' title=''Possui banheiro adaptado e possui fraldário'' alt=''Possui banheiro adaptado e possui fraldário''>"
    }
    else if ($('#pagamento').is(':checked')){
      informacao = "<img src=''img/money.png'' width=''120px'' title=''Necessita pagamento''  alt=''Necessita pagamento''>"
    } 
    else if ($('#adaptado').is(':checked')){
      informacao = "<img src=''img/pcd.png'' width=''120px'' title=''Possui banheiro adaptado'' alt=''Possui banheiro adaptado''>"
    } 
    else if ($('#fraldario').is(':checked')){
      informacao = "<img src=''img/fraldario.png'' width=''120px'' title=''Possui fraldário'' alt=''Possui fraldário''>"
    } 
    else {
      informacao = "<img src=''img/seminfo.png'' width=''120px'' title='' '' alt='' ''>"
    }
    $('#textarea1').val(informacao)
    }); 