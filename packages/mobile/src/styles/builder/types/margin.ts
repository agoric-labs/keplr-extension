export type StyleBuilderMarginAllDefinitions<
  Sizes extends Record<string, string | number>
> = {
  [K in keyof Sizes as `margin-${string & K}`]: {
    margin: string;
  };
};

export type StyleBuilderMarginLeftDefinitions<
  Sizes extends Record<string, string | number>
> = {
  [K in keyof Sizes as `margin-left-${string & K}`]: {
    marginLeft: string;
  };
};

export type StyleBuilderMarginRightDefinitions<
  Sizes extends Record<string, string | number>
> = {
  [K in keyof Sizes as `margin-right-${string & K}`]: {
    marginRight: string;
  };
};

export type StyleBuilderMarginTopDefinitions<
  Sizes extends Record<string, string | number>
> = {
  [K in keyof Sizes as `margin-top-${string & K}`]: {
    marginTop: string;
  };
};

export type StyleBuilderMarginBottomDefinitions<
  Sizes extends Record<string, string | number>
> = {
  [K in keyof Sizes as `margin-bottom-${string & K}`]: {
    marginBottom: string;
  };
};

export type StyleBuilderMarginXDefinitions<
  Sizes extends Record<string, string | number>
> = {
  [K in keyof Sizes as `margin-x-${string & K}`]: {
    marginLeft: string;
    marginRight: string;
  };
};

export type StyleBuilderMarginYDefinitions<
  Sizes extends Record<string, string | number>
> = {
  [K in keyof Sizes as `margin-y-${string & K}`]: {
    marginTop: string;
    marginBottom: string;
  };
};

export type StyleBuilderMarginDefinitions<
  Sizes extends Record<string, string | number>
> = StyleBuilderMarginAllDefinitions<Sizes> &
  StyleBuilderMarginLeftDefinitions<Sizes> &
  StyleBuilderMarginRightDefinitions<Sizes> &
  StyleBuilderMarginTopDefinitions<Sizes> &
  StyleBuilderMarginBottomDefinitions<Sizes> &
  StyleBuilderMarginXDefinitions<Sizes> &
  StyleBuilderMarginYDefinitions<Sizes>;
