import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function CustomSlider() {
  return (
    <div className="space-y-4">
      <Label>Slider with labels and tooltip</Label>
      <div>
        <span
          className="flex items-center justify-between w-full gap-2 mb-3 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          <span>Low</span>
          <span>High</span>
        </span>
        <Slider defaultValue={[50]} className="" />
      </div>
    </div>
  );
}
