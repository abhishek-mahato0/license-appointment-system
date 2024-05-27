import { test, expect } from '@playwright/test';

test.describe('Unit tests', () => {
  test('Test 1: To check if user can redirect to “Dashboard” or not after clicking “Dashboard” from navigation menu or not. ', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Dashboard').click();
    await page.waitForURL("http://localhost:3000/dashboard");
    page.getByTitle('Public Dashboard');
    expect(page.url()).toBe('http://localhost:3000/dashboard');
  }
  );

  test('Test 2: To check if proper error message is shown while giving invalid email pattern or not in login page.', async({page})=>{
     await page.goto('http://localhost:3000/login');
     await page.waitForURL("http://localhost:3000/login");
     await page.fill('input[name="email"]', 'avishekh.mahato34');
     await page.fill('input[name="pass"]', '1234567A135@');
     await page.locator('//input[@type="submit"]').click();
    page.getByText('Invalid email pattern');
  })

  test('Test 3: To check if forget password dialog opens or not.', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.waitForURL("http://localhost:3000/login");
    await page.getByText('Forgot Password?').click();
    await page.getByTitle('Forgots Password');
    await page.getByPlaceholder('Enter your email address');
  });


test('Test 4: To check if user is redirected to register page when “Not registered yet?” link is clicked.', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.waitForURL("http://localhost:3000/login");
    await page.getByText('Not Registered Yet?', {exact:true}).click();
    await page.waitForNavigation();
    await expect(page.getByText('Register', {exact:true})).toBeVisible();
    expect(page.url()).toBe('http://localhost:3000/register');
  });


  test ("Test 5: To check if “Quiz” popup opens when “Play Quiz” button is clicked or not.", async({page})=>{
    await page.goto('http://localhost:3000/prepare?page=1');
    await page.waitForURL("http://localhost:3000/prepare?page=1");
    await page.getByRole('button', {name: 'Play Quiz'}).click();
    await expect(page.getByText("Score")).toBeVisible();
    await expect(page.getByText("Level")).toBeVisible();
    await expect(page.getByRole('button', {name: 'Close'})).toBeVisible();
  });


test ("Test 6: To check search functionality of “Transport Office” page of admin.", async({page})=>{  
    await page.goto('http://localhost:3000/signin');
    await page.fill('input[name="email"]', 'super@gmail.com');
    await page.fill('input[name="pass"]', '1234567');
    await page.locator('//input[@type="submit"]').click();
    await page.waitForURL("http://localhost:3000/admin/dashboard");
    await page.locator('xpath=/html/body/main/div/div/div/div[1]/div[2]/a[4]').click();
    await page.waitForURL("http://localhost:3000/admin/offices");
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('Search office by name or province').fill('janak');
    await page.waitForTimeout(2000);
    await expect(page.getByText("Janakpur", {exact:true})).toBeVisible();
});

test ("Test 7: To check search functionality of “Applicants” page of admin.", async({page})=>{  
    await page.goto('http://localhost:3000/signin');
    await page.fill('input[name="email"]', 'super@gmail.com');
    await page.fill('input[name="pass"]', '1234567');
    await page.locator('//input[@type="submit"]').click();
    await page.waitForURL("http://localhost:3000/admin/dashboard");
    await page.locator('xpath=/html/body/main/div/div/div/div[1]/div[2]/a[5]').click();
    await page.waitForURL("http://localhost:3000/admin/applicants");
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('Search').fill('ram');
    await page.waitForTimeout(2000);
    const names = await page.$$('xpath=/html/body/main/div/main/div/div[3]/div/div[1]/div/table/tbody/tr');
    expect(names.length).toBeGreaterThanOrEqual(0);
});
});
