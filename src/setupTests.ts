import 'jest-dom/extend-expect';
import 'jest-styled-components';

// Getting same icon in test
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faClock,
  faFileAlt,
  faFolder,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

library.add(faClock, faUsers, faFolder, faFileAlt);
