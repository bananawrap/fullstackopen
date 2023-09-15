import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('only title is shown when blog is minimized', () => {
  const blog = {
    title: 'testing testing...',
    author: 'one two three',
    url: 'one-two-three.com',
    likes: 0,
    user: {
      id: '64dbaebe7eb748e9be224c6d',
      name: 'yeehaw',
      username: 'test'
    }
  }

  const user = {
    id: '64dbaebe7eb748e9be224c6d',
    name: 'yeehaw',
    username: 'test',
    blogs: [blog]
  }


  render(<Blog blog={blog} user={user} triggerUpdate={() => true} />)

  const element = screen.getByText('testing testing...')
})

test('all of the blog information is shown after clicking view button', async () => {

  const blog = {
    title: 'testing testing...',
    author: 'one two three',
    url: 'one-two-three.com',
    likes: 0,
    user: {
      id: '64dbaebe7eb748e9be224c6d',
      name: 'yeehaw',
      username: 'test'
    }
  }

  const user = {
    id: '64dbaebe7eb748e9be224c6d',
    name: 'yeehaw',
    username: 'test',
    blogs: [blog]
  }


  render(
    <Blog blog={blog} user={user} triggerUpdate={() => true} />
  )

  const controller = userEvent.setup()
  const button = screen.getByText('view')
  await controller.click(button)

  const url = screen.getByText('one-two-three.com')
  const likes = screen.getByText('likes 0')
  const author = screen.getByText('one two three')

})

test('clicking like button twice calls handle function twice', async () => {

  const blog = {
    title: 'testing testing...',
    author: 'one two three',
    url: 'one-two-three.com',
    likes: 0,
    user: {
      id: '64dbaebe7eb748e9be224c6d',
      name: 'yeehaw',
      username: 'test'
    }
  }

  const user = {
    id: '64dbaebe7eb748e9be224c6d',
    name: 'yeehaw',
    username: 'test',
    blogs: [blog]
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={user} triggerUpdate={mockHandler} handleUpdate={mockHandler} />
  )

  const controller = userEvent.setup()
  const viewButton = screen.getByText('view')
  await controller.click(viewButton)

  const likeButton = screen.getByText('like')
  await controller.click(likeButton)
  await controller.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
