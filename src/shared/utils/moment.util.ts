import * as moment from 'moment-timezone';
import { DEFAULT_TIMEZONE } from '../constants';

moment.tz(DEFAULT_TIMEZONE).format();
export default moment;
