const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://oalmhage.github.io/todoMVC/');
});

test('add a single todo', async ({ page }) => {
  
  let newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Eat a bag of chips');
  await newTodo.press('Enter');

  let todoText = await page.locator('.checklist p').textContent();
  expect(todoText).toEqual('Eat a bag of chips');
});

test('add one todo, check it and confirm that counter turns to zero ', async ({ page }) => {
  
  let newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Snuggle Baby Yoda');
  await newTodo.press('Enter');

  let todoText = await page.locator('.checklist p').textContent();
  expect(todoText).toEqual('Snuggle Baby Yoda');

  let checkbox = await page.locator('.li-checkbox');
  await checkbox.click();
  await expect (page.locator('.counter')).toHaveText('0 Items left')

});

test('add three todos, check one and confirm that counter turns to two', async ({ page }) => {
  
  let newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Ask Sauron for advice');
  await newTodo.press('Enter');
  await newTodo.fill('Visit Brad Pitt in Hollywood');
  await newTodo.press('Enter');
  await newTodo.fill('Clean my bathroom');
  await newTodo.press('Enter');

  let checkbox = await page.locator('.li-checkbox').first();
  await checkbox.click();
  await expect (page.locator('.counter')).toHaveText('2 Items left')

});

