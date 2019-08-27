import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDatetime from 'react-datetime';
import 'moment/locale/ru';
import 'moment/locale/uk';
import 'moment/locale/en-au';
import { getProductsByDayAction } from '../../../redux/actions/productActions';
import { setDateAction } from '../../../redux/actions/datePickerActions'

import styles from './DatePicker.module.css';

const DatePicker = () => {
  const dispatch = useDispatch();
  const date = useSelector(state => state.datePicker.date)

  const getProductsByDay = (token, date) => dispatch(getProductsByDayAction(token, date));
  const setDate = date => dispatch(setDateAction(date))
  const token = localStorage.getItem('userToken');
  const [isDatePickerOpen, toogleIsDatePeckerOpen] = useState(false)


  const dateInputValue = () => {
    const month = String(date.getMonth() + 1).length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = String(date.getDate()).length === 1 ? `0${date.getDate()}` : date.getDate()
    const inputDate = day + '.' + month + '.' + date.getFullYear()
    return inputDate
  }

  useEffect(() => {
    setDate(new Date())
  }, []);

  const handleDateClick = e => {
    if (typeof e === 'object') {
      setDate(e._d);
      getProductsByDay(token, e._d.toISOString());
      toogleIsDatePeckerOpen(prev => !prev)
    }
  };



  const labelStyles = {
    position: "absolute",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    height: "1px",
    width: "1px",
    margin: "-1px",
    padding: "0",
    border: "0"
  }

  return (
    <div className={styles.datePicker_wrapper}>
      <label
        htmlFor="date"
        className={styles.date_label}
      >
        Дата
        </label>
      <input
        id="date"
        type="text"
        value={dateInputValue()}
        onClick={() => toogleIsDatePeckerOpen(prev => !prev)}
        readOnly
        className={styles[`form-control`]}
      />

      <ReactDatetime
        value={date}
        locale={window.navigator.language}
        closeOnSelect
        onChange={handleDateClick}
        input={false}
        open={isDatePickerOpen}
      />
      <i className={styles.datePicker_icon} />
    </div >
  );
};

export default DatePicker;


