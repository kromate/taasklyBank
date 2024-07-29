export type Booking = {
  id: string;
  user_id: string;
  availability_id: string;
  name: string;
  desc: string;
  availability_name: string;
  price: number;
  created_at: string;
  duration: number;
  updated_at: string;
  public: boolean;
};

export type UserWithBookings = {
  id: string;
  username: string;
  name: string;
  bio: string;
  photo_url: string;
  bookingTypes: Booking[];
};



interface Contact {
  name: string;
  email: string;
  phone: string;
}

interface SelectedDate {
  calendar: {
    identifier: string;
  };
  era: string;
  year: number;
  month: number;
  day: number;
}

interface SelectedTime {
  name: string;
  value: string;
  index: number;
}

export interface ScheduledBooking {
  contact: Contact;
  notes: string;
  selectedDate: SelectedDate;
  selectedTime: SelectedTime;
  date: string;
  time: string;
  duration: number;
  availability_id: string;
  bookingType_id: string;
  price: number;
  user_id: string;
  booking_desc: string;
  booking_name: string;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface UserContact {
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  bookings: string[];
  booking_count: number;
}

export interface GoogleCalendarCredentials {
  id: string;
  access_token: string;
  refresh_token: string;
  email: string;
  expiry_date: number; // Assuming expiry_date is a millisecond timestamp
  created_at: string;
  updated_at: string;
}
