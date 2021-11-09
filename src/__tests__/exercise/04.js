// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

// allows greater extendability. also accepts overrides by default
const buildLoginForm = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

// function buildLoginForm(overrides) {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//     ...overrides,
//   }
// }

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const {username, password} = buildLoginForm('chucknorris') //If you need a specific override for faker

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByText(/submit/i))

  expect(handleSubmit).toHaveBeenLastCalledWith({
    username,
    password,
  })

  expect(handleSubmit).toBeCalledTimes(1)
  // screen.debug()
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  //
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  //
  // 🐨 click on the button with the text "Submit"
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
