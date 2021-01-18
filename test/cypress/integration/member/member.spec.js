/// <reference types="cypress" />

context('Member', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('Test create member', () => {
    cy.getByTestId('button-create').click()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/create.html')
    })

    cy.getByTestId('textfield-name').should('be.exist').should('be.value', '')

    cy.getByTestId('label-name').then((element) => {
      expect(element.closest('.c-textfield').hasClass('is-dirty')).to.be.false
    })

    cy.getByTestId('textfield-name').type('matheus')

    cy.getByTestId('label-name').then((element) => {
      expect(element.closest('.c-textfield').hasClass('is-dirty')).to.be.true
    })

    cy.getByTestId('textfield-name').clear().type('matheus azambuja')

    cy.getByTestId('textfield-email').clear().type('matheus@')
    cy.getByTestId('message-email').should('be.text', 'E-mail inválido')
    cy.getByTestId('textfield-email').clear().type('matheus@matheus.com')
    cy.getByTestId('message-email').should('be.text', '')

    cy.getByTestId('textfield-cpf').clear().type('123456789')
    cy.getByTestId('message-cpf').should('be.text', 'Digite um CPF válido')
    cy.getByTestId('textfield-cpf').clear().type('12345678909')
    cy.getByTestId('message-cpf').should('be.text', '')

    cy.getByTestId('textfield-phone').clear().type('189')
    cy.getByTestId('message-phone').should('be.text', 'Telefone inválido')
    cy.getByTestId('textfield-phone').clear().type('18912344321')
    cy.getByTestId('message-phone').should('be.text', '')

    cy.getByTestId('submit')
      .then((element) => {
        expect(element.hasClass('c-textfield--disabled')).to.be.false
      })
      .click()

    // cy.getByTestId('submit').should('be.not.disabled').click()
    cy.wait(1000)

    cy.getByTestId('toast-message').should('be.text', 'Membro criado com sucesso!')
    cy.getByTestId('toast-close').should('be.exist').click().wait(2000).should('be.not.exist')
  })

  it('Test update member', () => {
    cy.getByTestId('link-edit').first().click()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/update.html')
      expect(location.search).to.eq('?email=myemail1@test.com.br')
    })
    cy.getByTestId('textfield-name').should('be.value', 'My name 1')
    cy.getByTestId('message-name').should('be.text', 'Nome inválido')

    cy.getByTestId('textfield-email').should('be.disabled')
    // cy.getByTestId('submit').should('be.disabled')

    cy.getByTestId('textfield-name').clear().type('matheus azambuja')

    cy.getByTestId('submit')
      .then((element) => {
        expect(element.hasClass('c-textfield--disabled')).to.be.false
      })
      .click()
    // cy.getByTestId('submit').should('be.not.disabled').click()

    cy.wait(1000)
    cy.getByTestId('toast-message').should('be.text', 'Dados atualizados com sucesso!')
    cy.getByTestId('toast-close').should('be.exist').click().wait(2000).should('be.not.exist')
  })

  it('Test remove member', () => {
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/index.html')
    })

    cy.getByTestId('link-remove').first().click()
    cy.wait(1000)
    cy.getByTestId('toast-message').should('be.text', 'Membro excluido!')
    cy.getByTestId('toast-close').should('be.exist').click().wait(1000).should('be.not.exist')
  })
})
