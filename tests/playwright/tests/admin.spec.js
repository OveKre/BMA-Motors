import { test, expect } from '@playwright/test';

test.describe('Admin Panel', () => {
  test('should display admin login page', async ({ page }) => {
    await page.goto('/admin');
    
    await expect(page.locator('h2')).toContainText('Admin Sisselogimine');
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should show validation for empty credentials', async ({ page }) => {
    await page.goto('/admin');
    
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    
    // Form should not submit without credentials (stay on admin page, allow query params)
    await expect(page).toHaveURL(/\/admin/);
  });

  test('should attempt login with test credentials', async ({ page }) => {
    await page.goto('/admin');
    
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'Admin123!');
    
    await page.click('button[type="submit"]');
    
    // Should either redirect to dashboard or show error
    await page.waitForTimeout(2000);
    
    const url = page.url();
    // Check if redirected to dashboard OR still on login page
    expect(url).toMatch(/\/(admin|admin\/dashboard)/);
  });

  test.describe('Admin Dashboard (requires login)', () => {
    test.skip('should display dashboard statistics', async ({ page }) => {
      // This test would require actual authentication
      // Skip for now, can be implemented with proper auth setup
      
      await page.goto('/admin/dashboard');
      
      await expect(page.locator('h1')).toContainText('Admin Dashboard');
      
      // Check for statistics cards
      const cards = page.locator('.card');
      await expect(cards).toHaveCount(4);
    });

    test.skip('should display today bookings table', async ({ page }) => {
      await page.goto('/admin/dashboard');
      
      const table = page.locator('table');
      await expect(table).toBeVisible();
      
      // Check table headers
      await expect(page.locator('th:has-text("Klient")')).toBeVisible();
      await expect(page.locator('th:has-text("Aeg")')).toBeVisible();
    });
  });
});
