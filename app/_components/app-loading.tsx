import ILoading from './type';

export default function AppLoading({ fullScreen = false, className }: ILoading) {
  return (
    <div
      className={`flex item-center w-full justify-center ${fullScreen ? ' min-h-screen' : `min-h-[120px] ${className}`}`}
    >
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 animate-pulse rounded-full bg-blue-60 [animation-deley:0ms] " />
        <span className="h-3 w-3 animate-pulse rounded-full bg-blue-60 [animation-deley:150ms] " />
        <span className="h-3 w-3 animate-pulse rounded-full bg-blue-60 [animation-deley:300ms] " />
      </div>
    </div>
  );
}
