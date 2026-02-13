import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			display: ['Instrument Serif', 'Georgia', 'serif'],
  			body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  		},
  		fontSize: {
  			'hero': ['clamp(2.75rem, 6vw + 1rem, 5.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
  			'section': ['clamp(1.75rem, 3vw + 0.5rem, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
  			'body-lg': ['clamp(0.9375rem, 0.3vw + 0.875rem, 1.0625rem)', { lineHeight: '1.75' }],
  			'body': ['1rem', { lineHeight: '1.7' }],
  			'body-sm': ['0.9375rem', { lineHeight: '1.65' }],
  			'micro': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
  			'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }]
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'fade-in': {
  				'0%': { opacity: '0', transform: 'translateY(20px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'fade-in-up': {
  				'0%': { opacity: '0', transform: 'translateY(30px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'scale-in': {
  				'0%': { opacity: '0', transform: 'scale(0.95)' },
  				'100%': { opacity: '1', transform: 'scale(1)' }
  			},
  			'slide-in-right': {
  				'0%': { transform: 'translateX(100%)' },
  				'100%': { transform: 'translateX(0)' }
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.6s ease-out forwards',
  			'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
  			'scale-in': 'scale-in 0.4s ease-out forwards',
  			'slide-in-right': 'slide-in-right 0.3s ease-out',
  		},
  		boxShadow: {
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			'button': 'var(--shadow-button)',
  			'button-hover': 'var(--shadow-button-hover)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
