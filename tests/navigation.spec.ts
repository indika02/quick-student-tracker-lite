import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/');
    await page.getByTestId('login-username-input').fill('admin');
    await page.getByTestId('login-password-input').fill('password');
    await page.getByTestId('login-submit-button').click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should navigate through all main sections', async ({ page }) => {
    // Test Dashboard navigation
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // Test Students navigation
    await page.getByRole('link', { name: 'Students' }).click();
    await expect(page).toHaveURL('/students');
    await expect(page.getByRole('heading', { name: 'Students' })).toBeVisible();

    // Test Add Student navigation
    await page.getByRole('link', { name: 'Add Student' }).click();
    await expect(page).toHaveURL('/students/new');

    // Test Courses navigation
    await page.getByRole('link', { name: 'Courses' }).click();
    await expect(page).toHaveURL('/courses');
    await expect(page.getByRole('heading', { name: 'Course Management' })).toBeVisible();

    // Test Attendance navigation
    await page.getByRole('link', { name: 'Attendance' }).click();
    await expect(page).toHaveURL('/attendance');
    await expect(page.getByRole('heading', { name: 'Attendance Management' })).toBeVisible();

    // Test Facilities navigation
    await page.getByRole('link', { name: 'Facilities' }).click();
    await expect(page).toHaveURL('/facilities');
  });

  test('should display sidebar correctly', async ({ page }) => {
    // Check if sidebar is visible
    await expect(page.getByRole('complementary')).toBeVisible();
    
    // Check if all navigation items are present
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Students' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Student' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Courses' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Attendance' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Facilities' })).toBeVisible();
  });

  test('should highlight active navigation item', async ({ page }) => {
    // Navigate to students page
    await page.getByRole('link', { name: 'Students' }).click();
    
    // Check if students link is highlighted (has active styles)
    const studentsLink = page.getByRole('link', { name: 'Students' });
    await expect(studentsLink).toHaveClass(/bg-primary/);
  });
});