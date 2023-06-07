/// <reference types="cypress" />

describe('Working with inputs', () => {

    it('Visit the website', () => {
        cy.visit('https://www.saucedemo.com/')

    });

    it('Should Try Cant Leaving Login Field Empty', () => {
        // username
        cy.get('#password').type('invalid password')
        cy.get('#login-button').click()
        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Epic sadface: Username is required')

        cy.wait(5000)
        // Password
        cy.get('#user-name').clear()
        cy.get('#user-name').type('invalid username')
        cy.get('#password').clear()
        cy.get('#login-button').click()
        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Epic sadface: Password is required')
        cy.wait(5000)

    });
    it('Should try to login with invalid data and display error message', () => {
        cy.get('#user-name').clear()
        cy.get('#user-name').type('invalid username')

        cy.get('#password').clear()
        cy.get('#password').type('invalid password')

        cy.get('#login-button').click()

        cy.wait(5000)

        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Epic sadface: Username and password do not match any user in this service')
    });


    it('Should Try Login Valid Data', () => {
        cy.fixture("saucedemo").then(user => {
            const username = user.username
            const password = user.password
            
            cy.get('#user-name').clear()
            cy.get('#user-name').type(username)

            cy.get('#password').clear()
            cy.get('#password').type(password)

            cy.get('#login-button').click()
            
        })
    });

    it('Should Try Filter', () => {
        cy.fixture("saucedemo").then(filter => {
            const selectname = filter.selectname
            cy.get('[data-test="product_sort_container"]').select(selectname)

        })
        
    });

    it('Should Try Add Cart and Checkout', () => {
        
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        
        cy.get('#shopping_cart_container').click()

        cy.get("#checkout").click()
    });

    it('Should Try Cant Leaving Checkout Information Field Empty', () => {
        //firstname
        cy.get('#last-name').type('lastname')
        cy.get('#postal-code').type('7383')
        cy.get('#continue').click()
        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Error: First Name is required')

        cy.wait(5000)

        //lastname
        cy.get('#first-name').type('firstname')
        cy.get('#last-name').clear()
        cy.get('#postal-code').clear()
        cy.get('#postal-code').type('7383')
        cy.get('#continue').click()
        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Error: Last Name is required')

        cy.wait(5000)

        //portal code 
        cy.get('#first-name').clear()
        cy.get('#first-name').type('firstname')
        cy.get('#last-name').clear()
        cy.get('#last-name').type('lastname')
        cy.get('#postal-code').clear()
        cy.get('#continue').click()
        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Error: Postal Code is required')
        cy.wait(5000)

    });

    it('Should Try Add Checkout Information Valid Data', () => {
       cy.fixture("saucedemo").then(checkout => {
        const firstname = checkout.firstname
        const lastname = checkout.lastname
        const zip = checkout.zip

        cy.get('#first-name').clear()
        cy.get('#first-name').type(firstname)

        cy.get('#last-name').clear()
        cy.get('#last-name').type(lastname)

        cy.get('#postal-code').clear()
        cy.get('#postal-code').type(zip)

        cy.get('#continue').click()

        cy.get('#finish').click()

        cy.get('#back-to-products').click()
    })
    });

    it('Should Try Logout', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
    });

    
})