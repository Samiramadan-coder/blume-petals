import AppLogo from "../reusable/app-logo";

export default function DetailsConsidered() {
  return (
    <div className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20 flex flex-col items-center gap-6">
          <AppLogo width={120} />
          <p className="text-sm italic text-foreground/50">
            Every detail, considered.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full shadow-md border-2 border-white bg-primary"></div>
              <span className="text-[11px] font-medium text-foreground/50">
                Gold
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full shadow-md border-2 border-white bg-[#7d947b]"></div>
              <span className="text-[11px] font-medium text-foreground/50">
                Saga
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full shadow-md border-2 border-white bg-border"></div>
              <span className="text-[11px] font-medium text-foreground/50">
                Beige
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full shadow-md border-2 border-white bg-[#ed8074]"></div>
              <span className="text-[11px] font-medium text-foreground/50">
                Terracotta
              </span>
            </div>
          </div>
          <p className="text-xs text-foreground/40 tracking-wide">
            Inspired by nature, designed for elegance.
          </p>
        </div>
      </div>
    </div>
  );
}
