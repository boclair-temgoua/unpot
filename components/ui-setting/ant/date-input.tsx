import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
}

const DateInput: React.FC<Props> = ({
  control,
  label = "",
  name,
  errors,
  placeholder = "",
}) => {
  return (
    <>
      {label ? <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={name}>
        {label}
      </label> : null}
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <DatePicker
            picker="date"
            size="large"
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            id={name}
            placeholder={placeholder}
            value={dayjs(field.value ?? new Date())}
            onChange={(value) => {
              field.onChange(value);
            }}
            status={errors?.[name]?.message ? "error" : ""}
          />
        )}
      />
      {errors?.[name] && (
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { DateInput };
