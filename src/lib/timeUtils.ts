/**
 * Time utilities for filtering services by current day/time
 */

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface ServiceSchedule {
  dayOfWeek: DayOfWeek;
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
}

interface ServiceWithSchedule {
  _id: string;
  title: string;
  scheduleStructured?: ServiceSchedule[];
  [key: string]: any;
}

/**
 * Get current day of week in lowercase format
 */
export function getCurrentDay(): DayOfWeek {
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

/**
 * Get current time in minutes since midnight
 */
export function getCurrentTimeInMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/**
 * Convert HH:MM string to minutes since midnight
 */
export function timeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Check if a service is running RIGHT NOW
 */
export function isServiceRunningNow(schedules: ServiceSchedule[]): boolean {
  if (!schedules || schedules.length === 0) return false;

  const currentDay = getCurrentDay();
  const currentTime = getCurrentTimeInMinutes();

  return schedules.some(schedule => {
    if (schedule.dayOfWeek !== currentDay) return false;

    const startTime = timeToMinutes(schedule.startTime);
    const endTime = timeToMinutes(schedule.endTime);

    return currentTime >= startTime && currentTime <= endTime;
  });
}

/**
 * Get services running later today (after current time)
 */
export function getServicesLaterToday(services: ServiceWithSchedule[]): ServiceWithSchedule[] {
  const currentDay = getCurrentDay();
  const currentTime = getCurrentTimeInMinutes();

  return services
    .filter(service => {
      if (!service.scheduleStructured) return false;

      return service.scheduleStructured.some(schedule => {
        if (schedule.dayOfWeek !== currentDay) return false;
        const startTime = timeToMinutes(schedule.startTime);
        return startTime > currentTime;
      });
    })
    .sort((a, b) => {
      // Sort by earliest start time today
      const aStart = Math.min(...a.scheduleStructured!
        .filter(s => s.dayOfWeek === currentDay)
        .map(s => timeToMinutes(s.startTime)));
      const bStart = Math.min(...b.scheduleStructured!
        .filter(s => s.dayOfWeek === currentDay)
        .map(s => timeToMinutes(s.startTime)));
      return aStart - bStart;
    });
}

/**
 * Get the next day's name
 */
export function getNextDay(day: DayOfWeek): DayOfWeek {
  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const currentIndex = days.indexOf(day);
  const nextIndex = (currentIndex + 1) % 7;
  return days[nextIndex];
}

/**
 * Get earliest service tomorrow
 */
export function getEarliestServiceTomorrow(services: ServiceWithSchedule[]): ServiceWithSchedule | null {
  const tomorrow = getNextDay(getCurrentDay());

  const tomorrowServices = services.filter(service => {
    return service.scheduleStructured?.some(s => s.dayOfWeek === tomorrow);
  });

  if (tomorrowServices.length === 0) return null;

  return tomorrowServices.sort((a, b) => {
    const aStart = Math.min(...a.scheduleStructured!
      .filter(s => s.dayOfWeek === tomorrow)
      .map(s => timeToMinutes(s.startTime)));
    const bStart = Math.min(...b.scheduleStructured!
      .filter(s => s.dayOfWeek === tomorrow)
      .map(s => timeToMinutes(s.startTime)));
    return aStart - bStart;
  })[0];
}

/**
 * Get human-readable time from HH:MM (e.g., "10:00" -> "10am")
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number);

  if (hours === 0) return `12:${minutes.toString().padStart(2, '0')}am`;
  if (hours < 12) return `${hours}:${minutes.toString().padStart(2, '0')}am`;
  if (hours === 12) return `12:${minutes.toString().padStart(2, '0')}pm`;
  return `${hours - 12}:${minutes.toString().padStart(2, '0')}pm`;
}

/**
 * Get display text for a schedule (e.g., "10am - 2pm")
 */
export function getScheduleDisplayText(schedule: ServiceSchedule): string {
  return `${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}`;
}

/**
 * Get day name for display
 */
function getDayName(day: DayOfWeek): string {
  const dayNames: Record<DayOfWeek, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };
  return dayNames[day];
}

/**
 * Get services for a specific day, sorted by start time
 */
function getServicesForDay(services: ServiceWithSchedule[], day: DayOfWeek): Array<{
  service: ServiceWithSchedule;
  schedule: ServiceSchedule;
}> {
  const results: Array<{ service: ServiceWithSchedule; schedule: ServiceSchedule }> = [];

  for (const service of services) {
    if (!service.scheduleStructured) continue;

    for (const schedule of service.scheduleStructured) {
      if (schedule.dayOfWeek === day) {
        results.push({ service, schedule });
      }
    }
  }

  // Sort by start time
  return results.sort((a, b) =>
    timeToMinutes(a.schedule.startTime) - timeToMinutes(b.schedule.startTime)
  );
}

/**
 * Get MULTIPLE upcoming services (for "What's On" section)
 * Returns up to `count` services with their status and time info
 */
export function getUpcomingServices(services: ServiceWithSchedule[], count: number = 3): Array<{
  service: ServiceWithSchedule;
  status: 'running-now' | 'later-today' | 'tomorrow' | 'upcoming';
  timeText: string;
  dayText: string;
  schedule: ServiceSchedule;
}> {
  const results: Array<{
    service: ServiceWithSchedule;
    status: 'running-now' | 'later-today' | 'tomorrow' | 'upcoming';
    timeText: string;
    dayText: string;
    schedule: ServiceSchedule;
  }> = [];

  const scheduledServices = services.filter(
    s => s.scheduleStructured && s.scheduleStructured.length > 0
  );

  if (scheduledServices.length === 0) return results;

  const currentDay = getCurrentDay();
  const currentTime = getCurrentTimeInMinutes();
  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Track which service+schedule combos we've added to avoid duplicates
  const addedKeys = new Set<string>();

  // 1. Check for services running NOW
  for (const service of scheduledServices) {
    if (results.length >= count) break;

    for (const schedule of service.scheduleStructured!) {
      if (schedule.dayOfWeek !== currentDay) continue;

      const startTime = timeToMinutes(schedule.startTime);
      const endTime = timeToMinutes(schedule.endTime);

      if (currentTime >= startTime && currentTime <= endTime) {
        const key = `${service._id}-${schedule.dayOfWeek}-${schedule.startTime}`;
        if (!addedKeys.has(key)) {
          addedKeys.add(key);
          results.push({
            service,
            status: 'running-now',
            timeText: `Until ${formatTime(schedule.endTime)}`,
            dayText: 'Now',
            schedule
          });
        }
        break;
      }
    }
  }

  // 2. Check for services LATER TODAY
  if (results.length < count) {
    const todayServices = getServicesForDay(scheduledServices, currentDay);

    for (const { service, schedule } of todayServices) {
      if (results.length >= count) break;

      const startTime = timeToMinutes(schedule.startTime);
      if (startTime > currentTime) {
        const key = `${service._id}-${schedule.dayOfWeek}-${schedule.startTime}`;
        if (!addedKeys.has(key)) {
          addedKeys.add(key);
          results.push({
            service,
            status: 'later-today',
            timeText: formatTime(schedule.startTime),
            dayText: 'Today',
            schedule
          });
        }
      }
    }
  }

  // 3. Check FUTURE DAYS (tomorrow and beyond)
  if (results.length < count) {
    const currentDayIndex = days.indexOf(currentDay);

    // Loop through the next 7 days
    for (let i = 1; i <= 7 && results.length < count; i++) {
      const dayIndex = (currentDayIndex + i) % 7;
      const day = days[dayIndex];
      const isTomorrow = i === 1;

      const dayServices = getServicesForDay(scheduledServices, day);

      for (const { service, schedule } of dayServices) {
        if (results.length >= count) break;

        const key = `${service._id}-${schedule.dayOfWeek}-${schedule.startTime}`;
        if (!addedKeys.has(key)) {
          addedKeys.add(key);
          results.push({
            service,
            status: isTomorrow ? 'tomorrow' : 'upcoming',
            timeText: formatTime(schedule.startTime),
            dayText: isTomorrow ? 'Tomorrow' : getDayName(day),
            schedule
          });
        }
      }
    }
  }

  return results;
}

/**
 * Get the SINGLE next upcoming service (current, later today, or tomorrow)
 * @deprecated Use getUpcomingServices() for the What's On section
 */
export function getNextUpcomingService(services: ServiceWithSchedule[]): {
  service: ServiceWithSchedule | null;
  context: 'running-now' | 'later-today' | 'tomorrow' | 'none';
  timeText: string;
} {
  const scheduledServices = services.filter(
    s => s.scheduleStructured && s.scheduleStructured.length > 0
  );

  // 1. Check if anything is running NOW
  const runningNow = scheduledServices.find(s => isServiceRunningNow(s.scheduleStructured!));
  if (runningNow) {
    const currentDay = getCurrentDay();
    const schedule = runningNow.scheduleStructured!.find(s =>
      s.dayOfWeek === currentDay && isServiceRunningNow([s])
    );
    return {
      service: runningNow,
      context: 'running-now',
      timeText: schedule ? `Running now until ${formatTime(schedule.endTime)}` : 'Running now'
    };
  }

  // 2. Check for services LATER TODAY
  const laterToday = getServicesLaterToday(scheduledServices);
  if (laterToday.length > 0) {
    const nextService = laterToday[0];
    const currentDay = getCurrentDay();
    const schedule = nextService.scheduleStructured!.find(s => s.dayOfWeek === currentDay);
    return {
      service: nextService,
      context: 'later-today',
      timeText: schedule ? `Today at ${formatTime(schedule.startTime)}` : 'Later today'
    };
  }

  // 3. Check for TOMORROW
  const tomorrowService = getEarliestServiceTomorrow(scheduledServices);
  if (tomorrowService) {
    const tomorrow = getNextDay(getCurrentDay());
    const schedule = tomorrowService.scheduleStructured!.find(s => s.dayOfWeek === tomorrow);
    const dayNames: Record<DayOfWeek, string> = {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    };
    return {
      service: tomorrowService,
      context: 'tomorrow',
      timeText: schedule ? `${dayNames[tomorrow]} at ${formatTime(schedule.startTime)}` : 'Tomorrow'
    };
  }

  // 4. Nothing found
  return {
    service: null,
    context: 'none',
    timeText: ''
  };
}
