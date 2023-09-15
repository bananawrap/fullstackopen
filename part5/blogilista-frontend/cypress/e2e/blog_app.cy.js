describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      'username': 'tester',
      'name': 'tester',
      'password': 'cypress'
    })
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('cypress')
      cy.get('#login-submit').click()
      cy.contains('logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrongpass')
      cy.get('#login-submit').click()
      cy.contains('login')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('cypress')
      cy.get('#login-submit').click()
    })
    it('A blog can be created', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('cool blog')
      cy.get('#author').type('cool author')
      cy.get('#url').type('coolblogs.com')
      cy.get('#blog-submit').click()
      cy.contains('cool blog')
    })
    describe('When a blog is created', function() {
      beforeEach(function() {
        cy.get('#new-blog').click()
        cy.get('#title').type('cool blog')
        cy.get('#author').type('cool author')
        cy.get('#url').type('coolblogs.com')
        cy.get('#blog-submit').click()
        cy.contains('cool blog')
      })

      it('it can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1')
      })
      it('it can be removed', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.reload()
        cy.contains('cool blog').should('not.exist')
      })
      it('another account cannot remove it', function() {
        cy.request('POST', 'http://localhost:3001/api/users', {
          'username': 'tester2',
          'name': 'tester2',
          'password': 'cypress'
        })
        cy.contains('logout').click()
        cy.contains('login').click()
        cy.get('#username').type('tester2')
        cy.get('#password').type('cypress')
        cy.get('#login-submit').click()
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
      it('blogs are sorted correctly', function() {
        cy.contains('view').click()
        for (let i = 0; i < 11; i++) {
          cy.contains('like').click()
        }
        cy.get('#new-blog').click()
        cy.get('#title').type('boring blog')
        cy.get('#author').type('meh author')
        cy.get('#url').type('lameblogs.com')
        cy.get('#blog-submit').click()
        cy.get('.blogs').first().should('contain', 'cool blog')
        cy.get('.blogs').last().should('contain', 'boring blog')
      })
    })
  })
})
