import { Input } from "antd";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
const { Password } = Input;

interface Props {
  control: Control<any>;
  icon?: any;
  label?: string;
  name: string;
  type: "password";
  required?: boolean;
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: "on" | "off";
}

const TextInputPassword: React.FC<Props> = ({
  control,
  icon,
  label = "",
  type,
  name,
  errors,
  placeholder = "",
  autoComplete,
  required,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <>
      {label ? (
        <label className="mb-2 block text-sm font-bold" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Password
            className={`dark:border-gray-800 dark:bg-[#121212] dark:text-white  dark:placeholder:text-gray-500 ${
              errors?.[name]?.message ? "border-red-500" : ""
            }`}
            size="large"
            type={type}
            id={name}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            status={errors?.[name]?.message ? "error" : ""}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            {...field}
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

export { TextInputPassword };
