import React from 'react';
import * as Icons from '..';

const Icon = ({ icon, ...rest }) => {
  let Svg = Icons[icon];

  return <Svg {...rest} />;
};

export default Icon;
