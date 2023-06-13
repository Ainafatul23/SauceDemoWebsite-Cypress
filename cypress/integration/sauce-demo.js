/// <reference types="cypress" />

describe('Sauce Demo', () => {

    it('Visit the website', () => {
        cy.visit('https://www.saucedemo.com/')

    });

    //LOGIN
    it('Verify User Cant Leaving Username Field Empty', () => {
        cy.fixture("login").then(unRequired => {
            const invalid = unRequired.invalid
            cy.EmptyUsernameLogin(invalid)
            
        });
        cy.wait(5000)

        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Epic sadface: Username is required')
    });

    it('Verify User Cant Leaving Password Field Empty', () => {
        cy.fixture("login").then(unRequired => {
            const invalid = unRequired.invalid
            cy.EmptyPasswordLogin(invalid)
            
        });
        cy.wait(5000)

        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Epic sadface: Password is required')
    });

    it('Verify user cant input invalid username', () => {
        cy.fixture("login").then(invalidData => {
            const username = invalidData.invalid
            const password = invalidData.password

            cy.Login(username,password)
        })
        cy.wait(5000)

        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Verify user cant input invalid password', () => {
        cy.fixture("login").then(invalidData => {
            const username = invalidData.standard
            const password = invalidData.invalid

            cy.Login(username,password)
        })
        cy.wait(5000)

        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Verify user cant login using locked out user', () => {
        cy.fixture("login").then(locked => {
            const username = locked.locked_out
            const password = locked.password

            cy.Login(username,password)
        })
        cy.wait(5000)

        cy.get('div').should('have.class', 'error-message-container error').and('contain', 'Epic sadface: Sorry, this user has been locked out.')
    });

    it('Verify user can login with problem user', () => {
        cy.fixture("login").then(user => {
            const username = user.problem
            const password = user.password

            cy.Login(username,password)
        })
        cy.wait(5000)

        cy.get('span.title').should('contain', 'Products')

        cy.Logout()
    });

    it('Verify user can login using performance_glitch_user user', () => {
        cy.fixture("login").then(user => {
            const username = user.performance
            const password = user.password

            cy.Login(username,password)
        })
        cy.wait(7000)

        cy.get('span.title').should('contain', 'Products')
        cy.Logout()
    });

    it('Verify user can login with standard user', () => {
        cy.fixture("login").then(user => {
            const username = user.standard
            const password = user.password

            cy.Login(username,password)
        })
        cy.wait(5000)

        cy.get('span.title').should('contain', 'Products')
    });

    //FILTER

    it('Verify user can using filter by price (High to Low)', () => {
        cy.fixture("filter").then(filter => {
            const SelectFilter = filter.hilo

            cy.Filter(SelectFilter)
        })
        cy.get('div.inventory_item_price').should('contain', '$49.99');

    });

    it('Verify user can using filter by price (Low to High)', () => {
        cy.fixture("filter").then(filter => {
            const SelectFilter = filter.lohi

            cy.Filter(SelectFilter)
        })
        cy.get('div.inventory_item_price').should('contain', '$7.99');

    });

    it('Verify user can using filter by name (Z to A)', () => {
        cy.fixture("filter").then(filter => {
            const SelectFilter = filter.za

            cy.Filter(SelectFilter)
        })
        cy.get('div.inventory_item_name').should('contain', 'Test.allTheThings() T-Shirt (Red)');

    });

    it('Verify user can using filter by name (A to Z)', () => {
        cy.fixture("filter").then(filter => {
            const SelectFilter = filter.az

            cy.Filter(SelectFilter)
        })
        cy.get('div.inventory_item_name').should('contain', 'Sauce Labs Backpack');

    });

    //CART

    it('Verify user can add product to cart', () => {
        cy.AddCart()
        cy.get('#continue-shopping').click()
    });

    it('Verify user can remove product after add product to cart', () => {
        cy.AddCart()
        cy.RemoveItem()
    });

    it('Verify user can Remove product on cart', () => {
        cy.AddCart()
        cy.RemoveItemonCart()
    });

    //CHECKOUT
    it('Verify user can checkout the products on cart', () => {
        cy.AddCart()
        cy.Checkout()
    });

    it('Verify user can cancel checkout information activity', () => {
        cy.CancelCheckoutInformation()
    });

    it('Verify user cant leaving first name field empty', () => {
        cy.AddCart()
        cy.Checkout()
        cy.fixture("checkout").then(checkout => {
            const lastname = checkout.lastname
            const postal = checkout.postal

            cy.InfoFirstnNameEmpty(lastname,postal)

        })
    });

    it('Verify user cant leaving lastname name field empty', () => {
        // cy.AddCart()
        // cy.Checkout()
        cy.fixture("checkout").then(checkout => {
            const firstname = checkout.firstname
            const postal = checkout.postal

            cy.InfoLastNameEmpty(firstname,postal)

        })
    });

    it('Verify user cant leaving postal code field empty', () => {
        // cy.AddCart()
        // cy.Checkout()
        cy.fixture("checkout").then(checkout => {
            const firstname = checkout.firstname
            const lastname = checkout.lastname
            
            cy.InfoPostalEmpty(firstname,lastname)

        })
    });

    it('Verify user can input valid information data on checkout information page', () => {
        // cy.AddCart()
        // cy.Checkout()
        cy.fixture("checkout").then(checkout => {
            const firstname = checkout.firstname
            const lastname = checkout.lastname
            const postal = checkout.postal
            
            cy.CheckoutInfo(firstname,lastname,postal)

        })
    });

    it('Verify user can cancel checkout overview page', () => {
        cy.CancelCheckoutOverview()
    });

    it('Verify user can make a payment', () => {
        cy.AddCart()
        cy.Checkout()
        cy.fixture("checkout").then(checkout => {
            const firstname = checkout.firstname
            const lastname = checkout.lastname
            const postal = checkout.postal
            
            cy.CheckoutInfo(firstname,lastname,postal)

        })
        cy.FinishCheckoutOverview()
    });

    it('Verify user can back to dashboard after make a payment', () => {
        cy.BackHome()
    });



    //SIDEBAR

    it('Verify user can click All Items', () => {
        cy.AllItems()
    });

    // it('Verify user can click About', () => {
    //     cy.About()
    // });

    it('Verify user can click Reset App State', () => {
        cy.Reset()
    });

    it('Verify user can click Logout', () => {
        cy.Logout()
    });



})