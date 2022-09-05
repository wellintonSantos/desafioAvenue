it('completes an item using API', () => {
    cy.intercept({
        method: "GET",
        url: "/",
        qs: {
            "lat": "25.727376769309547",
            "lon": "-80.24395686729872",
            "appid": "29ac25f5b96eb62fa368bb9245d2d5b7"
        }
    })
        .as('buscaPrevisaoDoTempo')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')

    cy.wait('@buscaPrevisaoDoTempo')
})