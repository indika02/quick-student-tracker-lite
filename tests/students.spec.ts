import { test, expect } from '@playwright/test';

test.describe('Student Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/');
    await page.getByTestId('login-username-input').fill('admin');
    await page.getByTestId('login-password-input').fill('password');
    await page.getByTestId('login-submit-button').click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should navigate to students page', async ({ page }) => {
    // Navigate to students page via sidebar
    await page.getByRole('link', { name: 'Students' }).click();
    await expect(page).toHaveURL('/students');
    await expect(page.getByRole('heading', { name: 'Students' })).toBeVisible();
  });

  test('should display student table with data', async ({ page }) => {
    await page.goto('/students');
    
    // Check if table is visible
    await expect(page.getByRole('table')).toBeVisible();
    
    // Check if at least one student row exists
    await expect(page.getByTestId('student-row-0')).toBeVisible();
    
    // Check table headers
    await expect(page.getByRole('columnheader', { name: /First Name/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Last Name/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Email/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Grade/ })).toBeVisible();
  });

  test('should search students functionality', async ({ page }) => {
    await page.goto('/students');
    
    const searchInput = page.getByTestId('students-search-input');
    
    // Search for a specific student
    await searchInput.fill('John');
    
    // Wait for search results (assuming John Doe exists in mock data)
    await expect(page.getByText('John')).toBeVisible();
    
    // Clear search
    await searchInput.clear();
    await searchInput.fill('NonExistentStudent');
    
    // Should show no results
    await expect(page.getByText('No students found')).toBeVisible();
  });

  test('should navigate to add student page', async ({ page }) => {
    await page.goto('/students');
    
    await page.getByTestId('add-student-button').click();
    await expect(page).toHaveURL('/students/new');
  });

  test('should have edit and delete buttons for each student', async ({ page }) => {
    await page.goto('/students');
    
    // Check if edit and delete buttons exist for first student
    await expect(page.getByTestId('edit-student-1')).toBeVisible();
    await expect(page.getByTestId('delete-student-1')).toBeVisible();
  });

  test('should sort students by clicking headers', async ({ page }) => {
    await page.goto('/students');
    
    // Click on First Name header to sort
    await page.getByRole('columnheader', { name: /First Name/ }).click();
    
    // Verify sorting icon appears
    await expect(page.locator('.lucide-arrow-up, .lucide-arrow-down')).toBeVisible();
  });

  test('should show delete confirmation dialog', async ({ page }) => {
    await page.goto('/students');
    
    // Click delete button for first student
    await page.getByTestId('delete-student-1').click();
    
    // Should show confirmation dialog
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Are you sure?')).toBeVisible();
    await expect(page.getByText('Cancel')).toBeVisible();
    await expect(page.getByText('Delete')).toBeVisible();
  });
});