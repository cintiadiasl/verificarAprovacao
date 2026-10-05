import { verificarAprovacao } from '../source/verificarAprovacao.js'
import assert from 'node:assert' //comando que puxa o assert direto do node
// describe define o que é uma suíte de teste

describe('VerificarAprovação', function() {
  // Tabela de decisão
  // | Regra | Média >= 7 | Média >= 4 | Frequência >= 75 | Resultado   |
  // |-------|------------|------------|------------------|-------------|
  // |   1   |     S      |     S      |        S         | APROVADO    |
  // |   2   |     N      |     S      |        S         | RECUPERAÇÃO |
  // |   3   |     N      |     N      |        S         | REPROVADO   |
  // |   4   |     S      |     S      |        N         | REPROVADO   |
  // |   5   |     N      |     S      |        N         | REPROVADO   |
  // |   6   |     N      |     N      |        N         | REPROVADO   |
  describe('Tabela de Decisão', function() {
    // Regra 1
    it('Deve retornar aprovado quando a média for >= 7 e a frequência for >= 75', function() {
      // Arrange -> onde eu defino as minhas variáveis e o que é que eu espero
      const resultadoEsperado = 'APROVADO'
      // Act -> onde eu realizo a ação
      let resultadoEncontrado = verificarAprovacao(7, 75)
      // Assert -> é onde eu faço a asserção/validação
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    // Regra 2
    it('Deve retornar recuperação quando a média for >= 4 e < 7 e a frequência for >= 75% (média 6.99)', function() {
      const resultadoEsperado = 'RECUPERAÇÃO'
      let resultadoEncontrado = verificarAprovacao(6.99, 75)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('Deve retornar recuperação quando a média for >= 4 e < 7 e a frequência for >= 75% (média 4)', function() {
      const resultadoEsperado = 'RECUPERAÇÃO'
      let resultadoEncontrado = verificarAprovacao(4, 75)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('Deve retornar recuperação quando a média for >= 4 e < 7 e a frequência for >= 75% (média 5)', function() {
      const resultadoEsperado = 'RECUPERAÇÃO'
      let resultadoEncontrado = verificarAprovacao(5, 75)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    // Regra 3
    it('Deve retornar reprovado quando a média for < 4, mesmo com frequência >= 75%', function() {
      const resultadoEsperado = 'REPROVADO'
      let resultadoEncontrado = verificarAprovacao(3.9, 75)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    // Regra 4
    it('Deve retornar reprovado quando com média >= 7 e frequência for < 75', function() {
      const resultadoEsperado = 'REPROVADO'
      let resultadoEncontrado = verificarAprovacao(7, 74.99)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    // Regra 5
    it('Deve retornar reprovado quando a frequência for < 75%, mesmo com média na faixa de recuperação', function() {
      const resultadoEsperado = 'REPROVADO'
      let resultadoEncontrado = verificarAprovacao(5, 74.99)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    // Regra 6
    it('Deve retornar reprovado quando a média for < 4 e a frequência for < 75%', function() {
      const resultadoEsperado = 'REPROVADO'
      let resultadoEncontrado = verificarAprovacao(2.7, 58)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
  })
  describe('Análise de Valor Limite', function() {
    // Fronteira da MÉDIA em 4 (reprovado x recuperação), com frequência válida (75)
    it('Média 3.99 (logo abaixo do limite de 4) e frequência 75 deve retornar REPROVADO', function() {
      assert.equal(verificarAprovacao(3.99, 75), 'REPROVADO')
    })
    it('Média 4 (limite exato) e frequência 75 deve retornar RECUPERAÇÃO', function() {
      assert.equal(verificarAprovacao(4, 75), 'RECUPERAÇÃO')
    })
    it('Média 4.01 (logo acima do limite de 4) e frequência 75 deve retornar RECUPERAÇÃO', function() {
      assert.equal(verificarAprovacao(4.01, 75), 'RECUPERAÇÃO')
    })

    // Fronteira da MÉDIA em 7 (recuperação x aprovado), com frequência válida (75)
    it('Média 6.99 (logo abaixo do limite de 7) e frequência 75 deve retornar RECUPERAÇÃO', function() {
      assert.equal(verificarAprovacao(6.99, 75), 'RECUPERAÇÃO')
    })
    it('Média 7 (limite exato) e frequência 75 deve retornar APROVADO', function() {
      assert.equal(verificarAprovacao(7, 75), 'APROVADO')
    })
    it('Média 7.01 (logo acima do limite de 7) e frequência 75 deve retornar APROVADO', function() {
      assert.equal(verificarAprovacao(7.01, 75), 'APROVADO')
    })

    // Fronteira da FREQUÊNCIA em 75, com média de aprovação (7)
    it('Frequência 74.99 (logo abaixo do limite de 75) e média 7 deve retornar REPROVADO', function() {
      assert.equal(verificarAprovacao(7, 74.99), 'REPROVADO')
    })
    it('Frequência 75 (limite exato) e média 7 deve retornar APROVADO', function() {
      assert.equal(verificarAprovacao(7, 75), 'APROVADO')
    })
    it('Frequência 75.01 (logo acima do limite de 75) e média 7 deve retornar APROVADO', function() {
      assert.equal(verificarAprovacao(7, 75.01), 'APROVADO')
    })

    // Fronteira da FREQUÊNCIA em 75, com média de recuperação (4)
    it('Frequência 74.99 e média 4 deve retornar REPROVADO', function() {
      assert.equal(verificarAprovacao(4, 74.99), 'REPROVADO')
    })
    it('Frequência 75.01 e média 4 deve retornar RECUPERAÇÃO', function() {
      assert.equal(verificarAprovacao(4, 75.01), 'RECUPERAÇÃO')
    })
  })
})