const palette = {
    0: "#E2F3FD",
    0.5: "#CCE2EF",
    1: "#B7D1E1",
    1.5: "#A1C1D3",
    2: "#8BB0C5",
    3: "#608EA9",
    4: "#346D8D",
    5: "#094B71",
    6: "#073C5A",
    7: "#052D44",
    8: "#041E2D",
    8.5: "#031722",
    9: "#020F17",
    9.5: "#010B11",
    10: "#000000"
};

const mainColors = {
    0: "#FFFFFF",
    1: "#F5F5F5",
    2: "#E5E7EB",
    3: "#D1D5DB",
    4: "#9CA3AF",
    5: "#6B7280",
    6: "#374151",
}

const statusColors = {
    alive: {
        light: "#10B981",
        dark: "#10B981"
    },
    dead: {
        light: "#EF4444",
        dark: "#EF4444"
    },
    unknown: {
        light: "#6B7280",
        dark: "#6B7280"
    }
}

const tablePalette = {
    header: {
        light: {
            bg: palette[5],         
            text: mainColors[0],    
            border: palette[5],     
        },
        dark: {
            bg: palette[5],         
            text: mainColors[1],    
            border: palette[6],     
        }
    },
    row: {
        light: {
            bg: palette[0],         
            text: palette[7],       
            border: palette[0.5],   
            hover: palette[2],      
            shadow: '0 2px 8px 0 rgba(0,0,0,0.2)',
            hoverShadow: '0 4px 24px 0 rgba(59, 130, 246, 0.4)',
        },
        dark: {
            bg: palette[2],         
            text: mainColors[0],    
            border: palette[6],     
            hover: palette[0],      
            shadow: '0 2px 8px 0 rgb(255, 255, 255, 0.1)',
            hoverShadow: '0 4px 24px 0 rgba(255, 255, 255, 0.2)',
        }
    }
};

const buttonPalette = {
  primary: {
    light: {
      bg: palette[5],
      text: mainColors[0],
      hover: palette[6],
      border: palette[7]
    },
    dark: {
      bg: palette[0],
      text: palette[5],
      hover: palette[0.5],
      border: palette[5]
    }
  },
  secondary: {
    light: {
      bg: palette[0],
      text: palette[5],
      hover: palette[0.5],
      border: palette[5]
    },
    dark: {
      bg: palette[5],
      text: mainColors[0],
      hover: palette[6],
      border: palette[7]
    }
  },
  danger: {
    light: {
      bg: "#DC2626",
      text: mainColors[0],
      hover: "#B91C1C",
      border: "#991B1B"
    },
    dark: {
      bg: "#991B1B",
      text: mainColors[0],
      hover: "#DC2626",
      border: "#B91C1B"
    }
  }
};

const headerFooterPalette = {
  header: {
    light: {
      bg: palette[7],         
      text: mainColors[0],    
      border: palette[5],     
      shadow: '0 2px 8px 0 rgba(0,0,0,0.06)'
    },
    dark: {
      bg: palette[7],         
      text: mainColors[0],    
      border: palette[5],     
      shadow: '0 2px 8px 0 rgba(0,0,0,0.12)'
    }
  },
  footer: {
    light: {
      bg: palette[7],         
      text: mainColors[0],    
      border: palette[5],     
      shadow: '0 -2px 8px 0 rgba(0,0,0,0.04)'
    },
    dark: {
      bg: palette[7],         
      text: mainColors[0],    
      border: palette[5],     
      shadow: '0 -2px 8px 0 rgba(0,0,0,0.10)'
    }
  }
};

const modalPalette = {
  light: {
    bg: mainColors[0],           
    text: palette[7],     
    border: palette[0.5], 
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: '0 8px 32px 0 rgba(0,0,0,0.12)'
  },
  dark: {
    bg: palette[2],              
    text: mainColors[0],         
    border: palette[6],          
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: '0 8px 32px 0 rgba(0,0,0,0.32)'
  }
};

const filterPalette = {
  light: {
    bg: mainColors[0],           
    text: palette[7],            
    border: mainColors[2],       
    hover: mainColors[1],        
    focus: {
      border: palette[3],        
    },
    placeholder: mainColors[4],  
    label: palette[6],           
  },
  dark: {
    bg: palette[9],              
    text: mainColors[0],         
    border: palette[6],          
    hover: palette[3],           
    focus: {
      border: palette[4],        
      shadow: '0 0 0 2px rgba(52, 109, 141, 0.2)'
    },
    placeholder: palette[4],     
    label: mainColors[0],        
  }
};

module.exports = { palette, mainColors, buttonPalette, tablePalette, headerFooterPalette, modalPalette, filterPalette, statusColors }; 
