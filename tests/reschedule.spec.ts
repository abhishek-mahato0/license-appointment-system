import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/login');
});

test.describe('Login', () => {
  test('should login successfully', async ({ page }) => {
    await page.fill('input[name="email"]', 'avishekh.mahato34@gmail.com');
    await page.fill('input[name="pass"]', '1234567A135@');
    await page.locator('//input[@type="submit"]').click();
    await page.waitForNavigation();
    expect(page.url()).toBe('http://localhost:3000/');
    await page.goto('http://localhost:3000/appointments');
    
  }
  );
})
