import React from 'react';
import { DatePicker as NextUIDatePicker } from '@nextui-org/react';
import { startOfWeek, startOfMonth, getLocalTimeZone, today } from "@internationalized/date";
import { useLocale, useDateFormatter } from "@react-aria/i18n";
import { Button, ButtonGroup } from '@nextui-org/react';
import { RadioGroup } from '@nextui-org/react';

const DatePickerComponent = ({ label, value, onChange, maxValue }) => {
  const { locale } = useLocale();
  const formatter = useDateFormatter({ dateStyle: "full" });

  let now = today(getLocalTimeZone());
  let nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
  let nextMonth = startOfMonth(now.add({ months: 1 }));

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    onChange(formattedDate);
    };
    
    const CustomRadio = (props) => {
        const { children, ...otherProps } = props;
    }
  return (
    <NextUIDatePicker
      label={label}
      variant="bordered"
      labelPlacement="outside"
      className="rounded-xl"
      maxValue={maxValue}
      value={value}
      onChange={handleDateChange}
      CalendarBottomContent={
        <RadioGroup
          aria-label="Date precision"
          classNames={{
            base: "w-full pb-2",
            wrapper: "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[380px] overflow-x-scroll",
          }}
          defaultValue="exact_dates"
          orientation="horizontal"
        >
          <CustomRadio value="exact_dates">Exact dates</CustomRadio>
          <CustomRadio value="1_day">1 day</CustomRadio>
          <CustomRadio value="2_days">2 days</CustomRadio>
          <CustomRadio value="3_days">3 days</CustomRadio>
          <CustomRadio value="7_days">7 days</CustomRadio>
          <CustomRadio value="14_days">14 days</CustomRadio>
        </RadioGroup>
      }
      CalendarTopContent={
        <ButtonGroup
          fullWidth
          className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
          radius="full"
          size="sm"
          variant="bordered"
        >
          <Button onPress={() => handleDateChange(now)}>Today</Button>
          <Button onPress={() => handleDateChange(nextWeek)}>Next week</Button>
          <Button onPress={() => handleDateChange(nextMonth)}>Next month</Button>
        </ButtonGroup>
      }
    />
  );
};

export default DatePickerComponent;