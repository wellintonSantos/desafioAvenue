it.only('completes an item using API', () => {
    cy.request({
        method: "GET",
        url: "/",
        qs: {
            "q": "São Paulo,BR-SP,BRA",
            "units": "metric",
            "lang": "pt_br",
            "appid": "29ac25f5b96eb62fa368bb9245d2d5b7" //TODO pegar do config
        }
    })
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'São Paulo') 
            expect(response.body).to.have.property('country', 'BR') 
          })
})