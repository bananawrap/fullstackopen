import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls submitHandler correctly', async () => {

  const controller = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm submitHandler={createBlog} setCreateBlogVisible={true} />)

  const createButton = screen.getByText('create')
  const title = screen.getByLabelText('Title:')
  const author = screen.getByLabelText('Author:')
  const url = screen.getByLabelText('Url:')

  await controller.type(title, 'the title')
  await controller.type(author, 'the author')
  await controller.type(url, 'the url')
  await controller.click(createButton)

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0]).toBe('the title')
  expect(createBlog.mock.calls[0][1]).toBe('the author')
  expect(createBlog.mock.calls[0][2]).toBe('the url')

})
