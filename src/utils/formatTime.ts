import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const formatTime = (time: number, utcTime: number, format?: string): string => {
  dayjs.extend(utc);
  const _format = format ? format : 'YYYY/MM/DD HH:mm';
  return dayjs.unix(time).utcOffset(utcTime).format(_format);
};

export default formatTime;
