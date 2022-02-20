import { Checkbox, Stack } from '@chakra-ui/react';
import { ChangeEventHandler, useState } from 'react';

// I need partial due to initial value in reduce
function getInitialChecked<T extends string>(
  options: readonly T[]
): Partial<Record<T, boolean>> {
  return options.reduce((acc, s) => ({ ...acc, [s]: false }), {});
}

function getCheckedOptions<T extends string>(
  checks: Partial<Record<T, boolean>>
): T[] {
  const entries = Object.entries(checks);
  return entries
    .filter(([_key, value]) => Boolean(value))
    .map(([key, _value]) => key as T);
}

type CheckboxGroupProps<T extends string> = {
  options: readonly T[];
  onChange: (checked: T[]) => void;
};

export default function CheckboxGroup<T extends string>({
  options,
  onChange,
}: CheckboxGroupProps<T>) {
  const [cheked, setChecked] = useState(getInitialChecked(options));
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const updated: Partial<Record<T, boolean>> = {
      ...cheked,
      [e.target.name as T]: e.target.checked,
    };
    setChecked(updated);
    console.log('updated', updated);
    onChange(getCheckedOptions(updated));
  };

  return (
    <Stack
      spacing={4}
      direction={'row'}
      wrap={'wrap'}
      justifyContent={'center'}
    >
      {options.map((option) => (
        <Checkbox
          key={option}
          name={option}
          checked={cheked[option]}
          onChange={handleChange}
        >
          {option}
        </Checkbox>
      ))}
    </Stack>
  );
}
