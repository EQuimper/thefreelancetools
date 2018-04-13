import * as styledComponents from 'styled-components';

import { ThemedStyledComponentsModule } from 'styled-components';

import { ThemeInterface } from '@freelance-tool/types';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export { css, injectGlobal, keyframes, ThemeProvider, styled };
