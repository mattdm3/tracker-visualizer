'use client';
import 'antd-mobile/bundle/css-vars-patch.css';
import { useMemo, useState } from 'react';
import ActivityCards from '../ActivityCards';

import moment, { Moment } from 'moment';

import {
  useActivities,
  useInsertLog,
  useUser,
} from '../utils/react-query-hooks';
import { TimePickerMobile } from '@/components/TimePickerMobile.component';
import { DatePicker } from '@/components/DatePicker.component';
import { DuractionSelector } from '@/components/DurationSelector.component';

const dateFormat = 'MM/DD/YYYY';

export default function TrackPage() {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const [selectedTime, setSelectedTime] = useState<string>(
    moment().format('h, mm, A')
  );
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<string | []>([]);
  const { activities, isLoading } = useActivities();

  const { mutate } = useInsertLog({
    onSuccess: () => {
      setSelectedActivity(null);
      setDurationMinutes(null);
    },
  });

  const { user } = useUser();

  const handleSubmitLog = () => {
    const startTime = selectedDate.set({
      hour: Number(selectedTime.split(':')[0]),
      minute: Number(selectedTime.split(':')[1]),
    });

    mutate({
      activity: selectedActivity as string,
      duration: durationMinutes as string,
      start_time: startTime.toISOString(),
      end_time: startTime
        .add(durationMinutes as string, 'minutes')
        .toISOString(),
      email: user.data.user.email,
    });
  };

  const summary = useMemo(() => {
    if (!selectedActivity || !durationMinutes) return null;
    const colour = activities.find(
      (activity) => activity.name === selectedActivity
    )?.colour;
    return (
      <div>
        <h3 className="text-lg w-max">
          <span
            style={{
              borderBottom: `2px solid ${colour}`,
            }}
            className="font-bold "
          >
            {selectedActivity}
          </span>{' '}
          for <span className="font-bold">{durationMinutes}</span> minutes at{' '}
          <span className="font-bold">{selectedTime}</span>
        </h3>
      </div>
    );
  }, [selectedActivity, durationMinutes, selectedTime]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">Log an Activity</h3>
      <div className="my-3">
        <TimePickerMobile setSelectedTime={setSelectedTime} />
        <div className="text-center ">
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dateFormat={dateFormat}
          />
        </div>

        <div className="py-1">
          <DuractionSelector
            durationMinutes={durationMinutes}
            setDurationMinutes={setDurationMinutes}
          />
        </div>
      </div>
      <ActivityCards
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
        small={false}
        activities={activities}
      />
      <div className="flex items-center mt-3 justify-between w-full">
        {summary}
        {summary && (
          <button
            onClick={() => handleSubmitLog()}
            className="w-24 bg-slate-500 hover:bg-slate-400 rounded-sm text-white hover:text-white"
          >
            Log
          </button>
        )}
      </div>
    </div>
  );
}
