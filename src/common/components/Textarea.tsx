import { type ForwardedRef, forwardRef, type TextareaHTMLAttributes } from 'react';
import { type Control, Controller } from 'react-hook-form';

interface TextareaProps {
  name: string;
  control: Control;
  legend?: string;
  errors?: string;
}

export const Input = (
  { name, control, legend, errors, ...rest }: TextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref: ForwardedRef<HTMLTextAreaElement>,
) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <fieldset className="fieldset">
          {legend && <legend className="pl-2 fieldset-legend">{legend}</legend>}
          <textarea ref={ref} className="textarea" value={field.value} onChange={field.onChange} {...rest} />
          {errors && <span className="text-error font-medium text-sm px-2">{errors}</span>}
        </fieldset>
      )}
    />
  );
};

export default forwardRef(Input);
