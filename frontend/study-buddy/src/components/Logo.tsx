interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-xl' },
    md: { icon: 'w-10 h-10', text: 'text-2xl' },
    lg: { icon: 'w-16 h-16', text: 'text-4xl' },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className="flex items-center space-x-2">
      {/* Logo Icon - Lightbulb with Graduation Cap */}
      <div className={`${currentSize.icon} relative`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Green Circle Background */}
          <circle cx="100" cy="100" r="85" fill="#A8D5BA" stroke="#2D6149" strokeWidth="6"/>
          
          {/* Lightbulb */}
          <g>
            {/* Bulb body - half blue circuit, half white */}
            <path 
              d="M 70 100 Q 70 70, 100 70 Q 130 70, 130 100 L 130 120 Q 130 130, 120 130 L 80 130 Q 70 130, 70 120 Z" 
              fill="#E8F4F8" 
              stroke="#1B4D6B" 
              strokeWidth="4"
            />
            
            {/* Blue circuit pattern on left half */}
            <path 
              d="M 85 85 L 85 95 M 85 90 L 90 90 M 90 85 L 90 100 M 78 105 L 92 105 M 85 105 L 85 115" 
              stroke="#2B9BD8" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="90" cy="85" r="2" fill="#2B9BD8"/>
            <circle cx="78" cy="105" r="2" fill="#2B9BD8"/>
            <circle cx="92" cy="105" r="2" fill="#2B9BD8"/>
            
            {/* Orange star on right */}
            <path 
              d="M 110 95 L 112 101 L 118 101 L 113 105 L 115 111 L 110 107 L 105 111 L 107 105 L 102 101 L 108 101 Z" 
              fill="#F68844"
            />
            
            {/* Bulb base */}
            <rect x="85" y="130" width="30" height="8" rx="2" fill="#1B4D6B"/>
            <rect x="88" y="138" width="24" height="4" rx="1" fill="#1B4D6B"/>
          </g>
          
          {/* Graduation Cap */}
          <g>
            {/* Cap top (mortarboard) */}
            <path 
              d="M 65 75 L 100 65 L 135 75 L 100 85 Z" 
              fill="#1B4D6B"
              stroke="#0D2838"
              strokeWidth="2"
            />
            {/* Cap bottom */}
            <ellipse cx="100" cy="75" rx="15" ry="5" fill="#1B4D6B"/>
            {/* Tassel */}
            <line x1="135" y1="75" x2="140" y2="85" stroke="#F68844" strokeWidth="2"/>
            <circle cx="140" cy="87" r="3" fill="#F68844"/>
          </g>
          
          {/* Decorative checkmarks */}
          <path d="M 35 50 L 38 53 L 43 48" stroke="#F68844" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M 42 55 L 45 58 L 50 53" stroke="#2B9BD8" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      
      {/* Text Logo */}
      {showText && (
        <div className={`font-bold ${currentSize.text}`}>
          <span className="text-[#2B9BD8]">Study</span>
          <span className="text-gray-700">-</span>
          <span className="text-[#F68844]">Buddy</span>
        </div>
      )}
    </div>
  );
}