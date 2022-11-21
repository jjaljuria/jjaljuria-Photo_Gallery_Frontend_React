describe('Login', () => {
	it('should http://localhost:3000 open', () => {
		cy.visit('localhost:3000/#/')
	})

	it('should exists link Login', () => {
		cy.visit('localhost:3000/#/')
		cy.contains('Login')
	})

	it('should redirect link Login to "http://localhost:3000/#/login"', () => {
		cy.visit('localhost:3000/#/')
		cy.contains('Login').click()
		cy.contains('Correo')
		cy.contains('Contraseña')
	})

	describe('Login page', () => {
		it('should user can access to http://localhost:3000/#/login', () => {
			cy.visit('http://localhost:3000/#/login')
		})

		it('should user can login', () => {
			cy.visit('localhost:3000/#/')
			cy.contains('Login').click()

			cy.get('[name="email"]').type('josejavieral13@gmail.com')
			cy.get('[name="password"]').type('12345')

			cy.contains('Ingresar').click()
			cy.visit('http://localhost:3000/#/')
			cy.contains('Log out')
		})

		it('should user can login and logout', () => {
			cy.visit('localhost:3000/#/')
			cy.contains('Login').click()

			cy.get('[name="email"]').type('josejavieral13@gmail.com')
			cy.get('[name="password"]').type('12345')

			cy.contains('Ingresar').click()
			cy.visit('http://localhost:3000/#/')
			cy.contains('Log out').click()
			cy.contains('Login')
		})

		it('should user back at user page', () => {
			cy.visit('localhost:3000/#/jjaljuria')
			cy.contains('Login').click()

			cy.get('[name="email"]').type('josejavieral13@gmail.com')
			cy.get('[name="password"]').type('12345')

			cy.contains('Ingresar').click()
			cy.contains('Log out')
			cy.contains('jjaljuria')
		})
	})
})
