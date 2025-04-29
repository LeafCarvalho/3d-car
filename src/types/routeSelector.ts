export type RouteSelectorProps = {
  selectedCourse: number;
  setSelectedCourse: (course: number) => void;
  startAnimation: () => void;
  stopAnimation: () => void;
  isPlaying: boolean;
};