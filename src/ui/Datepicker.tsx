import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import usePrelineEffect from "@/hooks/usePrelineEffect";
import FormSelect from "./FormSelect";

export enum Month {
  JAN = 0,
  FEB = 1,
  MAR = 2,
  APR = 3,
  MAY = 4,
  JUN = 5,
  JUL = 6,
  AUG = 7,
  SEP = 8,
  OCT = 9,
  NOV = 10,
  DEC = 11,
}

const END_YEAR = new Date().getFullYear();
const YEAR_SPAN = 100;
const START_YEAR = new Date().getFullYear() - YEAR_SPAN;

type DatepickerProps = {
  onChange: (year: number, month: Month, day: number) => void;
};

const Datepicker = ({ onChange }: DatepickerProps) => {
  usePrelineEffect();

  const [selectedMonth, setSelectedMonth] = useState<Month>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState(END_YEAR);

  const daysInMonth = useMemo(() => {
    const lastDayInMonth = new Date(selectedYear, selectedMonth + 1, 0);
    const monthLength = lastDayInMonth.getDate();
    const days = Array.from({ length: monthLength }, (_, i) => i + 1);

    const firstDayInMonth = new Date(selectedYear, selectedMonth, 1);
    const whatDayIsTheFirstDay = firstDayInMonth.getDay(); // For example, Tuesday: 2
    const blanksBeforeTheFirstDay = Array.from(
      {
        length: whatDayIsTheFirstDay,
      },
      (_, i) => -i
    );

    return blanksBeforeTheFirstDay.concat(days);
  }, [selectedMonth, selectedYear]);

  const clickPrevMonth = () => {
    if (selectedMonth === Month.JAN) {
      setSelectedYear((prev) => prev - 1);
    }
    setSelectedMonth((prev) => Math.abs((prev - 1) % 12));
  };

  const clickNextMonth = () => {
    if (selectedMonth === Month.DEC) {
      setSelectedYear((prev) => prev + 1);
    }
    setSelectedMonth((prev) => (prev + 1) % 12);
  };

  const handleClickDay = (day: number) => {
    onChange(selectedYear, selectedMonth, day);
  };

  return (
    <div className="space-y-0.5">
      <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
        {/* Prev Button */}
        <div className="col-span-1">
          <button
            type="button"
            disabled={
              selectedYear === START_YEAR && selectedMonth === Month.JAN
            }
            className="size-8 flex justify-center items-center hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none"
            onClick={clickPrevMonth}
          >
            <ChevronLeft className="flex-shrink-0 size-4" />
          </button>
        </div>

        {/* Month / Year */}
        <div className="col-span-3 flex justify-center items-center gap-x-1">
          <FormSelect
            value={selectedMonth}
            options={[
              // TODO: i18n
              { label: "January", value: Month.JAN },
              { label: "February", value: Month.FEB },
              { label: "March", value: Month.MAR },
              { label: "April", value: Month.APR },
              { label: "May", value: Month.MAY },
              { label: "June", value: Month.JUN },
              { label: "July", value: Month.JUL },
              { label: "August", value: Month.AUG },
              { label: "September", value: Month.SEP },
              { label: "October", value: Month.OCT },
              { label: "November", value: Month.NOV },
              { label: "December", value: Month.DEC },
            ]}
            onChange={(value) => setSelectedMonth(value)}
            dropDownToggleButtonClassName="border-none shadow-none"
            dropDownMenuClassName="max-h-60 overflow-auto"
            icon={null}
          />

          <span className="text-gray-400">/</span>

          <FormSelect
            value={selectedYear}
            options={Array.from({ length: YEAR_SPAN }, (_, i) => ({
              label: `${END_YEAR - i}`,
              value: END_YEAR - i,
            }))}
            onChange={(value) => setSelectedYear(value)}
            dropDownToggleButtonClassName="border-none shadow-none"
            dropDownMenuClassName="max-h-60 overflow-auto"
            icon={null}
          />
        </div>

        {/* Next Button */}
        <div className="col-span-1 flex justify-end">
          <button
            type="button"
            disabled={selectedYear === END_YEAR && selectedMonth === Month.DEC}
            className="size-8 flex justify-center items-center hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none"
            onClick={clickNextMonth}
          >
            <ChevronRight className="flex-shrink-0 size-4" />
          </button>
        </div>
      </div>

      {/* Weeks */}
      <div className="grid grid-cols-7 pb-2 text-center text-sm text-gray-500">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7">
        {daysInMonth.map((day) => {
          return day > 0 ? (
            <button
              key={day}
              type="button"
              className="m-px size-10 flex justify-center items-center border border-transparent text-sm hover:border-ft-brand hover:text-ft-brand rounded-full disabled:text-gray-300 disabled:pointer-events-none"
              onClick={() => handleClickDay(day)}
            >
              {day}
            </button>
          ) : (
            <div key={day} />
          );
        })}
      </div>
    </div>
  );
};

export default Datepicker;
