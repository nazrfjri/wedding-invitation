// src/utils/date.js
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id'; // Bahasa Indonesia

dayjs.extend(relativeTime);
dayjs.locale('id');

export default dayjs;