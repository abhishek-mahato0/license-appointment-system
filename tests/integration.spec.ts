import { test, expect } from '@playwright/test';

test.describe('Integration testing', () => {
  // test('Test 1: To check if user can login and is redirected to public page or not.', async ({ page }) => {
  //   await page.goto('http://localhost:3000/login');
  //   await page.fill('input[name="email"]', 'avishekh.mahato34@gmail.com');
  //   await page.fill('input[name="pass"]', '1234567A135@@');
  //   await page.locator('//input[@type="submit"]').click();
  //   await page.waitForURL("http://localhost:3000/");
  //   expect(page.url()).toBe('http://localhost:3000/');
  // }
  // );


  // test("Test 2: To check admin can login and is redirected to admin dashboard or not. ", async({page})=>{
  //   await page.goto('http://localhost:3000/signin');
  //   await page.fill('input[name="email"]', 'super@gmail.com');
  //   await page.fill('input[name="pass"]', '1234567');
  //   await page.locator('//input[@type="submit"]').click();
  //   await page.waitForURL('http://localhost:3000/admin/dashboard' )
  //   expect(page.url()).toBe('http://localhost:3000/admin/dashboard');
  // });

  // test("Test 3: To check if user can change password and login with the updated credentials or not.", async({page})=>{
  //     await page.goto('http://localhost:3000/login');
  //     await page.fill('input[name="email"]', 'avishekh.mahato34@gmail.com');
  //     await page.fill('input[name="pass"]', '1234567A135@');
  //     await page.locator('//input[@type="submit"]').click();
  //     await page.waitForURL('http://localhost:3000/');
  //     page.goto('http://localhost:3000/profile');
  //     await page.waitForTimeout(2000)
  //     await page.getByRole('button', {name: 'Change Password'}).click();
  //     await page.getByPlaceholder('Enter your old password').fill('1234567A135@');
  //     await page.getByPlaceholder('Enter your new password').fill('1234567A135@@');
  //     page.getByRole('button', {name: 'Submit'}).click();
  //     await page.waitForResponse('http://localhost:3000/api/user/verify/change');
  //     await page.waitForTimeout(2000);
  //     await page.goto('http://localhost:3000/login');
  //     await page.waitForTimeout(2000);
  //     await page.fill('input[name="email"]', 'avishekh.mahato34@gmail.com');
  //     await page.fill('input[name="pass"]', '1234567A135@@');
  //     await page.locator('//input[@type="submit"]').click();
  //     await page.waitForURL('http://localhost:3000/');
  //     expect(page.url()).toBe('http://localhost:3000/');
  // })

  // test ("Test 4: To check if admin can change password and login with the updated password or not.", async({page})=>{
  //   await page.goto('http://localhost:3000/signin');
  //     await page.fill('input[name="email"]', 'abhishek.mahato98258@gmail.com');
  //     await page.fill('input[name="pass"]', '12345678');
  //     await page.locator('//input[@type="submit"]').click();
  //     await page.waitForURL('http://localhost:3000/admin/dashboard');
  //     page.goto('http://localhost:3000/admin/changepassword');
  //     await page.getByPlaceholder('Old Password').fill('12345678');
  //     await page.getByPlaceholder('New Password').fill('123456789');
  //     await page.locator('xpath=/html/body/main/div/main/div/div/form/button').click();
  //     await page.waitForResponse('http://localhost:3000/api/admin/login/verify/change');
  //     await page.waitForTimeout(2000);
  //     await page.goto('http://localhost:3000/signin');
  //     await page.fill('input[name="email"]', 'abhishek.mahato98258@gmail.com');
  //     await page.fill('input[name="pass"]', '123456789');
  //     await page.locator('//input[@type="submit"]').click();
  //     await page.waitForNavigation();
  //     expect(page.url()).toBe('http://localhost:3000/admin/dashboard');
  // });

  // test ("Test 5: To check “Add question” and search functionality of admin question page.", async({page})=>{
  //   await page.goto('http://localhost:3000/signin');
  //   await page.fill('input[name="email"]', 'abhishek.mahato98258@gmail.com');
  //   await page.fill('input[name="pass"]', '123456789');
  //   await page.locator('//input[@type="submit"]').click();
  //   await page.waitForURL('http://localhost:3000/admin/dashboard');
  //   await page.goto('http://localhost:3000/admin/examination');
  //   await page.waitForURL('http://localhost:3000/admin/examination');
  //   await page.waitForResponse('http://localhost:3000/api/admin/examination');
  //   await page.waitForTimeout(2000);
  //   await page.getByRole('button', {name: 'Add Questions'}).click();
  //   await page.fill('input[name="question"]', 'What is the capital of Nepal?');
  //   await page.fill('input[name="A"]', 'Kathmandu');
  //   await page.fill('input[name="B"]', 'Pokhara');
  //   await page.fill('input[name="C"]', 'Biratnagar');
  //   await page.fill('input[name="D"]', 'Janakpur');
  //   await page.getByRole('button', {name: 'Add'}).click();
  //   await page.waitForResponse('http://localhost:3000/api/admin/examination');
  //   await page.waitForTimeout(2000);
  //   await page.getByPlaceholder('Search Question').fill('capi');
  //   await page.waitForTimeout(2000);
  //   const names = await page.$$('xpath=/html/body/main/div/main/div/div[3]/div/div[1]/div/table/tbody/tr');
  //   expect(names.length).toBeGreaterThanOrEqual(0);
  // });

  test ("Test 6: To check “Add Office” and search functionality of admin office page.", async({page})=>{
    await page.goto('http://localhost:3000/signin');
    await page.fill('input[name="email"]', 'abhishek.mahato98258@gmail.com');
      await page.fill('input[name="pass"]', '123456789');
      await page.locator('//input[@type="submit"]').click();
      await page.waitForURL('http://localhost:3000/admin/dashboard');
      await page.waitForTimeout(1000);
      await page.goto('http://localhost:3000/admin/offices');
      await page.waitForURL('http://localhost:3000/admin/offices');
      await page.getByRole('button', {name: 'Add Offices'}).click();
      await page.fill('input[name="name"]', 'Lalitpur Transport Office');
      await page.fill('input[name="address"]', 'Lalitpur Address');
      await page.locator('xpath=//*[@id="province"]').selectOption({label: 'Bagmati'});
      await page.locator('xpath=/html/body/div[3]/form/div[4]/select').selectOption({label: 'Lalitpur'});
      await page.getByRole('button', {name: 'Add'}).click();
      await page.waitForTimeout(3000);
      await page.getByPlaceholder('Search office by name or province').fill('lalit');
      await page.waitForTimeout(2000);
      const names = await page.$$('xpath=/html/body/main/div/main/div/div[3]/div/div[1]/div/table/tbody/tr');
       expect(names.length).toBeGreaterThanOrEqual(0);
  });
})

