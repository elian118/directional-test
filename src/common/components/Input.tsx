import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from 'react';
import { type Control, Controller } from 'react-hook-form';

interface InputProps {
  name: string;
  control: Control;
  legend?: string;
  errors?: string;
}

export const Input = (
  { name, control, legend, errors, ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <fieldset className="fieldset">
          {legend && <legend className="pl-2 fieldset-legend">{legend}</legend>}
          <input ref={ref} className="input" value={field.value} onChange={field.onChange} {...rest} />
          {errors && <span className="text-error font-medium text-sm px-2">{errors}</span>}
        </fieldset>
      )}
    />
  );
};

export default forwardRef(Input);
