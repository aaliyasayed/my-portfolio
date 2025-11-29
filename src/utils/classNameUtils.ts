import classNames from 'classnames';

/**
 * Creates a className string that combines the base style with conditional styles
 * @param baseStyle - The base style class
 * @param conditionalStyles - An object with class names as keys and boolean conditions as values
 * @param additionalClasses - Optional additional classes to include
 * @returns A className string
 */
export const createClassNames = (
  baseStyle: string,
  conditionalStyles: Record<string, boolean> = {},
  additionalClasses?: string | string[]
) => {
  return classNames(baseStyle, conditionalStyles, additionalClasses);
};

/**
 * Creates a responsive className string that applies different classes based on responsive states
 * @param styles - An object containing the CSS module styles
 * @param baseClass - The base class name
 * @param responsive - Whether to append responsive classes (e.g., sm, md, lg)
 * @returns A className string with responsive variants
 */
export const responsiveClassNames = (
  styles: Record<string, string>,
  baseClass: string,
  responsive = true
) => {
  if (!responsive) {
    return styles[baseClass];
  }

  return classNames(
    styles[baseClass],
    styles[`${baseClass}Sm`],
    styles[`${baseClass}Md`],
    styles[`${baseClass}Lg`],
    styles[`${baseClass}Xl`]
  );
};

/**
 * Creates a className string for a component with states (active, disabled, etc.)
 * @param styles - An object containing the CSS module styles
 * @param baseClass - The base class name
 * @param isActive - Whether the component is in active state
 * @param isDisabled - Whether the component is in disabled state
 * @param customClass - Optional custom class to include
 * @returns A className string
 */
export const stateClassNames = (
  styles: Record<string, string>,
  baseClass: string,
  isActive = false,
  isDisabled = false,
  customClass?: string
) => {
  return classNames(
    styles[baseClass],
    {
      [styles[`${baseClass}Active`]]: isActive,
      [styles[`${baseClass}Disabled`]]: isDisabled
    },
    customClass
  );
}; 