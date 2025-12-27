"""UX/UI and Accessibility Audit Service
WCAG 2.2 AA compliance and design consistency
"""

from typing import Dict, List, Any
from dataclasses import dataclass
from datetime import datetime


@dataclass
class AccessibilityCheck:
    category: str
    wcag_criterion: str
    level: str
    status: str
    description: str
    recommendations: List[str]


class UXAuditService:
    """UX/UI and Accessibility Audit Service
    
    Comprehensive audit covering:
    - WCAG 2.2 Level AA compliance
    - Design consistency
    - Responsive design
    - Form usability
    - Navigation patterns
    - Mobile optimization
    """
    
    def audit_wcag_compliance(self) -> List[AccessibilityCheck]:
        """Audit WCAG 2.2 compliance"""
        
        checks = [
            AccessibilityCheck(
                category="Perceivable",
                wcag_criterion="1.1.1 Non-text Content",
                level="A",
                status="NEEDS_REVIEW",
                description="All images must have alt text",
                recommendations=[
                    "Add alt attribute to all <img> tags",
                    "Use empty alt='' for decorative images",
                    "Provide meaningful descriptions for informational images",
                    "Use aria-label for icon buttons"
                ]
            ),
            AccessibilityCheck(
                category="Perceivable",
                wcag_criterion="1.4.3 Contrast (Minimum)",
                level="AA",
                status="NEEDS_REVIEW",
                description="Text must have 4.5:1 contrast ratio",
                recommendations=[
                    "Check all text/background combinations",
                    "Use contrast checker tools",
                    "Ensure cyan (#00FFFF) on dark background meets requirements",
                    "Test with color blindness simulators"
                ]
            ),
            AccessibilityCheck(
                category="Perceivable",
                wcag_criterion="1.4.11 Non-text Contrast",
                level="AA",
                status="NEEDS_REVIEW",
                description="UI components must have 3:1 contrast",
                recommendations=[
                    "Check button borders and focus indicators",
                    "Ensure form inputs have visible boundaries",
                    "Test focus states for keyboard navigation"
                ]
            ),
            AccessibilityCheck(
                category="Operable",
                wcag_criterion="2.1.1 Keyboard",
                level="A",
                status="NEEDS_IMPLEMENTATION",
                description="All functionality accessible via keyboard",
                recommendations=[
                    "Test tab navigation through all interactive elements",
                    "Ensure logical tab order",
                    "Add keyboard shortcuts for common actions",
                    "Implement skip links for navigation",
                    "Test with keyboard only (no mouse)"
                ]
            ),
            AccessibilityCheck(
                category="Operable",
                wcag_criterion="2.4.7 Focus Visible",
                level="AA",
                status="NEEDS_IMPLEMENTATION",
                description="Keyboard focus must be visible",
                recommendations=[
                    "Add visible focus indicators to all interactive elements",
                    "Use :focus-visible for modern browsers",
                    "Ensure focus indicators meet contrast requirements",
                    "Test focus indicators on all components"
                ]
            ),
            AccessibilityCheck(
                category="Operable",
                wcag_criterion="2.5.5 Target Size",
                level="AAA",
                status="NEEDS_REVIEW",
                description="Touch targets should be at least 44x44px",
                recommendations=[
                    "Ensure all buttons are minimum 44x44px",
                    "Add adequate spacing between touch targets",
                    "Test on mobile devices",
                    "Consider larger targets for primary actions"
                ]
            ),
            AccessibilityCheck(
                category="Understandable",
                wcag_criterion="3.3.1 Error Identification",
                level="A",
                status="NEEDS_IMPROVEMENT",
                description="Form errors must be clearly identified",
                recommendations=[
                    "Provide clear error messages",
                    "Use aria-invalid and aria-describedby",
                    "Don't rely on color alone to indicate errors",
                    "Display errors inline and in error summary"
                ]
            ),
            AccessibilityCheck(
                category="Understandable",
                wcag_criterion="3.3.2 Labels or Instructions",
                level="A",
                status="NEEDS_REVIEW",
                description="Form inputs must have labels",
                recommendations=[
                    "Add <label> for all form inputs",
                    "Use placeholder text as hints, not labels",
                    "Provide instructions for complex inputs",
                    "Use aria-label when visual label not possible"
                ]
            ),
            AccessibilityCheck(
                category="Robust",
                wcag_criterion="4.1.2 Name, Role, Value",
                level="A",
                status="NEEDS_IMPLEMENTATION",
                description="UI components must have accessible names",
                recommendations=[
                    "Add ARIA labels to custom components",
                    "Use semantic HTML elements",
                    "Test with screen readers (NVDA, JAWS, VoiceOver)",
                    "Add role attributes where appropriate"
                ]
            )
        ]
        
        return checks
    
    def audit_design_system(self) -> Dict[str, Any]:
        """Audit design system consistency"""
        
        return {
            "typography": {
                "current_state": "Needs standardization",
                "recommendations": [
                    "Define typography scale (base, sm, lg, xl, 2xl, etc.)",
                    "Standardize font weights",
                    "Ensure consistent line heights",
                    "Create reusable text components"
                ],
                "proposed_scale": {
                    "xs": "0.75rem (12px)",
                    "sm": "0.875rem (14px)",
                    "base": "1rem (16px)",
                    "lg": "1.125rem (18px)",
                    "xl": "1.25rem (20px)",
                    "2xl": "1.5rem (24px)",
                    "3xl": "1.875rem (30px)",
                    "4xl": "2.25rem (36px)"
                }
            },
            "spacing": {
                "recommendations": [
                    "Use 8px base grid system",
                    "Define spacing tokens (xs, sm, md, lg, xl)",
                    "Consistent padding and margins",
                    "Use spacing utilities from Tailwind"
                ],
                "spacing_scale": {
                    "xs": "0.25rem (4px)",
                    "sm": "0.5rem (8px)",
                    "md": "1rem (16px)",
                    "lg": "1.5rem (24px)",
                    "xl": "2rem (32px)",
                    "2xl": "3rem (48px)"
                }
            },
            "buttons": {
                "recommendations": [
                    "Standardize button sizes (sm, md, lg)",
                    "Consistent button states (hover, active, disabled)",
                    "Minimum touch target 44x44px",
                    "Clear visual hierarchy"
                ],
                "button_sizes": {
                    "sm": "height: 32px, padding: 8px 16px",
                    "md": "height: 44px, padding: 12px 24px",
                    "lg": "height: 56px, padding: 16px 32px"
                }
            },
            "colors": {
                "current_palette": {
                    "background": "#1e2f3c",
                    "accent": "#00FFFF",
                    "text": "#FFFFFF"
                },
                "recommendations": [
                    "Add semantic color tokens (success, error, warning)",
                    "Define color variations (50-900 scale)",
                    "Ensure all colors meet WCAG contrast requirements",
                    "Document color usage guidelines"
                ]
            }
        }
    
    def audit_responsive_design(self) -> Dict[str, Any]:
        """Audit responsive design"""
        
        return {
            "breakpoints": {
                "current": "Using Tailwind default breakpoints",
                "sm": "640px",
                "md": "768px",
                "lg": "1024px",
                "xl": "1280px",
                "2xl": "1536px"
            },
            "mobile_optimization": {
                "recommendations": [
                    "Test on actual mobile devices",
                    "Optimize tap targets for touch",
                    "Ensure readable text without zooming",
                    "Optimize images for mobile bandwidth",
                    "Test landscape and portrait orientations"
                ]
            },
            "tablet_optimization": {
                "recommendations": [
                    "Optimize layout for tablet viewports",
                    "Test iPad and Android tablets",
                    "Consider split-view layouts"
                ]
            },
            "desktop_optimization": {
                "recommendations": [
                    "Optimize for large screens",
                    "Consider max-width for readability",
                    "Test multi-column layouts"
                ]
            }
        }
    
    def audit_form_usability(self) -> Dict[str, Any]:
        """Audit form usability"""
        
        return {
            "validation": {
                "recommendations": [
                    "Implement real-time validation",
                    "Show validation on blur, not on keypress",
                    "Provide clear error messages",
                    "Indicate required fields clearly",
                    "Show success feedback"
                ],
                "implementation": """// Form validation example
function LoginForm() {
  const [errors, setErrors] = useState({});
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleBlur = (field, value) => {
    if (field === 'email' && !validateEmail(value)) {
      setErrors(prev => ({ 
        ...prev, 
        email: 'Please enter a valid email address' 
      }));
    }
  };
  
  return (
    <div>
      <label htmlFor="email">Email *</label>
      <input
        id="email"
        type="email"
        aria-required="true"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
        onBlur={(e) => handleBlur('email', e.target.value)}
      />
      {errors.email && (
        <span id="email-error" role="alert" className="error">
          {errors.email}
        </span>
      )}
    </div>
  );
}"""
            },
            "accessibility": {
                "recommendations": [
                    "Associate labels with inputs",
                    "Use fieldset and legend for groups",
                    "Provide autocomplete attributes",
                    "Add help text for complex fields"
                ]
            }
        }
    
    def generate_ux_report(self) -> Dict[str, Any]:
        """Generate comprehensive UX/UI audit report"""
        
        wcag_checks = self.audit_wcag_compliance()
        
        return {
            "timestamp": datetime.utcnow().isoformat(),
            "wcag_compliance": {
                "level": "AA",
                "total_checks": len(wcag_checks),
                "checks": [
                    {
                        "category": check.category,
                        "criterion": check.wcag_criterion,
                        "level": check.level,
                        "status": check.status,
                        "description": check.description,
                        "recommendations": check.recommendations
                    }
                    for check in wcag_checks
                ]
            },
            "design_system": self.audit_design_system(),
            "responsive_design": self.audit_responsive_design(),
            "form_usability": self.audit_form_usability(),
            "testing_recommendations": [
                "Use axe DevTools for automated accessibility testing",
                "Test with screen readers (NVDA, JAWS, VoiceOver)",
                "Test keyboard navigation",
                "Use browser developer tools for responsive testing",
                "Conduct user testing with diverse users",
                "Test with assistive technologies"
            ],
            "tools": [
                "axe DevTools - Accessibility testing",
                "Lighthouse - Performance and accessibility",
                "Wave - Web accessibility evaluation",
                "Color contrast analyzers",
                "Screen reader testing tools"
            ]
        }


# Singleton instance
ux_audit_service = UXAuditService()
