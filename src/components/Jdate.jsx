// import moment from 'moment-jalaali';
import * as moment from 'jalali-moment';
function JDate({ date }) {
    const persianDate = moment(date, 'YYYY-MM-DD').locale('fa').format('dddd jYYYY/jMM/jDD');
    return (persianDate);
  }
export default JDate;