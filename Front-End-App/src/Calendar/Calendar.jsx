import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import calendarEvents from "./events.json";
import FestivalToolTip from "./FestivalToolTip";
import "./Calendar.css";
function Calendar() {

  const [listView, setListView] = useState("listMonth");

  const handleDatesSet = (arg) => {
    switch (arg.view.type) {
      case "dayGridMonth":
        setListView("listMonth");
        break;
      case "multiMonthYear":
        setListView("listYear");
        break;
      case "timeGridWeek":
        setListView("listWeek");
        break;
      case "timeGridDay":
        setListView("listDay");
        break;
      default:
        setListView("listMonth");
        break;
    }
  };
  useEffect(() => {
    document.title = 'Calendar';
  }, []);

  return (

    <div>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin,
          multiMonthPlugin,
        ]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today,prevYear,prev,next,nextYear",
          center: "title",
          end: `multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,${listView}`,
        }}
        titleFormat={{ year: "numeric", month: "long", day: "numeric" }}
        buttonText={{
          today: "TODAY",
          year: "Year",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "Events",
        }}
        buttonIcons={{
          prev: "chevron-left",
          next: "chevron-right",
          prevYear: "chevrons-left",
          nextYear: "chevrons-right",
        }}
        events={calendarEvents.map(event => {
          let temp = JSON.parse(JSON.stringify(event));
          temp.classNames.push(listView === "listYear" ? "small" : "large");
          return temp;
        })}
        datesSet={handleDatesSet}
        height={"80vh"}
        eventContent={(arg, createElement) => {
          const titleHtml = createElement('span', {}, arg.event.title);
          return (
            <FestivalToolTip props={{
              ...arg.event.extendedProps,
              title: arg.event.title,
            }}>
              {titleHtml}
            </FestivalToolTip>
          );
        }}
      />
    </div>
  );
}

export default Calendar;