const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { assert } = require('console')


const user = {
  name: 'Matti Luukkainen',
  username: 'mluukkai',
  password: 'salainen'
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: user
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('loginForm')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, user.username, user.password)
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, user.username, 'väärä')
      await expect(page.getByText('wrong credentials')).toBeVisible()
      await expect(page.getByText('create new')).not.toBeVisible();
    })
  })

  describe('When logged in', () => {
    const newBlog = { title: 'title', author: 'author', url: 'url' }

    beforeEach(async ({ page }) => {
      loginWith(page, user.username, user.password)
      await createBlog(page, newBlog)
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText(`${newBlog.title} ${newBlog.author}`)).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be removed', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept());

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText(`${newBlog.title} ${newBlog.author}`)).not.toBeVisible();
    })

    test('Only the user who added the blog can remove it', async ({ page, request }) => {
      await page.getByRole('button', { name: 'logout' }).click()

      const newUser = {
        name: 'Testi',
        username: 'testi',
        password: 'salasana'
      }
    
      await request.post('http://localhost:3003/api/users', {
        data: newUser
      })

      loginWith(page, newUser.username, newUser.password)
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('The blogs are shown in the order of likes', async ({ page, request }) => {
      const newNewBlog = { title: 'new title', author: 'new author', url: 'new url' }

      await createBlog(page, newNewBlog)
      const views = await page.getByRole('button', { name: 'view' }).all()

      await views[1].click()
      await page.getByRole('button', { name: 'like' }).click()

      const texts = await page.getByTestId('main-text').all()
      await expect(texts[0]).toHaveText(`${newNewBlog.title} ${newNewBlog.author}`)
    })
  })
})

// blogin liketys ei toimi, jatka tästä
//getByRole('button', { name: 'remove' })
