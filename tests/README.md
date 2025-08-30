# Test Automation Setup

This document provides information about the test automation setup for the Student Management System.

## Overview

The application uses **Playwright** for end-to-end testing, providing comprehensive test coverage across different browsers and devices.

## Test Structure

### Test Files

- `tests/auth.spec.ts` - Authentication and login tests
- `tests/students.spec.ts` - Student management functionality tests  
- `tests/navigation.spec.ts` - Navigation and routing tests
- `tests/features.spec.ts` - Dashboard, courses, and attendance tests

### Test Locators

The application uses `data-testid` attributes for reliable element selection:

#### Login Form Locators
- `login-username-input` - Username input field
- `login-password-input` - Password input field
- `login-remember-checkbox` - Remember me checkbox
- `forgot-password-link` - Forgot password link
- `login-submit-button` - Submit button

#### Student Management Locators
- `students-search-input` - Student search input
- `add-student-button` - Add student button
- `student-row-{index}` - Student table rows
- `edit-student-{id}` - Edit student buttons
- `delete-student-{id}` - Delete student buttons

## Running Tests

### Prerequisites
```bash
npm install
```

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test tests/auth.spec.ts
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug mode
```bash
npx playwright test --debug
```

## Test Coverage

### Authentication Tests
- ✅ Login form elements visibility
- ✅ Successful login with admin credentials
- ✅ Successful login with student credentials  
- ✅ Error handling for invalid credentials
- ✅ Remember me functionality
- ✅ Forgot password navigation

### Student Management Tests
- ✅ Navigation to students page
- ✅ Student table display and data
- ✅ Search functionality
- ✅ Add student navigation
- ✅ Edit and delete buttons presence
- ✅ Table sorting functionality
- ✅ Delete confirmation dialog

### Navigation Tests
- ✅ Main section navigation
- ✅ Sidebar visibility and links
- ✅ Active navigation highlighting

### Feature Tests
- ✅ Dashboard statistics display
- ✅ Grade distribution chart
- ✅ Course management features
- ✅ Course filtering
- ✅ Attendance management
- ✅ Date selection and marking attendance

## Best Practices

### Writing Tests
1. Use descriptive test names
2. Use `data-testid` for element selection
3. Include proper assertions
4. Test both positive and negative scenarios
5. Keep tests independent and isolated

### Locator Strategy
1. Prefer `data-testid` over CSS selectors
2. Use semantic role selectors when appropriate
3. Avoid brittle selectors like text content that may change
4. Use meaningful and consistent naming conventions

### Test Organization
1. Group related tests using `test.describe()`
2. Use `test.beforeEach()` for common setup
3. Keep tests focused on single functionality
4. Maintain clear test file structure

## CI/CD Integration

The test configuration supports CI/CD environments:
- Automatic retry on failure in CI
- HTML report generation
- Parallel test execution
- Cross-browser testing

## Troubleshooting

### Common Issues
1. **Element not found**: Ensure `data-testid` is correctly implemented
2. **Timing issues**: Use appropriate wait strategies (`toBeVisible`, `toHaveURL`)
3. **Authentication state**: Ensure proper login in `beforeEach` hooks
4. **Browser compatibility**: Test across all configured browsers

### Debug Tips
1. Use `--headed` mode to see browser actions
2. Use `--debug` for step-by-step debugging
3. Add `await page.pause()` to pause execution
4. Use `page.screenshot()` for visual debugging

This test automation setup ensures robust testing of the Student Management System across all major functionalities and user workflows.