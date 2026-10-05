# Verificar Aprovação

Projeto de estudo em JavaScript para praticar **testes de software** com **Mocha** e o módulo `assert` do Node.js.

A função `verificarAprovacao` recebe a **média** e a **frequência** de um aluno e retorna a situação final: `APROVADO`, `RECUPERAÇÃO` ou `REPROVADO`.

## Regra de negócio

| Situação      | Média       | Frequência |
|---------------|-------------|------------|
| `APROVADO`    | >= 7        | >= 75%     |
| `RECUPERAÇÃO` | >= 4 e < 7  | >= 75%     |
| `REPROVADO`   | < 4         | qualquer   |
| `REPROVADO`   | qualquer    | < 75%      |

## Técnicas de teste aplicadas

### Tabela de decisão

Combina as três condições da regra (média >= 7, média >= 4 e frequência >= 75) e cobre as 6 regras possíveis:

| Regra | Média >= 7 | Média >= 4 | Frequência >= 75 | Resultado   |
|-------|------------|------------|------------------|-------------|
| 1     | S          | S          | S                | APROVADO    |
| 2     | N          | S          | S                | RECUPERAÇÃO |
| 3     | N          | N          | S                | REPROVADO   |
| 4     | S          | S          | N                | REPROVADO   |
| 5     | N          | S          | N                | REPROVADO   |
| 6     | N          | N          | N                | REPROVADO   |

### Análise de valor limite

Testa o valor exato de cada fronteira, o valor logo abaixo e o valor logo acima:

- **Média em 4** (reprovado x recuperação): 3.99, 4 e 4.01
- **Média em 7** (recuperação x aprovado): 6.99, 7 e 7.01
- **Frequência em 75%**: 74.99, 75 e 75.01, com média de aprovação (7) e de recuperação (4)

Os testes seguem o padrão **AAA** (Arrange, Act, Assert) e estão organizados em `describe` aninhados dentro da suíte `VerificarAprovação`.

## Estrutura do projeto

```
verificarAprovacao/
├── source/
│   └── verificarAprovacao.js        # função que está sendo testada
├── test/
│   └── verificarAprovacao.test.js   # testes (tabela de decisão e valor limite)
├── .gitignore
├── package.json
└── package-lock.json
```

## Tecnologias

- JavaScript (ES Modules)
- [Node.js](https://nodejs.org/)
- [Mocha](https://mochajs.org/)
- `assert` (módulo nativo do Node.js)

## Como executar

Pré-requisito: ter o [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Clone o repositório
git clone <URL-DO-SEU-REPOSITORIO>

# 2. Entre na pasta do projeto
cd verificarAprovacao

# 3. Instale as dependências
npm install

# 4. Execute os testes
npm test
```

> Como o projeto usa `import`/`export`, o `package.json` precisa ter a configuração `"type": "module"`. O script `test` deve chamar o Mocha (`"test": "mocha"`).

## Exemplo de uso

```javascript
import { verificarAprovacao } from './source/verificarAprovacao.js'

verificarAprovacao(7, 75)    // 'APROVADO'
verificarAprovacao(5, 80)    // 'RECUPERAÇÃO'
verificarAprovacao(3.9, 90)  // 'REPROVADO'
verificarAprovacao(8, 74.99) // 'REPROVADO'
```

## Objetivo de aprendizado

- Escrever testes automatizados com Mocha
- Aplicar técnicas de teste de caixa-preta: tabela de decisão e análise de valor limite
- Organizar suítes de teste com `describe` aninhados
- Usar o Padrão Triple A - Arrange, Act, Assert

## Projeto de
- Cíntia Dias:
- https://www.linkedin.com/in/diaslcintia/
- https://github.com/cintiadiasl
