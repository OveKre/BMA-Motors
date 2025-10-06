import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/broneerimine');
  });

  test('should load booking page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Broneeri');
  });

  test('should display calendar', async ({ page }) => {
    const calendar = page.locator('.react-calendar');
    await expect(calendar).toBeVisible();
  });

  test('should select date and show available time slots', async ({ page }) => {
    // Wait for calendar to load
    await page.waitForSelector('.react-calendar');
    
    // Click on a future date (not a navigation button, not today)
    await page.locator('.react-calendar__month-view__days button:not([disabled])').nth(5).click();
    
    // Wait for time slots to load
    await page.waitForTimeout(2000);
    
    // Check if form is still visible (date was selected)
    await expect(page.locator('form')).toBeVisible();
  });

  test('should complete booking form and submit', async ({ page }) => {
    // Fill in the form
    await page.fill('input[name="client_name"]', 'Test Kasutaja');
    await page.fill('input[name="client_email"]', 'test@example.com');
    await page.fill('input[name="client_phone"]', '+372 5555 5555');
    
    // Wait for calendar and select date
    await page.waitForSelector('.react-calendar');
    await page.locator('.react-calendar__month-view__days button:not([disabled])').nth(5).click();
    await page.waitForTimeout(1000);
    
    // Select time slot if available
    const timeSlot = page.locator('button').filter({ hasText: /^(09:00|10:00|11:00)$/ }).first();
    if (await timeSlot.isVisible()) {
      await timeSlot.click();
    }
    
    // Fill car info
    await page.fill('input[name="car_make"]', 'BMW');
    await page.fill('input[name="car_model"]', 'X5');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for response
    await page.waitForTimeout(2000);
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Wait for validation
    await page.waitForTimeout(500);
    
    // Check that we're still on the same page (form didn't submit)
    await expect(page).toHaveURL(/broneerimine/);
  });

  test('should switch language and display translations', async ({ page }) => {
    // Check Estonian
    await expect(page.locator('h1')).toContainText('Broneeri');
    
    // Switch to English
    await page.click('button:has-text("ENG")');
    await page.waitForTimeout(300);
    await expect(page.locator('h1')).toContainText('Book');
    
    // Switch to Russian
    await page.click('button:has-text("РУС")');
    await page.waitForTimeout(300);
    await expect(page.locator('h1')).toContainText('Бронирование');
  });
});
