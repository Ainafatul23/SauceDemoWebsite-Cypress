// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('EmptyUsernameLogin', (password) => {
    cy.get('#user-name').clear()
    cy.get('#password').clear()
    cy.get('#password').type(password);
    cy.get('#login-button').click();
})

Cypress.Commands.add('EmptyPasswordLogin', (username) => {
    cy.get('#user-name').clear()
    cy.get('#user-name').type(username);
    cy.get('#password').clear()
    cy.get('#login-button').click();
})

Cypress.Commands.add('Login', (username, password) => {
    cy.get('#user-name').clear()
    cy.get('#user-name').type(username);
    cy.get('#password').clear()
    cy.get('#password').type(password);
    cy.get('#login-button').click();
})

Cypress.Commands.add('Filter',(select) => {
    cy.get('[data-test="product_sort_container"]').select(select)
})

Cypress.Commands.add('AddCart',() => {
    cy.get('.inventory_item_name').contains('Sauce Labs Backpack').click()
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#remove-sauce-labs-backpack').should('contain','Remove')
    cy.get('.shopping_cart_badge').should('exist').should('contain','1')
    cy.get('#shopping_cart_container').click()
    cy.get('.inventory_item_name').should('contain','Sauce Labs Backpack').should('exist')
    // cy.get('#continue-shopping').click()
})

// Cypress.Commands.add('AddItem',() => {
//     cy.get('.inventory_item_name').contains('Sauce Labs Backpack').click()
//     cy.get('#add-to-cart-sauce-labs-backpack').click()
//     cy.get('#remove-sauce-labs-backpack').should('contain','Remove')
//     cy.get('.shopping_cart_badge').should('exist').should('contain','1')
// })

Cypress.Commands.add('RemoveItem',() => {
    cy.get('.inventory_item_name').contains('Sauce Labs Backpack').click()
    cy.get('#remove-sauce-labs-backpack').click()
    cy.get('#add-to-cart-sauce-labs-backpack').should('contain','Add to cart')
    cy.get('.shopping_cart_badge').should('not.exist')
    cy.get('#shopping_cart_container').click()
    cy.get('.inventory_item_name').should('not.exist')
    cy.get('#continue-shopping').click()
})

Cypress.Commands.add('RemoveItemonCart',() => {
    cy.get('#remove-sauce-labs-backpack').click()
    cy.get('.inventory_item_name').should('not.exist')
    cy.get('#continue-shopping').click()
})

Cypress.Commands.add('Checkout',() => {
    cy.get('#checkout').click()
    cy.get('span.title').should('contain','Checkout: Your Information')
})

Cypress.Commands.add('CancelCheckoutInformation',() => {
    cy.get('#cancel').click()
    cy.get('span.title').should('contain','Your Cart')
    cy.get('#continue-shopping').click()
})

// Checkout Information
Cypress.Commands.add('InfoFirstnNameEmpty',(lastname,postal) => {
    cy.get('#first-name').clear()
    cy.get('#last-name').clear()
    cy.get('#last-name').type(lastname)
    cy.get('#postal-code').clear()
    cy.get('#postal-code').type(postal)
    cy.get('#continue').click()
    cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Error: First Name is required')
})

Cypress.Commands.add('InfoLastNameEmpty',(firstname,postal) => {
    cy.get('#first-name').type(firstname)
    cy.get('#last-name').clear()
    cy.get('#postal-code').clear()
    cy.get('#postal-code').type(postal)
    cy.get('#continue').click()
    cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Error: Last Name is required')
})

Cypress.Commands.add('InfoPostalEmpty',(firstname,lastname) => {
    cy.get('#first-name').type(firstname)
    cy.get('#last-name').clear()
    cy.get('#last-name').type(lastname)
    cy.get('#postal-code').clear()
    cy.get('#continue').click()
    cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Error: Postal Code is required')
})


Cypress.Commands.add('CheckoutInfo',(firstname,lastname,postal) => {
    cy.get('#first-name').clear()
    cy.get('#first-name').type(firstname)
    cy.get('#last-name').clear()
    cy.get('#last-name').type(lastname)
    cy.get('#postal-code').clear()
    cy.get('#postal-code').type(postal)
    cy.get('#continue').click()
    cy.get('span.title').should('contain','Checkout: Overview')
    cy.get('.summary_info_label').contains('Payment Information')
})

Cypress.Commands.add('CancelCheckoutOverview',() => {
    cy.get('#cancel').click()
    cy.get('span.title').should('contain', 'Products')
})

Cypress.Commands.add('FinishCheckoutOverview',() => {
    cy.get('#finish').click()
    cy.get('.complete-header').contains('Thank you for your order!')
})

Cypress.Commands.add('BackHome',() => {
    cy.get('#back-to-products').click()
    cy.get('span.title').should('contain', 'Products')
})

Cypress.Commands.add('AllItems',() => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#inventory_sidebar_link').click()
    cy.get('#react-burger-cross-btn').click()
    cy.get('span.title').should('contain', 'Products')
    cy.wait(5000)
})

Cypress.Commands.add('About',() => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#about_sidebar_link').click()
    cy.url().should('include', 'https://saucelabs.com/')

})

Cypress.Commands.add('Reset',() => {
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#react-burger-menu-btn').click()
    cy.get('#reset_sidebar_link').click()
    cy.get('#react-burger-cross-btn').click()
    // cy.get('#add-to-cart-sauce-labs-backpack').should('contain', 'Add to cart')
    cy.get('.shopping_cart_badge').should('not.exist')
})

Cypress.Commands.add('Logout',() => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    cy.get('#login-button').should('exist')
})
