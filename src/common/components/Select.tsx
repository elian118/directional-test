import { type ForwardedRef, type SelectHTMLAttributes } from 'react';
import { type Control, Controller } from 'react-hook-form';

interface SelectProps {
  name: string;
  control: Control;
  options: { key: string; value: string; label: string }[];
  noDepOpt?: boolean;
  legend?: string;
  errors?: string;
}

const Select = (
  {
    name,
    control,
    noDepOpt = false,
    options,
    errors,
    legend,
    ...rest
  }: SelectProps & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>,
) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <fieldset className="fieldset">
          {legend && <legend className="pl-2 fieldset-legend">{legend}</legend>}
          <select
            ref={ref}
            name={name}
            defaultValue=""
            className="select"
            {...rest}
            value={field.value}
            onChange={field.onChange}
          >
            {!noDepOpt && <option>전체</option>}
            {options.map((option) => (
              <option key={option.key} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors && <span className="text-error font-medium text-sm px-2">{errors}</span>}
        </fieldset>
      )}
    />
  );
};

export default Select;
