
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
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
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				violet: {
					50: '#f5f3ff',
					100: '#ede9fe',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					900: '#4c1d95',
				},
				teal: {
					400: '#2dd4bf',
					500: '#14b8a6',
					600: '#0d9488',
				},
				"english-blue": "#7C3AED",
				"english-green": "#14B8A6",
				"english-light-blue": "#1e1b4b",
				"english-light-green": "#0f2320",
			},
			fontFamily: {
				sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1.25rem',
				'3xl': '1.5rem',
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
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				slideUp: {
					from: { opacity: '0', transform: 'translateY(24px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				slideDown: {
					from: { opacity: '0', transform: 'translateY(-16px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				scaleIn: {
					from: { opacity: '0', transform: 'scale(0.9)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-16px)' }
				},
				pulseGlow: {
					'0%, 100%': { boxShadow: '0 0 20px hsl(258 90% 68% / 0.3)' },
					'50%': { boxShadow: '0 0 60px hsl(258 90% 68% / 0.6), 0 0 100px hsl(258 90% 68% / 0.2)' }
				},
				shimmer: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(200%)' }
				},
				gradientShift: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				orb: {
					'0%, 100%': { transform: 'translate(0, 0) scale(1)' },
					'33%': { transform: 'translate(40px, -60px) scale(1.1)' },
					'66%': { transform: 'translate(-30px, 30px) scale(0.9)' }
				},
				ripple: {
					'0%': { transform: 'scale(0)', opacity: '0.5' },
					'100%': { transform: 'scale(4)', opacity: '0' }
				},
				timerPulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.5s ease-out both',
				'slide-up': 'slideUp 0.5s ease-out both',
				'slide-down': 'slideDown 0.4s ease-out both',
				'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
				'float': 'float 6s ease-in-out infinite',
				'float-delayed': 'float 6s ease-in-out 2s infinite',
				'float-slow': 'float 9s ease-in-out 1s infinite',
				'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2.5s infinite',
				'gradient': 'gradientShift 4s ease infinite',
				'orb': 'orb 12s ease-in-out infinite',
				'orb-delayed': 'orb 14s ease-in-out 3s infinite',
				'timer-pulse': 'timerPulse 1s ease-in-out infinite',
			},
			backgroundSize: {
				'300': '300% 300%',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
