export function verificarAprovacao(media, frequencia) {
  let resultadoEncontrado
  if(media >= 7 && frequencia >= 75) {
    resultadoEncontrado = "APROVADO"
  } else if (media >= 4 && frequencia >= 75) {
    resultadoEncontrado = "RECUPERAÇÃO"
  } else {
    resultadoEncontrado = "REPROVADO"
  }
  return resultadoEncontrado
}
