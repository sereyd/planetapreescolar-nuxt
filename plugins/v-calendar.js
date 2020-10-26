import Vue from 'vue';
import VCalendar from 'v-calendar';

// // Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
  datePickerTintColor: '#AD227D',                // ...other defaults
  locale: 'es' // Spanish
});


// import Vue from 'vue'
// import Vcalendar from 'v-calendar'

// import 'v-calendar/lib/v-calendar.min.css';
// Vue.use(VCalendar, {             // second is optional
//   datePickerTintColor: '#AD227D',
//   datePickerShowDayPopover: false
// })