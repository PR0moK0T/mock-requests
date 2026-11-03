import { test, expect } from '@playwright/test';

const API_URL = 'https://fakestoreapi.com/products';
const cors = { 'access-control-allow-origin': '*' };

test('показывает мок-данные', async ({ page }) => {
  await page.route(API_URL, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: cors,
      body: JSON.stringify([
        { id: 1, title: 'Мок-товар 1', price: 10 },
        { id: 2, title: 'Мок-товар 2', price: 20 },
      ]),
    })
  );

  await page.goto('/');

  await expect(page.locator('#products li')).toHaveCount(2);
  await expect(page.locator('#products li').first()).toContainText('Мок-товар 1');
});

test('показывает ошибку при 403', async ({ page }) => {
  await page.route(API_URL, (route) =>
    route.fulfill({ status: 403, headers: cors, body: 'Forbidden' })
  );

  await page.goto('/');

  await expect(page.locator('#error')).toHaveText('Ошибка 403: доступ запрещён');
});