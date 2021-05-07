var calendar = new tui.Calendar('#calendar', {
    defaultView: 'week',
    taskView: ['task'],
    scheduleView: false
  });

  calendar.createSchedules([
    {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2021-05-07T15:53:52.974Z',
        end: '2021-05-07T15:53:52.974Z'
    },
    {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2021-05-06T13:53:52.974Z',
        end: '2021-05-06T16:53:52.974Z',
        isReadOnly: true    // schedule is read-only
    }
]);