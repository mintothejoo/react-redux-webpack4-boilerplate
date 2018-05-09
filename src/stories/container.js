import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Home } from '../containers';

storiesOf('My Container', module).add('to Storybook', () => <Home />);
