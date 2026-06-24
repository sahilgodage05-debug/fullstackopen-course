const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Reset database
    await request.post('http://localhost:3003/api/testing/reset')

    // Create a base user
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'testuser',
        password: 'password123',
        name: 'Test User'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown when clicking Login link', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click()
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('link', { name: 'Login' }).click()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('password123')
      await page.getByRole('button', { name: 'Login' }).click()

      // Redirects to blogs list view
      await expect(page.getByText('Test User logged in')).toBeVisible()
      await expect(page.getByText('Blogs List')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('wrongpassword')
      await page.getByRole('button', { name: 'Login' }).click()

      // Shows error notification
      await expect(page.getByText('invalid username or password')).toBeVisible()
      // Stays on Login view
      await expect(page.getByText('Log in to application')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('link', { name: 'Login' }).click()
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('password123')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('link', { name: 'Create New' }).click()

      await page.locator('input[name="Title"]').fill('E2E Router Testing')
      await page.locator('input[name="Author"]').fill('React Router Team')
      await page.locator('input[name="Url"]').fill('https://reactrouter.com')

      await page.getByRole('button', { name: 'Create' }).click()

      // Redirects to blogs list
      await expect(page.getByText('a new blog E2E Router Testing by React Router Team added')).toBeVisible()
      await expect(page.getByText('E2E Router Testing by React Router Team')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        // Create blog from UI
        await page.getByRole('link', { name: 'Create New' }).click()
        await page.locator('input[name="Title"]').fill('E2E blog to test interactions')
        await page.locator('input[name="Author"]').fill('Interactive User')
        await page.locator('input[name="Url"]').fill('https://interactions.com')
        await page.getByRole('button', { name: 'Create' }).click()
        await expect(page.getByText('E2E blog to test interactions by Interactive User')).toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {
        // Navigate to the single blog details view
        await page.getByText('E2E blog to test interactions').click()
        await expect(page.getByText('Likes: 0')).toBeVisible()

        // Like the blog
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('the creator who added the blog can delete it', async ({ page }) => {
        // Navigate to single blog details view
        await page.getByText('E2E blog to test interactions').click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

        // Setup confirm dialog handler
        page.on('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm')
          await dialog.accept()
        })

        // Click remove/delete button
        await page.getByRole('button', { name: 'remove' }).click()

        // Redirects to blogs list, verify it is deleted
        await expect(page.getByText('Blogs List')).toBeVisible()
        await expect(page.getByText('E2E blog to test interactions')).not.toBeVisible()
      })
    })
  })
})
