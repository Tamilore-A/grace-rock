export default function Ticker() {
  return (
    <div className="w-full h-[104px] bg-transparent backdrop-blur-sm border-t border-white/10 overflow-hidden absolute bottom-0 z-30 flex items-center">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repeated content to ensure smooth scrolling */}
        <div className="flex items-center space-x-8 mx-4">
           <span className="text-teal-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">JOIN THE MOVEMENT</span>
           <span className="text-blue-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">FAITH . FOUNDATION . FUTURE . FAMILY</span>
        </div>
        <div className="flex items-center space-x-8 mx-4">
           <span className="text-teal-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">JOIN THE MOVEMENT</span>
           <span className="text-blue-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">FAITH . FOUNDATION . FUTURE . FAMILY</span>
        </div>
        <div className="flex items-center space-x-8 mx-4">
           <span className="text-teal-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">JOIN THE MOVEMENT</span>
           <span className="text-blue-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">FAITH . FOUNDATION . FUTURE . FAMILY</span>
        </div>
        <div className="flex items-center space-x-8 mx-4">
           <span className="text-teal-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">JOIN THE MOVEMENT</span>
           <span className="text-blue-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">FAITH . FOUNDATION . FUTURE . FAMILY</span>
        </div>
         <div className="flex items-center space-x-8 mx-4">
           <span className="text-teal-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">JOIN THE MOVEMENT</span>
           <span className="text-blue-500 text-xs">●</span>
           <span className="text-white font-medium tracking-widest text-sm">FAITH . FOUNDATION . FUTURE . FAMILY</span>
        </div>
      </div>
    </div>
  );
}
