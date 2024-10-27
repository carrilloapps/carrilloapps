import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import moment from "moment-timezone";
import "moment/locale/es";

import dates from "./dates.json";

type Event = {
  url: string;
  date: string;
  zone: string;
  recurrent: string;
  localDate?: moment.Moment;
};

export default function NextStream() {
  const { t, i18n } = useTranslation();
  const [closestEvent, setClosestEvent] = useState<Event | null>(null);
  const [lastEvent, setLastEvent] = useState<Event | null>(null);

  useEffect(() => {
    const findEvents = () => {
      const userTimezone = moment.tz.guess();
      const now = moment();

      const mappedEvents = dates.map((event) => {
        let eventDate = moment.tz(event.date, event.zone);

        if (event.recurrent === "true") {
          while (eventDate.isBefore(now, "day")) {
            eventDate.add(1, "weeks");
          }
        }

        return {
          ...event,
          localDate: eventDate.clone().tz(userTimezone),
        };
      });

      const upcomingEvents = mappedEvents
        .filter((event) => event.localDate && event.localDate.isAfter(now))
        .sort((a, b) => a.localDate!.diff(now) - b.localDate!.diff(now));

      const pastEvents = mappedEvents
        .filter((event) => event.localDate && event.localDate.isBefore(now))
        .sort((a, b) => b.localDate!.diff(now) - a.localDate!.diff(now));

      setClosestEvent(upcomingEvents[0] || null);
      setLastEvent(pastEvents[0] || null);
    };

    findEvents();
  }, []);

  useEffect(() => {
    moment.locale(i18n.language);
    console.log(`Language changed to: ${i18n.language}`);
  }, [i18n.language]);

  return (
    <div className="mt-5 min-w-[100%]">
      {closestEvent ? (
        <a
          className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center border-2 border-red-400 hover:bg-red-400 transition duration-150 rounded-xl"
          href={closestEvent.url}
          title={`Canal de YouTube de ${t("profile.name")}`}
          aria-label="YouTube"
        >
          <FontAwesomeIcon icon={faYoutube} size="xl" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">
              {t("profile.liveStream.cta")}
            </div>
            <div className="text-xs text-orange-200 text-ellipsis capitalize">
              {closestEvent.localDate?.format("LLLL")} ({closestEvent.zone})
            </div>
          </div>
        </a>
      ) : (
        <div className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center border-2 border-gray-400 bg-gray-100 transition duration-150 rounded-xl opacity-50">
          <FontAwesomeIcon icon={faYoutube} size="xl" color="gray" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-gray-400">
              {t("profile.liveStream.inactive")}
            </div>
            <div className="text-xs text-gray-400 text-ellipsis">
              {lastEvent
                ? `${t("profile.liveStream.lastStream")}: ${lastEvent.localDate?.format("LLLL")} (${lastEvent.zone})`
                : t("profile.liveStream.noStreamHistory")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
