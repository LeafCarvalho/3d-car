import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import gpsJson from '../data/frontend_data_gps.json';

export const useGpsData = (courseIndex: number) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [vehicleStatus, setVehicleStatus] = useState<'stopped_off' | 'stopped_on' | 'moving'>('stopped_off');

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const durationRef = useRef<number>(0);
  const previousDirectionRef = useRef<number>(0);
  const initialBearingRef = useRef<number>(0);
  const lastMovementTimeRef = useRef<number | null>(null);

  const gpsPoints = useMemo(() => {
    return gpsJson.courses?.[courseIndex]?.gps || [];
  }, [courseIndex]);

  const resetAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    startTimeRef.current = null;
    durationRef.current = 0;
    setVehicleStatus('stopped_off');
  }, []);
  

  const toRad = (value: number) => (value * Math.PI) / 180;

  const calculateBearing = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const dLng = toRad(lng2 - lng1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);
    const y = Math.sin(dLng) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
    const bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360;
  };

  const haversineDistanceKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 6371 * c;
  };

  useEffect(() => {
    resetAnimation();
    setCurrentPointIndex(0);
    setIsPlaying(false);

    const firstPoint = gpsPoints[0];
    if (firstPoint) {
      const initialPos: [number, number] = [firstPoint.latitude, firstPoint.longitude];
      setPosition(initialPos);
      setDirection(firstPoint.direction || 0);
    }
  }, [gpsPoints, resetAnimation]);

  useEffect(() => {
    if (!isPlaying || gpsPoints.length === 0) return;

    const current = gpsPoints[currentPointIndex];
    const next = gpsPoints[currentPointIndex + 1];

    if (!current || !next) {
      setIsPlaying(false);
      return;
    }

    const { latitude: startLat, longitude: startLng, speed: startSpeed = 0 } = current;
    const { latitude: endLat, longitude: endLng, speed: endSpeed = 0 } = next;

    const distanceKm = haversineDistanceKm(startLat, startLng, endLat, endLng);
    const averageSpeed = (startSpeed + endSpeed) / 2;

    const durationMs = averageSpeed > 0
      ? (distanceKm * 1000) / averageSpeed * 3600
      : Math.max((next.acquisition_time_unix - current.acquisition_time_unix) * 1000, 1000);

    startTimeRef.current = performance.now();
    durationRef.current = durationMs;

    initialBearingRef.current = calculateBearing(startLat, startLng, endLat, endLng);
    previousDirectionRef.current = initialBearingRef.current;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / durationRef.current, 1);

      const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      const easedProgress = easeInOutQuad(progress);

      const distanceTraveledKm = distanceKm * easedProgress;
      const R = 6371;
      const bearingRad = toRad(initialBearingRef.current);

      const startLatRad = toRad(startLat);
      const startLngRad = toRad(startLng);

      const newLatRad = Math.asin(
        Math.sin(startLatRad) * Math.cos(distanceTraveledKm / R) +
        Math.cos(startLatRad) * Math.sin(distanceTraveledKm / R) * Math.cos(bearingRad)
      );

      const newLngRad = startLngRad + Math.atan2(
        Math.sin(bearingRad) * Math.sin(distanceTraveledKm / R) * Math.cos(startLatRad),
        Math.cos(distanceTraveledKm / R) - Math.sin(startLatRad) * Math.sin(newLatRad)
      );

      const lat = (newLatRad * 180) / Math.PI;
      const lng = (newLngRad * 180) / Math.PI;
      const newPos: [number, number] = [lat, lng];
      setPosition(newPos);

      const targetBearing = calculateBearing(lat, lng, endLat, endLng);
      let delta = targetBearing - previousDirectionRef.current;
      if (Math.abs(delta) > 180) {
        delta = delta > 0 ? delta - 360 : delta + 360;
      }

      const smoothedDirection = (previousDirectionRef.current + delta * 0.2 + 360) % 360;
      previousDirectionRef.current = smoothedDirection;
      setDirection(smoothedDirection);

      const currentSpeed = startSpeed + (endSpeed - startSpeed) * easedProgress;
      if (currentSpeed > 5) {
        setVehicleStatus('moving');
        lastMovementTimeRef.current = performance.now();
      } else {
        const now = performance.now();
        const timeSinceLastMove = lastMovementTimeRef.current ? (now - lastMovementTimeRef.current) : 0;
        if (timeSinceLastMove > 2 * 60 * 1000) {
          setVehicleStatus('stopped_off');
        } else {
          setVehicleStatus('stopped_on');
        }
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentPointIndex((prev) => prev + 1);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [currentPointIndex, isPlaying, gpsPoints]);

  const startAnimation = useCallback(() => {
    resetAnimation();
    setCurrentPointIndex(0);
    setIsPlaying(true);
  }, [resetAnimation]);

  const stopAnimation = useCallback(() => {
    resetAnimation();
    setIsPlaying(false);
  }, [resetAnimation]);

  return {
    position,
    direction,
    startAnimation,
    stopAnimation,
    isPlaying,
    vehicleStatus,
  };
};
