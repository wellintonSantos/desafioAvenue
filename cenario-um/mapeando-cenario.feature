# encondig: utf-8
# language: pt

Funcionalidade: Câmbio
    Como usuário
    Quando eu realizar o câmbio
    Devo visualizar os valores corretamente na minha conta

Cenário: Realiza câmbio BR/USA
    Dado eu esteja logado no app
    E possua saldo em conta
    E realize um câmbio de Real para Dólar
    Então devo visualizar o valor convertido em Dólares

Cenário: Realiza câmbio BR/USA para investimento
    Dado eu esteja logado no app
    E possua saldo em conta
    E realize um câmbio de Real para Dólar
    E seleciono a opção investimento
    Então devo visualizar quais investimentos eu posso aplicar

Cenário: Realiza câmbio USA/BR
    Dado eu esteja logado no app
    E possua saldo em conta
    E realize um câmbio de Dólar para Real
    Então devo visualizar o valor convertido em Reais