{
  "brand_attributes": {
    "name": "eSIM Myanmar",
    "personality": ["professional", "trusted", "precise", "enterprise-grade", "telecom"],
    "python_gui_aesthetic": "Structured panes, clear separators, compact controls, high-contrast text, neutral surfaces. Styled like modern PyQt/PySide dashboards (tonal surfaces, crisp borders, strong focus states).",
    "audience": ["Operators", "Enterprise Admins", "Provisioners", "Finance", "Audit/Compliance", "Executives"],
    "primary_tasks": [
      "eSIM lifecycle operations (issue, assign, suspend, resume, retire)",
      "Device/ICCID search & bulk actions",
      "Plan activation and provisioning",
      "Billing & invoicing review, payments, credits",
      "RBAC & tenants management",
      "Audit log review, export, reporting"
    ],
    "success_signals": ["low error rate", "fast search/filter", "exportable reports", "clear billing breakdowns", "keyboard-first operability"]
  },

  "typography": {
    "fonts": {
      "heading": "Space Grotesk",
      "body": "IBM Plex Sans",
      "code": "Source Code Pro",
      "myanmar_fallback": "Noto Sans Myanmar"
    },
    "import": [
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;500;700&display=swap"
    ],
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl tracking-tight font-semibold",
      "h2": "text-base sm:text-lg font-semibold",
      "h3": "text-lg sm:text-xl font-semibold",
      "body": "text-sm sm:text-base",
      "small": "text-xs sm:text-sm",
      "numeric": "tabular-nums"
    },
    "usage": {
      "headings_weight": 600,
      "letter_spacing": "-0.01em to -0.02em for display",
      "line_height_body": 1.6,
      "myanmar_text_rule": "Apply class 'myanmar-text' or [lang=\"my\"] to force Myanmar font stack"
    }
  },

  "color_system": {
    "brand": {
      "primary": "#00C8C8",
      "primary_dark": "#00A7A7",
      "primary_muted": "#A6F2F2",
      "secondary": "#2D3B45",
      "accent": "#2196F3",
      "success": "#1DB954",
      "warning": "#F59E0B",
      "danger": "#E53935",
      "info": "#0EA5E9"
    },
    "neutrals": {
      "bg": "#0F1922",
      "surface": "#111D27",
      "surface_alt": "#15212C",
      "elevated": "#172532",
      "border": "#1F2E3A",
      "text": "#E6EEF5",
      "text_muted": "#A9B7C3",
      "text_subtle": "#7C8994"
    },
    "light_theme": {
      "bg": "#F7FAFC",
      "surface": "#FFFFFF",
      "surface_alt": "#F0F4F7",
      "elevated": "#FFFFFF",
      "border": "#D7E0E7",
      "text": "#0D1B26",
      "text_muted": "#425766",
      "text_subtle": "#6B7A86",
      "primary_on_surface": "#0C1F27"
    },
    "charts": ["#00C8C8", "#2196F3", "#34D399", "#F59E0B", "#64748B", "#E53935"],
    "gradients_allowed": [
      "linear-gradient(135deg, #B6FFEA 0%, #E6FFF6 50%, #F0FAFF 100%)",
      "linear-gradient(135deg, #CCFBF1 0%, #E0F2FE 100%)",
      "linear-gradient(135deg, #D9F9FF 0%, #E6FFF6 100%)"
    ],
    "gradient_rules": {
      "max_viewport_coverage": "20%",
      "no_dark_saturated": true,
      "use_on": ["hero section backgrounds", "section dividers", "decorative overlays"],
      "avoid_on": ["tables", "forms", "long-read content", "small ui elements"]
    }
  },

  "css_tokens": {
    "root": ":root {\n  --color-primary: #00C8C8;\n  --color-primary-dark: #00A7A7;\n  --color-primary-muted: #A6F2F2;\n  --color-accent: #2196F3;\n  --color-bg: #0F1922;\n  --color-surface: #111D27;\n  --color-surface-alt: #15212C;\n  --color-elevated: #172532;\n  --color-border: #1F2E3A;\n  --color-text: #E6EEF5;\n  --color-text-muted: #A9B7C3;\n  --color-text-subtle: #7C8994;\n  --ring: #00C8C8;\n  --success: #1DB954;\n  --warning: #F59E0B;\n  --danger: #E53935;\n  --info: #0EA5E9;\n  --radius-sm: 6px;\n  --radius-md: 8px;\n  --radius-lg: 12px;\n  --radius-xl: 16px;\n  --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);\n  --shadow-md: 0 6px 16px rgba(0,0,0,0.25);\n  --shadow-lg: 0 12px 28px rgba(0,0,0,0.3);\n  --space-1: 0.25rem;\n  --space-2: 0.5rem;\n  --space-3: 0.75rem;\n  --space-4: 1rem;\n  --space-5: 1.25rem;\n  --space-6: 1.5rem;\n  --space-8: 2rem;\n  --btn-height-sm: 36px;\n  --btn-height-md: 40px;\n  --btn-height-lg: 48px;\n  --focus: 3px solid var(--ring);\n}",
    "light": ".theme-light {\n  --color-bg: #F7FAFC;\n  --color-surface: #FFFFFF;\n  --color-surface-alt: #F0F4F7;\n  --color-elevated: #FFFFFF;\n  --color-border: #D7E0E7;\n  --color-text: #0D1B26;\n  --color-text-muted: #425766;\n  --color-text-subtle: #6B7A86;\n  --ring: #00A7A7;\n}",
    "dark": ".theme-dark {\n  --color-bg: #0F1922;\n  --color-surface: #111D27;\n  --color-surface-alt: #15212C;\n  --color-elevated: #172532;\n  --color-border: #1F2E3A;\n  --color-text: #E6EEF5;\n  --color-text-muted: #A9B7C3;\n  --color-text-subtle: #7C8994;\n  --ring: #00C8C8;\n}"
  },

  "layout": {
    "grid": {
      "mobile": "grid-cols-1 gap-4 px-4",
      "tablet": "md:grid-cols-6 md:gap-6 md:px-6",
      "desktop": "lg:grid-cols-12 lg:gap-8 lg:px-10 2xl:max-w-[1440px] 2xl:mx-auto"
    },
    "surfaces": {
      "panel": "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-sm",
      "card": "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg",
      "elevated": "bg-[var(--color-elevated)] shadow-lg border border-[var(--color-border)] rounded-xl"
    },
    "shells": {
      "website": {
        "hero": "relative overflow-hidden bg-gradient-to-b from-[#D9F9FF] via-[#F3FEFF] to-[#E6FFF6]",
        "content": "prose prose-invert:max-w-none text-[var(--color-text)]"
      },
      "dashboard": {
        "container": "min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr] bg-[var(--color-bg)] text-[var(--color-text)]",
        "sidebar": "hidden lg:flex lg:flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]",
        "topbar": "sticky top-0 z-40 h-14 lg:h-16 bg-[var(--color-surface)]/80 backdrop-blur border-b border-[var(--color-border)]",
        "content": "p-4 md:p-6 lg:p-8 space-y-6"
      }
    },
    "breakpoints": {"mobile": 375, "tablet": 768, "desktop": 1920}
  },

  "role_based_navigation": {
    "Operator": ["Dashboard", "eSIMs", "Provision", "Plans", "Support"],
    "Enterprise Admin": ["Dashboard", "Tenants", "Users & Roles", "Plans", "Billing", "Reports"],
    "Provisioner": ["Dashboard", "Bulk Ops", "eSIMs", "Orders"],
    "Finance": ["Billing", "Invoices", "Payments", "Revenue", "Taxes"],
    "Audit": ["Audit Logs", "Exports", "Reports"]
  },

  "page_templates": {
    "esim_lifecycle": {
      "header": "H1, breadcrumb, search + filters row",
      "filters": ["status", "plan", "tenant", "date-range (shadcn Calendar)", "tags"],
      "table": {
        "columns": [
          "ICCID", "MSISDN", "Status", "Tenant", "Plan", "Activated", "Last Action", "Actions"
        ],
        "row_height": 56,
        "actions": ["View", "Assign", "Suspend", "Resume", "Retire"],
        "empty_state": "Use network-grid image with CTA to import or provision"
      },
      "right_panel": "Details drawer for selected ICCID (Sheet/Drawer)"
    },
    "billing": {
      "summary_cards": ["Current balance", "Outstanding invoices", "This period usage", "Projected"],
      "table": {"columns": ["Invoice #", "Period", "Tenant", "Amount", "Status", "Due", "Download"]},
      "filters": ["tenant", "status", "date-range"],
      "invoice_view": "Modal/Dialog with breakdown, taxes, line items, notes"
    },
    "audit_logs": {
      "filters": ["actor", "action", "entity", "status", "date-range"],
      "table": {"columns": ["Timestamp", "Actor", "Role", "Action", "Entity", "Result", "IP"]},
      "export": "CSV & JSON",
      "visual": "Tiny area charts for activity over time (Recharts)"
    }
  },

  "components": {
    "principles": [
      "High-contrast labels and inputs",
      "Consistent 8px spacing multiples",
      "Clear error states with inline help",
      "All interactive and key informational elements MUST include data-testid"
    ],
    "shadcn_primitives": [
      "button", "input", "label", "select", "dialog", "tabs", "table", "card", "breadcrumb", "badge", "tooltip", "dropdown-menu", "separator", "avatar", "calendar", "toast"
    ],
    "files_js": [
      "/app/frontend/src/components/ui/button.js",
      "/app/frontend/src/components/ui/input.js",
      "/app/frontend/src/components/ui/select.js",
      "/app/frontend/src/components/ui/dialog.js",
      "/app/frontend/src/components/ui/tabs.js",
      "/app/frontend/src/components/ui/table.js",
      "/app/frontend/src/components/ui/card.js",
      "/app/frontend/src/components/ui/breadcrumb.js",
      "/app/frontend/src/components/ui/badge.js",
      "/app/frontend/src/components/ui/tooltip.js",
      "/app/frontend/src/components/ui/dropdown-menu.js",
      "/app/frontend/src/components/ui/separator.js",
      "/app/frontend/src/components/ui/avatar.js",
      "/app/frontend/src/components/ui/calendar.js",
      "/app/frontend/src/components/ui/sonner.js"
    ],
    "button": {
      "style": "Professional / Corporate",
      "sizes": {"sm": "h-9 px-3", "md": "h-10 px-4", "lg": "h-12 px-5"},
      "radius": "var(--radius-md)",
      "variants": {
        "primary": "bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[#00B2B2] focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        "secondary": "bg-[var(--color-surface-alt)] text-[var(--color-text)] hover:bg-[color:rgba(255,255,255,0.06)] border border-[var(--color-border)]",
        "ghost": "bg-transparent text-[var(--color-text)] hover:bg-[color:rgba(255,255,255,0.06)]"
      },
      "micro": {
        "hover": "transition-colors duration-150",
        "press": "active:scale-[0.98] transition-transform duration-100"
      },
      "accessibility": "Visible focus ring, WCAG AA contrast",
      "data_testid": "[role]-[context]-button (e.g., data-testid=\"billing-pay-invoice-button\")"
    },
    "input": {
      "base": "h-12 px-4 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent",
      "states": {"invalid": "border-[var(--danger)]", "disabled": "opacity-60 cursor-not-allowed"},
      "data_testid": "[context]-input"
    },
    "select": {"base": "h-12", "data_testid": "[context]-select"},
    "table": {
      "wrapper": "overflow-auto border border-[var(--color-border)] rounded-lg",
      "head": "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] text-xs uppercase tracking-wide",
      "row": "hover:bg-[color:rgba(255,255,255,0.03)] transition-colors",
      "cell": "text-sm text-[var(--color-text)]",
      "density": {"comfortable": 56, "compact": 44},
      "empty_state": "py-16 text-center text-[var(--color-text-muted)]",
      "data_testid": "[context]-table"
    },
    "card": {"base": "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 md:p-6", "hover": "hover:shadow-md transition-shadow", "data_testid": "[context]-card"},
    "dialog": {"overlay": "bg-black/50 backdrop-blur-sm", "content": "bg-[var(--color-elevated)] border border-[var(--color-border)] rounded-xl p-6", "data_testid": "[context]-dialog"},
    "tabs": {"list": "border-b border-[var(--color-border)]", "trigger": "data-[state=active]:text-[var(--color-text)] data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-primary)] text-[var(--color-text-subtle)]", "data_testid": "[context]-tabs"},
    "breadcrumbs": {"item": "text-[var(--color-text-subtle)] hover:text-[var(--color-text)]", "separator": "/", "data_testid": "[context]-breadcrumb"},
    "badges": {"tone": {"success": "bg-emerald-500/15 text-emerald-300", "warning": "bg-amber-500/15 text-amber-300", "danger": "bg-red-500/15 text-red-300", "info": "bg-sky-500/15 text-sky-300"}, "data_testid": "[context]-badge"}
    },

  "micro_interactions": {
    "rules": [
      "Never use transition: all. Use specific properties (colors, background-color, box-shadow, opacity, transform)",
      "Buttons: color and shadow transitions only",
      "Tables: row hover background-color only",
      "Modals: fade-in overlay (opacity), scale-up content (transform)"
    ],
    "motion": {"easing": "cubic-bezier(0.2, 0.8, 0.2, 1)", "durations": {"fast": 120, "base": 180, "slow": 250}},
    "framer_motion_examples": {
      "fade_grow": "<motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.18, ease:[0.2,0.8,0.2,1]}} />",
      "slide_up": "<motion.div initial={{y:8, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.2}} />"
    }
  },

  "data_visualization": {
    "library": "Recharts",
    "charts": [
      {"type": "tiny-area", "usage": "audit activity sparkline", "palette": "charts[0..2]"},
      {"type": "bar", "usage": "plans usage"},
      {"type": "line", "usage": "provisioning latency"}
    ],
    "empty_states": "Use diagonal grid image with muted copy"
  },

  "accessibility": {
    "contrast": "WCAG AA minimum",
    "keyboard": "All focusable elements must have visible focus, ESC closes modals, arrow keys for menus",
    "aria": "Use aria-label/aria-describedby for inputs and icon-only buttons",
    "reduced_motion": "Respect prefers-reduced-motion",
    "skip_link": "Provide #skip-to-content"
  },

  "images_urls": [
    {
      "url": "https://images.unsplash.com/photo-1723731018011-c4374dd81a2a?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "texture",
      "where": "dashboard-empty-state background",
      "description": "Monochrome grid pattern – overlay with teal tint"
    },
    {
      "url": "https://images.unsplash.com/photo-1681304211031-052c84431cf8?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "texture",
      "where": "audit/report header banner",
      "description": "Geometric pattern – apply 20% overlay and teal gradient to conform rules"
    },
    {
      "url": "https://images.unsplash.com/photo-1664526936810-ec0856d31b92?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "illustration",
      "where": "website hero decorative image",
      "description": "Network nodes diagram – telecom context"
    }
  ],

  "component_path": {
    "shadcn": {
      "base": "/app/frontend/src/components/ui/",
      "note": "Use named exports in .js files, import via ./components/ui/[component]"
    },
    "examples": [
      {
        "file": "/app/frontend/src/components/ui/button.js",
        "scaffold": "export const Button = ({variant='primary', size='md', className='', ...props}) => { const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-60 disabled:cursor-not-allowed'; const sizes = {sm:'h-9 px-3 text-sm', md:'h-10 px-4 text-sm', lg:'h-12 px-5 text-base'}; const variants = { primary: 'bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[#00B2B2] transition-colors', secondary:'bg-[var(--color-surface-alt)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[color:rgba(255,255,255,0.06)] transition-colors', ghost:'bg-transparent text-[var(--color-text)] hover:bg-[color:rgba(255,255,255,0.06)] transition-colors' }; return (<button data-testid={props['data-testid']||'generic-button'} className={[base, sizes[size], variants[variant], className].join(' ')} {...props} />); }"
      },
      {
        "file": "/app/frontend/src/components/ui/table.js",
        "scaffold": "export const Table = ({columns=[], data=[], rowKey='id', context='generic'}) => { return (<div className=\"overflow-auto border border-[var(--color-border)] rounded-lg\" data-testid={`${context}-table`}><table className=\"min-w-full text-left\"><thead className=\"bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] text-xs uppercase tracking-wide\"><tr>{columns.map(col=> <th key={col.key||col} className=\"px-4 py-3\">{col.title||col}</th>)}</tr></thead><tbody>{data.length===0 ? (<tr><td colSpan={columns.length} className=\"py-16 text-center text-[var(--color-text-muted)]\">No data</td></tr>) : data.map((row)=> (<tr key={row[rowKey]} className=\"hover:bg-[color:rgba(255,255,255,0.03)] transition-colors\">{columns.map(col=> <td key={(col.key||col)+row[rowKey]} className=\"px-4 py-3 text-sm text-[var(--color-text)]\">{typeof col.render==='function' ? col.render(row[col.key], row) : row[col.key||col]}</td>)}</tr>))}</tbody></table></div>); }"
      },
      {
        "file": "/app/frontend/src/components/ui/sonner.js",
        "scaffold": "// Wrapper re-export for sonner toasts (ensure 'sonner' is installed)\nexport { Toaster, toast } from 'sonner';\n"
      }
    ]
  },

  "libraries": {
    "install": [
      "npm i framer-motion recharts sonner date-fns",
      "npm i lucide-react",
      "npm i clsx"
    ],
    "usage_notes": [
      "Use Recharts for all charts (bar, line, tiny area)",
      "Use framer-motion for non-blocking entrance animations",
      "Use sonner for toasts. Mount <Toaster position=\"top-right\" /> once in App.js"
    ]
  },

  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid",
    "pattern": "kebab-case and role-first: [role]-[context]-[element]",
    "examples": [
      "data-testid=\"login-form-submit-button\"",
      "data-testid=\"esim-search-input\"",
      "data-testid=\"audit-logs-table\""
    ]
  },

  
  "instructions_to_main_agent": [
    "1) Add typography imports in index.html or index.css for Space Grotesk, IBM Plex Sans, Source Code Pro, Noto Sans Myanmar",
    "2) Inject css_tokens root, light, dark into a global stylesheet (e.g., App.css) and apply .theme-dark or .theme-light on <html> or <body>",
    "3) Create the shadcn style ui components as .js files under /app/frontend/src/components/ui/ using provided scaffolds and named exports",
    "4) Replace any 'transition: all' in project styles with targeted transitions (e.g., transition-colors, transition-shadow, transition-opacity)",
    "5) Mount <Toaster /> from sonner in App.js and use toast.success/error for feedback",
    "6) Adhere to gradient rules: do not exceed 20% viewport, avoid dark saturated hues, keep content areas solid",
    "7) Ensure every interactive element has a data-testid attribute per testing rules",
    "8) Use shadcn Calendar for date picking in reports and filters",
    "9) Use the provided layout shells for website and dashboard; apply responsive grid definitions",
    "10) Configure RBAC routes and sidebar items per role_based_navigation"
  ]
}


---
General UI UX Design Guidelines  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
