import loginPage from '../../support/login_page'


beforeEach(function () {
    cy.fixture('loginData').then((data) => {
        this.data = data
    })
})

// Create a test-case that will fail because of unsuccessful login. 
describe('Correct & Wrong login testing', () => {
    it('Wrong Login', function () {

        const login = new loginPage()
        cy.visit(this.data.link)
        login.getUsernameField().should('be.visible').type(this.data.validLogin)
        login.getPasswordField().should('be.visible').type(this.data.invalidPassword)
        login.Submit()
        cy.url().then($url => {
            expect($url).to.equal(this.data.link)
            expect(false).to.equal(true)
        })
    })

    it('Error messages verification', function () {
        const login = new loginPage()
        cy.visit(this.data.link)

        login.getUsernameField().should('be.visible').type(this.data.invalidLogin)
        login.getPasswordField().should('be.visible').type(this.data.invalidPassword)
        login.Submit().should('be.visible')
        login.getError().should('be.visible').and('contain', this.data.notFoundError)


        login.Submit()
        login.getError().should('be.visible').and('contain', this.data.enterPassError)


        login.getPasswordField().type(this.data.invalidPassword)
        login.getUsernameField().clear()
        login.Submit()
        login.getError().should('be.visible').and('contain', this.data.enterUsNameError)

    })
})

