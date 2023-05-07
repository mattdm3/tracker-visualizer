import generatePicker from 'antd/es/date-picker/generatePicker';
import { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';

const DatePickerGenerated = generatePicker<Moment>(momentGenerateConfig);

export function DatePicker({ selectedDate, setSelectedDate, dateFormat }) {
  return (
    <DatePickerGenerated
      bordered={false}
      defaultValue={selectedDate}
      format={dateFormat}
      onChange={setSelectedDate}
    />
  );
}
