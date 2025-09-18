export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  image: string;
  position: 'left' | 'right';
  imageClass?: string;
}
