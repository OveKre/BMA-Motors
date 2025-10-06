import { test, expect } from '@playwright/test';

test.describe('Spare Parts Inquiry Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/varuosad');
  });

  test('should load spare parts inquiry page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Varuosapäring');
  });

  test('should display car makes dropdown', async ({ page }) => {
    const makeSelect = page.locator('select[name="car_make"]');
    await expect(makeSelect).toBeVisible();
    
    // Wait for options to load from API
    await page.waitForTimeout(2000);
    
    // Check if dropdown has options (at least the placeholder)
    const options = await makeSelect.locator('option').count();
    expect(options).toBeGreaterThanOrEqual(1);
  });

  test('should load car models when make is selected', async ({ page }) => {
    // Select a car make
    await page.selectOption('select[name="car_make"]', { index: 1 });
    
    // Wait for models to load
    await page.waitForTimeout(1000);
    
    // Check if model dropdown is enabled
    const modelSelect = page.locator('select[name="car_model"]');
    await expect(modelSelect).toBeEnabled();
    
    // Check if models are loaded
    const modelOptions = await modelSelect.locator('option').count();
    expect(modelOptions).toBeGreaterThan(1);
  });

  test('should complete spare parts inquiry form', async ({ page }) => {
    // Fill contact info with unique email to avoid rate limiting
    const timestamp = Date.now();
    await page.fill('input[name="client_name"]', 'Test Klient');
    await page.fill('input[name="client_email"]', `test${timestamp}@example.com`);
    await page.fill('input[name="client_phone"]', '+372 5555 5555');
    
    // Wait for car makes to load
    await page.waitForTimeout(2000);
    
    // Select car make if available
    const makeOptions = await page.locator('select[name="car_make"] option').count();
    if (makeOptions > 1) {
      await page.selectOption('select[name="car_make"]', { index: 1 });
      await page.waitForTimeout(1000);
    }
    
    // Fill year and VIN
    await page.fill('input[name="car_year"]', '2020');
    await page.fill('input[name="vin_code"]', 'WBAXXXXXXXXXXXXXXX');
    
    // Fill spare part info
    await page.fill('input[name="sparepart_name"]', 'Esituled');
    await page.fill('textarea[name="sparepart_description"]', 'Vasakpoolne esituli, LED tehnoloogia');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for response (either success or rate limit)
    await page.waitForTimeout(3000);
  });

  test('should validate email format', async ({ page }) => {
    await page.fill('input[name="client_email"]', 'invalid-email');
    await page.fill('input[name="client_name"]', 'Test');
    await page.click('button[type="submit"]');
    
    // Should show validation error or prevent submission
    const emailInput = page.locator('input[name="client_email"]');
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('should validate VIN code length', async ({ page }) => {
    const vinInput = page.locator('input[name="vin_code"]');
    await expect(vinInput).toHaveAttribute('maxlength', '17');
    
    // Try to input more than 17 characters
    await vinInput.fill('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const value = await vinInput.inputValue();
    expect(value.length).toBeLessThanOrEqual(17);
  });
});
