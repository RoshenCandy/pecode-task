class loginPage{
    getUsernameField(){
        return cy.get('[name = username]')
    }
    getPasswordField(){
        return cy.get('[name = password]')
    }
    Submit(){
        return cy.get('.btn-success').click()
    }
    getError(){
        return cy.get('.has-error > .help-block')
    }
}
export default loginPage