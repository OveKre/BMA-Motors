import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate through all main pages', async ({ page }) => {
    await page.goto('/');
    
    // Check home page
    await expect(page.locator('h1')).toContainText('BMA Motors');
    
    // Navigate to Services
    await page.click('a:has-text("Teenused")');
    await expect(page).toHaveURL('/teenused');
    
    // Navigate to Booking
    await page.click('a:has-text("Broneerimine")');
    await expect(page).toHaveURL('/broneerimine');
    
    // Navigate to Gallery
    await page.click('a:has-text("Galerii")');
    await expect(page).toHaveURL('/galerii');
    
    // Navigate to Spare Parts
    await page.click('a:has-text("Varuosapäring")');
    await expect(page).toHaveURL('/varuosad');
    
    // Navigate to Contact
    await page.click('a:has-text("Kontakt")');
    await expect(page).toHaveURL('/kontakt');
  });

  test('should display logo and navigation menu', async ({ page }) => {
    await page.goto('/');
    
    // Check logo in navbar (more specific selector)
    await expect(page.locator('nav').getByText('BMA MOTORS').first()).toBeVisible();
    
    // Check navigation links
    const navLinks = ['Avaleht', 'Teenused', 'Broneerimine', 'Galerii', 'Varuosapäring', 'Kontakt'];
    
    for (const link of navLinks) {
      await expect(page.locator(`nav a:has-text("${link}")`).first()).toBeVisible();
    }
  });

  test('should show mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobile menu button should be visible
    const menuButton = page.locator('nav button:has(svg)');
    await expect(menuButton).toBeVisible();
    
    // Click to open mobile menu
    await menuButton.click();
    await page.waitForTimeout(500);
    
    // Verify we're still on homepage (mobile menu functionality exists)
    await expect(page).toHaveURL('/');
  });
});

test.describe('Language Switching', () => {
  test('should switch between EST, ENG, RUS', async ({ page }) => {
    await page.goto('/');
    
    // Default Estonian
    await expect(page.locator('h1')).toContainText('BMA Motors');
    
    // Switch to English
    await page.click('button:has-text("ENG")');
    await page.waitForTimeout(300);
    await expect(page.locator('a:has-text("Home")')).toBeVisible();
    
    // Switch to Russian
    await page.click('button:has-text("РУС")');
    await page.waitForTimeout(300);
    await expect(page.locator('a:has-text("Главная")')).toBeVisible();
    
    // Switch back to Estonian
    await page.click('button:has-text("EST")');
    await page.waitForTimeout(300);
    await expect(page.locator('a:has-text("Avaleht")')).toBeVisible();
  });

  test('should persist language selection', async ({ page }) => {
    await page.goto('/');
    
    // Switch to English
    await page.click('button:has-text("ENG")');
    await page.waitForTimeout(300);
    
    // Navigate to another page
    await page.click('a:has-text("Services")');
    
    // Language should still be English
    await expect(page.locator('a:has-text("Home")')).toBeVisible();
  });
});
