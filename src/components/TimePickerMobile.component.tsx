'use strict';

import { PickerView } from 'antd-mobile';
import moment from 'moment';
import { useMemo } from 'react';

const MINUTES = Array.from({ length: 60 }, (_, i) => {
  const val = i < 10 ? '0' + i.toString() : i.toString();
  return { label: val, value: val };
});
const HOURS = Array.from({ length: 12 }, (_, i) => {
  const val = (i + 1).toString();
  return { label: val, value: val };
});

export function TimePickerMobile({ setSelectedTime }) {
  const initialTime = useMemo(() => {
    return moment().format('h, mm, A').split(',');
  }, []);

  return (
    <>
      <p className="mt-3 text-md text-slate-500">When?</p>
      <PickerView
        mouseWheel
        className="h-32"
        defaultValue={initialTime}
        onChange={(val, extend) => {
          setSelectedTime(`${val[0]}:${val[1]} ${val[2]}`);
        }}
        columns={[
          HOURS,
          MINUTES,
          [
            { label: 'AM', value: 'AM' },
            { label: 'PM', value: 'PM' },
          ],
        ]}
      />
    </>
  );
}
