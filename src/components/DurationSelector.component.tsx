import { Selector } from 'antd-mobile';
export function DuractionSelector({ durationMinutes, setDurationMinutes }) {
  return (
    <>
      <p className="mt-3 text-md text-slate-500">How Long?</p>
      <Selector
        columns={5}
        options={[
          { label: 15, value: '15' },
          { label: 30, value: '30' },
          { label: '45m', value: '45' },
          { label: '1h', value: '60' },
          { label: '1.5h', value: '90' },
        ]}
        value={durationMinutes as string[]}
        defaultValue={[] as string[]}
        className="justify-apart flex w-full rounded-md flex-col mt-3"
        onChange={(val, extend) => {
          setDurationMinutes(val[0]);
        }}
      />
    </>
  );
}
