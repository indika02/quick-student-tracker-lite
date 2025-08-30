import { test, expect } from '@playwright/test';

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/');
    await page.getByTestId('login-username-input').fill('admin');
    await page.getByTestId('login-password-input').fill('password');
    await page.getByTestId('login-submit-button').click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display dashboard statistics cards', async ({ page }) => {
    // Check if all stat cards are visible
    await expect(page.getByText('Total Students')).toBeVisible();
    await expect(page.getByText('Average Grade')).toBeVisible();
    await expect(page.getByText('New Student')).toBeVisible();
    
    // Check if numeric values are displayed
    await expect(page.locator('[class*="text-2xl font-bold"]').first()).toBeVisible();
  });

  test('should display grade distribution chart', async ({ page }) => {
    await expect(page.getByText('Grade Distribution')).toBeVisible();
    await expect(page.getByText('Breakdown of grades across all students')).toBeVisible();
    
    // Check if progress bars are visible
    await expect(page.locator('[class*="bg-primary"]')).toBeVisible();
  });

  test('should navigate to students from dashboard card', async ({ page }) => {
    await page.getByRole('link', { name: 'View all students' }).click();
    await expect(page).toHaveURL('/students');
  });

  test('should navigate to add student from dashboard', async ({ page }) => {
    await page.getByRole('link', { name: 'Add Student' }).click();
    await expect(page).toHaveURL('/students/new');
  });
});

test.describe('Course Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin and navigate to courses
    await page.goto('/');
    await page.getByTestId('login-username-input').fill('admin');
    await page.getByTestId('login-password-input').fill('password');
    await page.getByTestId('login-submit-button').click();
    await page.goto('/courses');
  });

  test('should display course statistics', async ({ page }) => {
    await expect(page.getByText('Total Courses')).toBeVisible();
    await expect(page.getByText('Active Courses')).toBeVisible();
    await expect(page.getByText('Completed')).toBeVisible();
    await expect(page.getByText('Total Enrolled')).toBeVisible();
  });

  test('should display course cards', async ({ page }) => {
    // Check if course cards are visible
    await expect(page.getByText('Advanced Mathematics')).toBeVisible();
    await expect(page.getByText('Physics Laboratory')).toBeVisible();
    await expect(page.getByText('Computer Science Fundamentals')).toBeVisible();
  });

  test('should filter courses by status', async ({ page }) => {
    // Click on Active filter
    await page.getByRole('button', { name: 'Active' }).click();
    
    // Should show only active courses
    await expect(page.getByText('Advanced Mathematics')).toBeVisible();
    
    // Click on Completed filter
    await page.getByRole('button', { name: 'Completed' }).click();
    
    // Should show completed courses
    await expect(page.getByText('Chemistry Basics')).toBeVisible();
  });

  test('should navigate to attendance from course card', async ({ page }) => {
    await page.getByRole('link', { name: 'Attendance' }).first().click();
    await expect(page).toHaveURL('/attendance');
  });
});

test.describe('Attendance Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin and navigate to attendance
    await page.goto('/');
    await page.getByTestId('login-username-input').fill('admin');
    await page.getByTestId('login-password-input').fill('password');
    await page.getByTestId('login-submit-button').click();
    await page.goto('/attendance');
  });

  test('should display attendance statistics', async ({ page }) => {
    await expect(page.getByText('Total Students')).toBeVisible();
    await expect(page.getByText('Present')).toBeVisible();
    await expect(page.getByText('Absent')).toBeVisible();
    await expect(page.getByText('Late')).toBeVisible();
  });

  test('should allow date selection', async ({ page }) => {
    const dateInput = page.locator('input[type="date"]');
    await expect(dateInput).toBeVisible();
    
    // Change date
    await dateInput.fill('2024-01-15');
  });

  test('should display student attendance list', async ({ page }) => {
    // Check if student cards are visible
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Jane Smith')).toBeVisible();
    
    // Check if attendance buttons are visible
    await expect(page.getByRole('button', { name: 'Present' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Late' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Absent' })).toBeVisible();
  });

  test('should mark attendance for students', async ({ page }) => {
    // Click Present button for first student
    await page.getByRole('button', { name: 'Present' }).first().click();
    
    // Should show Present badge
    await expect(page.getByText('Present').first()).toBeVisible();
  });
});