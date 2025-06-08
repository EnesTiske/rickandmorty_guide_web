const { palette, mainColors, buttonPalette, tablePalette, headerFooterPalette, modalPalette, filterPalette, statusColors } = require('./src/styles/colors.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
          light: mainColors[0],
          dark: palette[9.5],
        },
        text: {
          light: palette[7],
          dark: palette[7],
        },
        headerFooter: {
          header: {
            light: {
              bg: headerFooterPalette.header.light.bg,
              text: headerFooterPalette.header.light.text,
              border: headerFooterPalette.header.light.border,
              shadow: headerFooterPalette.header.light.shadow,
            },
            dark: {
              bg: headerFooterPalette.header.dark.bg,
              text: headerFooterPalette.header.dark.text,
              border: headerFooterPalette.header.dark.border,
              shadow: headerFooterPalette.header.dark.shadow,
            }
          },
          footer: {
            light: {
              bg: headerFooterPalette.footer.light.bg,
              text: headerFooterPalette.footer.light.text,
              border: headerFooterPalette.footer.light.border,
              shadow: headerFooterPalette.footer.light.shadow,
            },
            dark: {
              bg: headerFooterPalette.footer.dark.bg,
              text: headerFooterPalette.footer.dark.text,
              border: headerFooterPalette.footer.dark.border,
              shadow: headerFooterPalette.footer.dark.shadow,
            }
          }
        },
        modal: {
          light: {
            bg: modalPalette.light.bg,
            text: modalPalette.light.text,
            border: modalPalette.light.border,
            overlay: modalPalette.light.overlay,
            shadow: modalPalette.light.shadow,
          },
          dark: {
            bg: modalPalette.dark.bg,
            text: modalPalette.dark.text,
            border: modalPalette.dark.border,
            overlay: modalPalette.dark.overlay,
            shadow: modalPalette.dark.shadow,
          }
        },
        table: {
          header: {
            light: {
              bg: tablePalette.header.light.bg,
              text: tablePalette.header.light.text,
              border: tablePalette.header.light.border,
            },
            dark: {
              bg: tablePalette.header.dark.bg,
              text: tablePalette.header.dark.text,
              border: tablePalette.header.dark.border,
            }
          },
          row: {
            light: {
              bg: tablePalette.row.light.bg,
              text: tablePalette.row.light.text,
              border: tablePalette.row.light.border,
              hover: tablePalette.row.light.hover,
              shadow: tablePalette.row.light.shadow,
              hoverShadow: tablePalette.row.light.hoverShadow,
              statusAlive: statusColors.alive.light,
              statusAliveText: statusColors.alive.light,
              statusDead: statusColors.dead.light,
              statusDeadText: statusColors.dead.light,
              statusUnknown: statusColors.unknown.light,
              statusUnknownText: statusColors.unknown.light,
            },
            dark: {
              bg: tablePalette.row.dark.bg,
              text: tablePalette.row.dark.text,
              border: tablePalette.row.dark.border,
              hover: tablePalette.row.dark.hover,
              shadow: tablePalette.row.dark.shadow,
              hoverShadow: tablePalette.row.dark.hoverShadow,
              statusAlive: statusColors.alive.dark,
              statusAliveText: statusColors.alive.dark,
              statusDead: statusColors.dead.dark,
              statusDeadText: statusColors.dead.dark,
              statusUnknown: statusColors.unknown.dark,
              statusUnknownText: statusColors.unknown.dark,
            }
          }
        },
        button: {
          primary: {
            light: {
              bg: buttonPalette.primary.light.bg,
              text: buttonPalette.primary.light.text,
              hover: buttonPalette.primary.light.hover,
              border: buttonPalette.primary.light.border,
            },
            dark: {
              bg: buttonPalette.primary.dark.bg,
              text: buttonPalette.primary.dark.text,
              hover: buttonPalette.primary.dark.hover,
              border: buttonPalette.primary.dark.border,
            }
          },
          secondary: {
            light: {
              bg: buttonPalette.secondary.light.bg,
              text: buttonPalette.secondary.light.text,
              hover: buttonPalette.secondary.light.hover,
              border: buttonPalette.secondary.light.border,
            },
            dark: {
              bg: buttonPalette.secondary.dark.bg,
              text: buttonPalette.secondary.dark.text,
              hover: buttonPalette.secondary.dark.hover,
              border: buttonPalette.secondary.dark.border,
            }
          },
          danger: {
            light: {
              bg: buttonPalette.danger.light.bg,
              text: buttonPalette.danger.light.text,
              hover: buttonPalette.danger.light.hover,
              border: buttonPalette.danger.light.border,
            },
            dark: {
              bg: buttonPalette.danger.dark.bg,
              text: buttonPalette.danger.dark.text,
              hover: buttonPalette.danger.dark.hover,
              border: buttonPalette.danger.dark.border,
            }
          }
        },
        border: {
          light: mainColors[2],
          dark: palette[6],
        },
        filter: {
          light: {
            bg: filterPalette.light.bg,
            text: filterPalette.light.text,
            border: filterPalette.light.border,
            hover: filterPalette.light.hover,
            focus: {
              border: filterPalette.light.focus.border,
              shadow: filterPalette.light.focus.shadow,
            },
            placeholder: filterPalette.light.placeholder,
            label: filterPalette.light.label,
          },
          dark: {
            bg: filterPalette.dark.bg,
            text: filterPalette.dark.text,
            border: filterPalette.dark.border,
            hover: filterPalette.dark.hover,
            focus: {
              border: filterPalette.dark.focus.border,
              shadow: filterPalette.dark.focus.shadow,
            },
            placeholder: filterPalette.dark.placeholder,
            label: filterPalette.dark.label,
          }
        },
      },
    },
  },
  plugins: [],
} 