
$('input[id=star1]').change(function(e) {
    $('#inputavaliacao').val(e.target.value)
  });
  $('input[id=star2]').change(function(e) {
    $('#inputavaliacao').val(e.target.value)
  });
  $('input[id=star3]').change(function(e) {
    $('#inputavaliacao').val(e.target.value)
  });
  $('input[id=star4]').change(function(e) {
    $('#inputavaliacao').val(e.target.value)
  });
  $('input[id=star5]').change(function(e) {
    $('#inputavaliacao').val(e.target.value)
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
      informacao = "<img src=''img/PCD.png'' width=''120px'' title=''Possui banheiro adaptado'' alt=''Possui banheiro adaptado''>"
    } 
    else if ($('#fraldario').is(':checked')){
      informacao = "<img src=''img/fraldario.png'' width=''120px'' title=''Possui fraldário'' alt=''Possui fraldário''>"
    } 
    else {
      informacao = "<img src=''img/seminfo.png'' width=''120px'' title='' '' alt='' ''>"
    }
    $('#textarea1').val(informacao)
    }); 