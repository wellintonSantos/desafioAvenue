describe('Cadastro de usuário', () => {

  // Suite 2 - Cadastro - Cenário1
  it('Preenche os dados para o cadastro com sucesso', { tags: ['suite2', 'cadastro'] }, () => {
    // faz o require para usar o faker
    var faker = require('faker-br');

    // Cria um nome e sobrenome fake
    const nome = `${faker.name.firstName()} ${faker.name.lastName()}`

    // Cria um email fake
    const email = faker.internet.email()

    //Cria uma senha fake
    const senha = faker.internet.password()

    // Acessa a página inícial da Amazon
    cy.visit('/')

    // Abre o modal da minha conta
    cy.get('#nav-link-accountList').focus()

    // Clica em "Começe aqui"
    cy.get('.nav-signin-tooltip-footer > .nav-a').click()

    // Adiciona o nome fake gerado acima
    cy.get('#ap_customer_name').type(nome)
    
    // Adiciona o email fake gerado acima
    cy.get('#ap_email').type(email)

    // Adiciona a senha fake gerada acima
    cy.get('#ap_password').type(senha)

    // Adiciona novamente a senha fake gerada acima
    cy.get('#ap_password_check').type(senha)
  })
})