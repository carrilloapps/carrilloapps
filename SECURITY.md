# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

The CarrilloApps team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings and will make every effort to acknowledge your contributions.

To report a security issue, please email [junior@carrillo.app](mailto:junior@carrillo.app) with a description of the issue, the steps you took to create the issue, affected versions, and, if known, mitigations for the issue. 

Our security team will respond within 72 hours to acknowledge your report and provide an estimated timeline for a fix. We'll keep you updated as we work through the issue resolution process.

## Security Best Practices in the Project

CarrilloApps has implemented several security measures:

1. **Data Validation**: All user inputs are validated using Zod and React Hook Form
2. **Content Security Policy**: Implemented to prevent XSS attacks
3. **HTTPS Enforcement**: All connections are forced to use HTTPS
4. **API Rate Limiting**: Implemented to prevent brute force attacks
5. **Session Management**: Secure session handling
6. **Dependency Management**: Regular updates of dependencies to patch security vulnerabilities

## Security Recommendations for Developers

When contributing to this project, please follow these security best practices:

1. **Never commit sensitive information** like API keys, passwords, or credentials to the repository
2. **Validate all user inputs** and sanitize outputs to prevent injection attacks
3. **Use proper authentication and authorization** mechanisms
4. **Follow the principle of least privilege** when implementing new features
5. **Keep dependencies updated** to minimize security risks
6. **Use HTTPS** for all external connections
7. **Implement proper error handling** to avoid leaking sensitive information

## Third-Party Libraries and Services

This project uses several third-party libraries and services. Always check for any security advisories related to these dependencies before updating them:

- Next.js
- React
- TailwindCSS
- Radix UI components

## Vulnerability Disclosure Process

1. **Report**: Security issue is reported to junior@carrillo.app
2. **Acknowledge**: Our team acknowledges receipt within 72 hours
3. **Investigate**: We investigate the issue and determine its impact
4. **Fix**: We develop and test a fix for the vulnerability
5. **Release**: We release an update to address the vulnerability
6. **Disclose**: After users have had sufficient time to update, we may publicly disclose the vulnerability

## Recognition

We are committed to acknowledging the contributions of security researchers who help improve the security of our project. With your permission, we will list your name in our security acknowledgments.
