import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { type Control, Controller, type ControllerRenderProps, type FieldValues } from 'react-hook-form';

interface DatePickerProps {
  name: string;
  control: Control;
  errors?: string;
  legend?: string;
}

const DatePicker = ({ name, control, legend, errors }: DatePickerProps) => {
  const formattedDate = (field: ControllerRenderProps<FieldValues, string>) =>
    field.value?.from && field.value?.to
      ? `${format(field.value.from, 'yyyy.MM.dd')} ~ ${format(field.value.to, 'yyyy.MM.dd')}`
      : '날짜를 선택하세요';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <fieldset className="fieldset">
          {legend && <legend className="pl-2 fieldset-legend">{legend}</legend>}
          <button
            name={name}
            type="button"
            popoverTarget="rdp-popover"
            className="input input-border"
            style={{ anchorName: '--rdp' } as React.CSSProperties}
          >
            {formattedDate(field)}
          </button>
          {errors && <span className="text-error font-medium text-sm px-2">{errors}</span>}
          <div
            popover="auto"
            id="rdp-popover"
            className="dropdown"
            style={{ positionAnchor: '--rdp' } as React.CSSProperties}
          >
            <DayPicker className="react-day-picker" mode="range" selected={field.value} onSelect={field.onChange} />
          </div>
        </fieldset>
      )}
    />
  );
};

export default DatePicker;
