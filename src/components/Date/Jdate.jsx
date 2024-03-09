// import moment from 'moment-jalaali';
import * as moment from 'jalali-moment';
function JDate({  }) {
  const currentDate = new Date();

    const persianDate = moment(currentDate, 'YYYY-MM-DD').locale('fa').format('dddd jYYYY/jMM/jDD');
    return (persianDate);
  }
export default JDate;