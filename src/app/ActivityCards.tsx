import classNames from 'classnames';
export default function ActivityCards({
  activities,
  small,
  selectedActivity,
  setSelectedActivity,
}: {
  activities: any;
  small?: boolean;
  selectedActivity?: string;
  setSelectedActivity?: (activity: string) => void;
}) {
  if (!activities) return <></>;

  return (
    <div className="flex flex-wrap  gap-3">
      {activities.map((activity) => {
        const classes = classNames(
          `border  rounded-lg   mb-3  p-3 flex  justify-center wrap items-center`,
          {
            'w-20 h-12 space-x-1 flex-row': small,
            'w-20 h-20 flex-grow  flex-col shadow-md cursor-pointer transition-all duration-10 border border-transparent hover:border-slate-300 border-4':
              !small,
            'border-slate-300 border-4': selectedActivity === activity.name,
          }
        );
        return (
          <div
            key={activity.name}
            onClick={() =>
              setSelectedActivity ? setSelectedActivity(activity.name) : null
            }
            style={{ maxWidth: '24rem', background: activity.colour }}
            className={classes}
          >
            {!small && <p>{activity.emoji}</p>}
            <h1>{activity.name}</h1>
            {small && (
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: activity.colour }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
