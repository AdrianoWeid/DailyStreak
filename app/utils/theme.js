import chroma from 'chroma-js';

export function createTheme(input, size = 5) {
  const defaultTheme = createDefaultTheme(size);

  if (input) {
    validateTheme(input, size);

    input.light = input.light ?? defaultTheme.light;
    input.dark = input.dark ?? defaultTheme.dark;

    return {
      light: isColorScale(input.light, size) ? input.light : createColorScale(input.light, size),
      dark: isColorScale(input.dark, size) ? input.dark : createColorScale(input.dark, size),
    };
  }

  return defaultTheme;
}

function createDefaultTheme(size) {
  return {
    light: createColorScale(['hsl(0, 0%, 92%)', 'hsl(0, 0%, 26%)'], size),
    dark: createColorScale(['hsl(0, 0%, 20%)', 'hsl(0, 0%, 92%)'], size),
  };
}

function validateTheme(input, size) {
  if (typeof input !== 'object' || (input.light === undefined && input.dark === undefined)) {
    throw new Error(
      `The theme object must contain at least one of the fields "light" and "dark" with exactly 2 or ${size} colors respectively.`,
    );
  }

  if (input.light) {
    const { length } = input.light;
    if (length !== 2 && length !== size) {
      throw new Error(
        `theme.light must contain exactly 2 or ${size} colors, ${length} passed.`,
      );
    }
  }

  if (input.dark) {
    const { length } = input.dark;
    if (length !== 2 && length !== size) {
      throw new Error(
        `theme.dark must contain exactly 2 or ${size} colors, ${length} passed.`,
      );
    }
  }
}

function isColorScale(colors, size) {
  const invalidColor = colors.find(color => !chroma.valid(color));

  if (invalidColor) {
    throw new Error(`Invalid color "${invalidColor}" passed. All CSS color formats are accepted.`);
  }

  return colors.length === size;
}

function createColorScale(colors, size) {
  return chroma.scale(colors).mode('lch').colors(size);
}
