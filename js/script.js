const json = []
  

for (let i = 0; i < json.length; i++) {
  let dados = json[i].Descricao.split(", ");

  var formatado = {
    id: i + 1,
    nomeLocal: dados[0],
    endereco:
      dados[1] +
      ", " +
      dados[2] +
      ", " +
      dados[3] +
      ", " +
      dados[4].substr(0, 9),
    observacao: "",
    avaliacao: dados[4].match(/<img.*?src='(.*?)'[^>]+>/g)[0],
    informacao: dados[4].match(/<img.*?src='(.*?)'[^\>]+>/g)[1]
  };

  console.log(formatado);
}
