describe('Carrinho de compras', () => {

  it('Pesquisa e adiciona a Alexa Echo show 15 ao carrinho', () => {

    // Acessa a página inícial da Amazon
    cy.visit('/')

    // No campo de busca, procura por um chinelo e preciona a tecla ENTER, pois geralmente é assim que um usuário faz (ao invés de clicar no botão)
    cy.get('#twotabsearchtextbox').type("echo show 15").type('{enter}')

    // Valida de se no resultado contém o item pesquisado e clica
    cy.contains("Echo Show 15").click()

    // Clica no botão "Adicionar ao carinho" (espero até 20 segundos para o elemento estar visível para clicar)
    cy.get('#add-to-cart-button', { timeout: 20000 }).should('be.visible').click()

    // Clica no botão fechar caso o modal de "sugestões" apareça
    cy.get('.a-button-close', { timeout: 20000 }).should('be.visible').click()
    // Caso o modal não apareça, o teste deve seguir normalmente, pois neste caso, não é obrifatório
    cy.on('fail', (error, runnable) => {
      expect(error.message).to.include('Timed out retrying')
      return false
    })

    // Valida se o item foi adicionado ao carrinho
    cy.contains("Adicionado ao carrinho")

    // Valida se é o item certo
    cy.contains("Echo Show 15")
  })

  it('Pesquisa, adiciona três ao carrinho e valida o valor total', () => {
    // Acessa a página inícial da Amazon
    cy.visit('/')

    let valorDoItem1 = 0.0
    let valorDoItem2 = 0.0
    let valorDoItem3 = 0.0
    let subTotal = 0.0
    let subTotalDaPagina = 0.0

    function pegaPrecoDoItem(nomeItem) {
      // Pega o preço do item escolhido e guarda (caso haja alguma demora no carregamento da página, guardo por até 20 segundos o objeto aparecer)
      cy.get('.a-spacing-none > .a-price > [aria-hidden="true"]', { timeout: 20000 })
        .should('be.visible')
        .invoke("text")
        .then(($valor) => {
          // Pega o valor do item, troca o ponto por vírgula (para eu converte para  o tipo float mais tarde) e remove o "R$ "
          let valueItem = $valor.replace(',', '.').match(/[0-9]{1,3}\.[0-9]{2}/g)
          cy.wrap(valueItem).as(nomeItem);
        })
      pegaValores(nomeItem)
    }

    function pegaValores(nomeDaVariavel) {
      cy.get(`@${nomeDaVariavel}`).then(nomeDaVariavel => {

        switch (nomeDaVariavel) {
          case "valorDoItem1":
            valorDoItem1 = nomeDaVariavel
          case "valorDoItem2":
            valorDoItem2 = nomeDaVariavel
          case "valorDoItem3":
            valorDoItem3 = nomeDaVariavel
          case "subTotal":
            subTotal = nomeDaVariavel
          case "subTotalDaPagina":
            subTotalDaPagina = nomeDaVariavel
        }
      })
    }

    function somaValorDoItenAoSubTotal(item) {
      subTotal += item
      return subTotal
    }

    function pegaSubTotalExibidoNaPagina() {
      // Pega o subTotal mostrado na página (espero até 20 segundos para o elemento estar visível)
      cy.get('#sw-subtotal > :nth-child(2) > .a-price > [aria-hidden="true"]', { timeout: 20000 }).should('be.visible')
        .invoke("text")
        .then(($valor) => {
          // Pega o subTotal mostrado na página, troca o ponto por vírgula, remove o "R$ " e converte para float
          let subTotalDaPagina = parseFloat($valor.replace(',', '.').match(/[0-9]{1,3}\.[0-9]{2}/g))
          cy.wrap(subTotalDaPagina).as('subTotalDaPagina')
          pegaValores("subTotalDaPagina")
        })
    }

    // *** PRIMEIRO ITEM ***

    // No campo de busca, procura pelo item e preciona a tecla ENTER
    cy.get('#twotabsearchtextbox').type("chinelo havaianas masculino").type('{enter}')

    // Valida de se no resultado contém o item pesquisado e clica
    cy.contains("Chinelo Top Marvel Logomania, Havaianas, Adulto Unissex").click()

    // Seleciona o tamanho desejeado do chinelo
    cy.get('#native_dropdown_selected_size_name').select('41/42')

    // Seleciona o modelo desejado (da estampa) do chinelo
    cy.get('#a-autoid-11-announce').click()

    // Valida se a seleção está coerente com a escolha acima
    cy.get('.selection').contains('Preto')

    // Chama a função que pega o preço do item
    pegaPrecoDoItem("valorDoItem1")

    // Clica no botão "Adicionar ao carinho" (espero até 20 segundos para o elemento estar visível para clicar)
    cy.get('#add-to-cart-button', { timeout: 20000 }).should('be.visible').click()

    // Chama a função para somar o valor do primeiro item ao subtotal
    somaValorDoItenAoSubTotal(parseFloat(valorDoItem1))

    // Valida se o subTotal é igual ao valor do primeiro item
    expect(subTotal).to.eq(parseFloat(valorDoItem1))

    // Chama a função que pega o subTotal mostrado na página
    pegaSubTotalExibidoNaPagina()

    // Valida se o subTotal mostrado na página é igual ao subTotal calculado pelo teste
    expect(subTotalDaPagina).to.eq(parseFloat(subTotal))



    //  *** SEGUNDO ITEM ***

    // No campo de busca, procura pelo item e preciona a tecla ENTER
    cy.get('#twotabsearchtextbox').type("air fryer").type('{enter}')

    // Valida de se no resultado contém o item pesquisado e clica
    cy.contains("Arno, BFRY, Fritadeira Elétrica sem óleo AirFry Super").click()

    // Seleciona a opção "Volts"
    cy.get('#a-autoid-12-announce').click()

    // Valida se a seleção está coerente com a escolha acima
    cy.get('.selection').contains('220 Volts')

    // Chama a função que pega o preço do item
    pegaPrecoDoItem("valorDoItem2")

    // Clica no botão "Adicionar ao carinho" (espero até 20 segundos para o elemento estar visível para clicar)
    cy.get('#add-to-cart-button', { timeout: 20000 }).should('be.visible').click()

    // Chama a função para somar o valor do segundo item ao subtotal
    somaValorDoItenAoSubTotal(parseFloat(valorDoItem2))

    // Chama a função que pega o subTotal mostrado na página
    pegaSubTotalExibidoNaPagina()

    // Valida se o subTotal é igual ao valor do primeiro item
    expect(subTotalDaPagina).to.eq(parseFloat(subTotal))



    // *** TERCEIRO ITEM ***

    // No campo de busca, procura pelo item e preciona a tecla ENTER
    cy.get('#twotabsearchtextbox').type("coup").type('{enter}')

    // Valida de se no resultado contém o item pesquisado e clica
    cy.contains("Coup - Mandala Jogos").click()

    // Chama a função que pega o preço do item
    pegaPrecoDoItem("valorDoItem3")

    // Clica no botão "Adicionar ao carinho" (espero até 20 segundos para o elemento estar visível para clicar)
    cy.get('#add-to-cart-button', { timeout: 20000 }).should('be.visible').click()

    // Chama a função para somar o valor do segundo item ao subtotal
    somaValorDoItenAoSubTotal(parseFloat(valorDoItem3))

    // Chama a função que pega o subTotal mostrado na página
    pegaSubTotalExibidoNaPagina()

    // Valida se o subTotal é igual ao valor do primeiro item
    expect(subTotalDaPagina).to.eq(parseFloat(subTotal))
  })
})