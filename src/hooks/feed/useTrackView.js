import { useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../utils/axios";

const BATCH_SIZE = 10;

const sendTrackingData = (payload) => {
  return api.post("feed/web/track-view", payload);
};

export const useTrackView = () => {
  const queueRef = useRef([]);

  const { mutate } = useMutation({
    mutationFn: sendTrackingData,
    onError: (error) => {
      console.error("Tracking error (Silent):", error);
    },
  });

  const trackInteraction = useCallback(
    (newsId, actions = [], duration = 0) => {
      queueRef.current.push({ news_id: newsId, actions, duration });

      if (queueRef.current.length >= BATCH_SIZE) {
        const payload = { interactions: [...queueRef.current] };
        mutate(payload);
        queueRef.current = [];
      }
    },
    [mutate],
  );

  return { trackInteraction };
};
