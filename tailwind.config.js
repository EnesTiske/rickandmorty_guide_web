/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA',
          dark: '#3B82F6',
        },
        background: {
          light: '#FFFFFF',
          dark: '#010B11',
        },
        text: {
          light: '#1F2937',
          dark: '#1F2937',
        },
        header: {
          bg: {
            light: '#052D44',
            dark: '#052D44',
          },
          text: {
            light: '#FFFFFF',
            dark: '#FFFFFF',
          },
          border: {
            light: '#094B71',
            dark: '#094B71',
          }
        },
        footer: {
          bg: {
            light: '#052D44',
            dark: '#052D44',
          },
          text: {
            light: '#FFFFFF',
            dark: '#FFFFFF',
          },
          border: {
            light: '#094B71',
            dark: '#094B71',
          }
        },
        table: {
          header: {
            bg: {
              light: '#094B71',
              dark: '#094B71',
            },
            text: {
              light: '#FFFFFF',
              dark: '#f5f5f5',
            },
            border: {
              light: '#E5E7EB',
              dark: '#374151',
            }
          },
          row: {
            bg: {
              light: '#E2F3FD',
              dark: '#8BB0C5',
            },
            hover: {
              light: '#8BB0C5',
              dark: '#E2F3FD',
            },
            text: {
              light: '#1F2937',
              dark: '#F9FAFB',
            },
            border: {
              light: '#CCE2EF',
              dark: '#374151',
            },
            shadow: {
              light: '0 2px 8px 0 rgba(0,0,0,0.04)',
              dark: '0 2px 8px 0 rgba(255,255,255,0.1)',
            },
            hoverShadow: {
              light: '0 4px 24px 0 rgba(59, 130, 246, 0.18)',
              dark: '0 4px 24px 0 rgba(255, 255, 255, 0.15)',
            }
          }
        },
        button: {
          primary: {
            bg: {
              light: '#3B82F6',
              dark: '#2563EB',
            },
            text: {
              light: '#FFFFFF',
              dark: '#FFFFFF',
            },
            hover: {
              light: '#2563EB',
              dark: '#1D4ED8',
            }
          },
          secondary: {
            bg: {
              light: '#9CA3AF',
              dark: '#6B7280',
            },
            text: {
              light: '#FFFFFF',
              dark: '#FFFFFF',
            },
            hover: {
              light: '#6B7280',
              dark: '#4B5563',
            }
          }
        },
        border: {
          light: '#E5E7EB',
          dark: '#374151',
        }
      },
    },
  },
  plugins: [],
} 