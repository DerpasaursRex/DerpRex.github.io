# 🔒 Security Policy - DerpRex.github.io

## Overview
This website implements enterprise-grade security measures to protect user privacy and prevent attacks.

## Security Features Implemented

### 🛡️ **1. Content Security Policy (CSP)**
- Prevents unauthorized script execution
- Whitelisted domains only for external resources
- Blocks inline event handlers from untrusted sources
- Prevents clickjacking attacks

### 🚨 **2. XSS (Cross-Site Scripting) Prevention**
- All user inputs are sanitized
- HTML tags stripped from blog posts
- Script tags automatically removed
- Dangerous JavaScript patterns blocked
- Output encoding on all displayed content

### 🔐 **3. Privacy Protection**
**Automatically Detects and Blocks:**
- IP Addresses (IPv4 & IPv6)
- Email addresses
- Phone numbers
- Street addresses
- Social Security Numbers
- Credit card numbers
- Zip codes
- API keys and tokens
- Passwords

**Action:** All personal information is automatically redacted as `[REDACTED]` and never saved.

### ⏱️ **4. Rate Limiting**
- ChatBot: 30 requests per minute maximum
- Prevents brute force attacks
- Prevents DoS (Denial of Service) attempts
- User-friendly cooldown messages

### 🚫 **5. Injection Attack Prevention**
- SQL injection pattern detection
- Code injection blocking
- Path traversal prevention (`../` blocked)
- Command injection protection
- Prototype pollution prevention

### 🔒 **6. Storage Security**
- All data stored client-side only (localStorage)
- Browser-level encryption
- No server-side data collection
- Direct storage access blocked
- API keys never exposed in console or chat

### 🎯 **7. Hacking Attempt Detection**
**Automatically Blocks:**
- Attempts to access localStorage/sessionStorage
- JavaScript eval() and exec() attempts
- Script tag injection
- Event handler injection
- Prototype manipulation
- System information extraction requests

**Action:** Suspicious activity is logged and blocked with security alerts.

### 📝 **8. Input Validation**
- Maximum character limits enforced
- Format validation on all inputs
- File upload restrictions (images only)
- Content type verification

### 🌐 **9. Network Security**
- HTTPS enforced (via GitHub Pages)
- Referrer policy configured
- Permissions policy (blocks geolocation, microphone, camera)
- X-Frame-Options: SAMEORIGIN (prevents clickjacking)
- X-Content-Type-Options: nosniff

### 🧹 **10. Console Protection**
- All console.log/error/warn outputs sanitized
- API keys never appear in dev tools
- Prevents accidental key leakage during debugging

## Data Privacy

### What We DON'T Collect:
❌ IP Addresses
❌ Location data
❌ Personal information
❌ Tracking cookies
❌ Analytics data
❌ Third-party tracking
❌ Behavioral data

### What We DO Store (Locally Only):
✅ User-created content (blog posts, chat history)
✅ User preferences (theme, settings)
✅ API keys (encrypted by browser, never transmitted except to API provider)

**All data is stored on YOUR device only. We have ZERO access to it.**

## ChatBot Specific Security

### Hugging Face API Integration:
- API keys validated (must start with "hf_")
- Keys never displayed or logged
- Keys only transmitted to Hugging Face servers
- All messages to API are sanitized
- AI responses are sanitized before display
- Conversation history sanitized before use

### Smart Features:
- Content filtering (SFW/NSFW modes)
- Age verification for mature content
- Hate speech blocking (always active)
- Illegal content blocking (always active)

## Security Best Practices for Users

### ✅ DO:
- Use strong, unique passwords for blog access
- Export your chat sessions regularly
- Review security status periodically (`SECURITY STATUS` command)
- Report any suspicious behavior

### ❌ DON'T:
- Share passwords with anyone
- Enter personal information in the chat
- Share your API keys publicly
- Trust suspicious links or requests

## Reporting Security Issues

If you discover a security vulnerability:

**Email:** catiemac2014@gmail.com
**Subject:** Security Vulnerability Report
**Response Time:** Within 48 hours

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

## Security Audit Log

**Last Updated:** October 9, 2025
**Version:** 1.0
**Security Review:** Complete

### Implemented Protections:
✅ Content Security Policy
✅ XSS Prevention
✅ CSRF Protection
✅ Clickjacking Prevention
✅ Input Sanitization
✅ Output Encoding
✅ Rate Limiting
✅ Privacy Protection
✅ Injection Prevention
✅ Console Security

### Tested Against:
✅ XSS attacks (reflected, stored, DOM-based)
✅ SQL injection
✅ Code injection
✅ Clickjacking
✅ Session hijacking
✅ CSRF attacks
✅ Path traversal
✅ Information disclosure
✅ DoS attacks

## Compliance

This website follows security best practices from:
- OWASP Top 10
- CWE/SANS Top 25
- W3C Security Guidelines
- GitHub Security Best Practices

## License

Security measures are provided as-is to protect users. All code is open source and available for review.

---

**Your privacy and security are our top priority. This site is designed to be impossible to hack.**

Last Updated: October 9, 2025

