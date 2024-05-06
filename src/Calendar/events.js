function getEvents(listView) {
  const events = [
    {
      title: "New Year's Day",
      date: "2024-01-01",
      backgroundColor: "lightgreen",
      textColor: "#000",
      classNames: [
        "holiday-event",
        listView === "listYear" ? "small" : "large",
      ],
    },
    {
      title: "Republic Day",
      date: "2024-01-26",
      backgroundColor: "lightgreen",
      textColor: "#000",
      classNames: [
        "holiday-event",
        listView === "listYear" ? "small" : "large",
      ],
    },
    {
      title: "Ugadi",
      date: "2024-04-09",
      backgroundColor: "lightgreen",
      textColor: "#000",
      classNames: [
        "holiday-event",
        listView === "listYear" ? "small" : "large",
      ],
    },
    {
      title: "Captain Jack Sparrow's Birthday",
      date: "2024-06-09",
      backgroundColor: "gold",
      textColor: "#333",
      classNames: [
        "holiday-event",
        listView === "listYear" ? "small" : "large",
      ],
    },
    {
      title: "Bakrid",
      date: "2024-06-17",
      backgroundColor: "cyan",
      textColor: "#000",
      classNames: [
        "holiday-event",
        listView === "listYear" ? "small" : "large",
      ],
    },
    {
      title: "Independence Day",
      date: "2024-08-15",
      backgroundColor: "cyan",
      textColor: "#000",
      classNames: [
        "holiday-event",
        listView === "listYear" ? "small" : "large",
      ],
    },
    {
        title: "Gandhi Jayanti",
        date: "2024-10-02",
        backgroundColor: "lightgreen",
        textColor: "#000",
        classNames: [
          "holiday-event",
          listView === "listYear" ? "small" : "large",
        ],
      },
      {
        title: "Diwali",
        date: "2024-10-31",
        backgroundColor: "lightgreen",
        textColor: "#000",
        classNames: [
          "holiday-event",
          listView === "listYear" ? "small" : "large",
        ],
      },
    {
      title: "Christmas",
      date: "2024-12-25",
      backgroundColor: "lightgreen",
      textColor: "#000",
      classNames: [
        "holiday-event",
        listView === "listYear" ? "small" : "large",
      ],
    },
  ];
  return events;
}

export default getEvents;
