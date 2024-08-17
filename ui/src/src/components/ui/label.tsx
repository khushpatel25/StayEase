import * as React from 'react';

import {cn} from '@src/lib/utils';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({className, htmlFor, ...props}, ref) => {
    return (
      <label
        htmlFor={htmlFor}
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className,
        )}
        {...props}
      />
    );
  },
);
Label.displayName = 'Label';

export {Label};
