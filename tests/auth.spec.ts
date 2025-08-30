import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login form elements', async ({ page }) => {
    // Check if all login form elements are present
    await expect(page.getByTestId('login-username-input')).toBeVisible();
    await expect(page.getByTestId('login-password-input')).toBeVisible();
    await expect(page.getByTestId('login-remember-checkbox')).toBeVisible();
    await expect(page.getByTestId('forgot-password-link')).toBeVisible();
    await expect(page.getByTestId('login-submit-button')).toBeVisible();
  });

  test('should login successfully with admin credentials', async ({ page }) => {
    // Fill in admin credentials
    await page.getByTestId('login-username-input').fill('admin');
    await page.getByTestId('login-password-input').fill('password');
    
    // Click login button
    await page.getByTestId('login-submit-button').click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should login successfully with student credentials', async ({ page }) => {
    // Fill in student credentials
    await page.getByTestId('login-username-input').fill('student');
    await page.getByTestId('login-password-input').fill('student123');
    
    // Click login button
    await page.getByTestId('login-submit-button').click();
    
    // Should redirect to student dashboard
    await expect(page).toHaveURL('/student-dashboard');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Fill in invalid credentials
    await page.getByTestId('login-username-input').fill('invalid');
    await page.getByTestId('login-password-input').fill('invalid');
    
    // Click login button
    await page.getByTestId('login-submit-button').click();
    
    // Should show error toast
    await expect(page.getByText('Login failed')).toBeVisible();
  });

  test('should remember me checkbox work', async ({ page }) => {
    const rememberCheckbox = page.getByTestId('login-remember-checkbox');
    
    // Initially unchecked
    await expect(rememberCheckbox).not.toBeChecked();
    
    // Click to check
    await rememberCheckbox.click();
    await expect(rememberCheckbox).toBeChecked();
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await page.getByTestId('forgot-password-link').click();
    await expect(page).toHaveURL('/forgot-password');
  });
});