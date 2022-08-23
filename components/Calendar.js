import { useMemo } from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = ({ onDayPress, selected }) => {
  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "blue",
        selectedTextColor: "white",
      },
    };
  }, [selected]);
  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        marginVertical: 10,
        overflow: "scroll",
      }}
      date={"2022-08-20"}
      current={"2022-08-20"}
      markedDates={marked}
      onDayPress={onDayPress}
      collapsable={true}
    />
  );
};

export default CustomCalendar;
