import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

interface QuantumTeleportStyleProps {
  page: {
    tokens: Array<{
      text: string;
      ts: number;
      end: number;
    }>;
  };
  enterProgress: number;
}

export const QuantumTeleportStyle: React.FC<QuantumTeleportStyleProps> = ({
  page,
  enterProgress,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const baseSize = Math.min(width, height);
  const fontSize = baseSize * 0.041;
  const padding = baseSize * 0.019;
  const gap = baseSize * 0.011;
  const portalInset = baseSize * 0.0093;
  const borderWidth = baseSize * 0.0019;
  const particleOffsetMax = baseSize * 0.014;
  
  return (
    <AbsoluteFill style={{
      justifyContent: "flex-end",
      alignItems: "center",
      padding: padding,
    }}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: gap,
        maxWidth: "90%",
      }}>
        {page.tokens.map((token, tokenIndex) => {
          const isCurrentlyReading = tokenIndex / page.tokens.length <= enterProgress;
          const quantumPhase = (frame + tokenIndex * 5) * 0.1;
          
          // 量子效果：每个字符独立粒子化
          const chars = token.text.split('');
          
          return (
            <div
              key={tokenIndex}
              style={{
                display: 'inline-flex',
                position: 'relative',
              }}
            >
              {chars.map((char, charIndex) => {
                const particleOffset = Math.sin(quantumPhase + charIndex * 0.5) * (isCurrentlyReading ? 0 : 5);
                const particleOpacity = isCurrentlyReading 
                  ? 1 
                  : 0.3 + Math.abs(Math.sin(quantumPhase + charIndex * 0.3)) * 0.7;
                
                // 创建量子粒子效果
                const particles = isCurrentlyReading ? [] : Array.from({length: 3}, (_, i) => (
                  <span
                    key={`particle-${i}`}
                    style={{
                      position: 'absolute',
                      left: Math.sin(quantumPhase + i * 2) * particleOffsetMax,
                      top: Math.cos(quantumPhase + i * 1.5) * particleOffsetMax * 0.67,
                      fontSize: `${fontSize * 0.18}px`,
                      color: `hsl(${180 + i * 60}, 80%, 60%)`,
                      opacity: 0.6,
                      pointerEvents: 'none',
                    }}
                  >
                    ●
                  </span>
                ));
                
                return (
                  <span
                    key={charIndex}
                    style={{
                      position: 'relative',
                      fontFamily: "Arial Black, sans-serif",
                      fontSize: fontSize,
                      fontWeight: 900,
                      color: "white",
                      textShadow: isCurrentlyReading
                        ? `0 0 ${baseSize * 0.019}px #00ffff, 0 0 ${baseSize * 0.037}px #00ffff, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000`
                        : "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
                      background: isCurrentlyReading
                        ? `linear-gradient(45deg,
                            rgba(0,255,255,0.3) 0%,
                            rgba(255,0,255,0.3) 50%,
                            rgba(0,255,255,0.3) 100%)`
                        : 'transparent',
                      padding: isCurrentlyReading ? `${padding * 0.42}px ${padding * 0.32}px` : `${padding * 0.21}px ${padding * 0.11}px`,
                      borderRadius: `${baseSize * 0.0074}px`,
                      transform: `
                        translate(${particleOffset}px, ${particleOffset * 0.5}px) 
                        scale(${isCurrentlyReading ? 1.1 : 1})
                        rotateX(${isCurrentlyReading ? 0 : Math.sin(quantumPhase) * 10}deg)
                      `,
                      opacity: particleOpacity,
                      transition: isCurrentlyReading
                        ? "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                        : "none",
                      display: 'inline-block',
                      filter: isCurrentlyReading
                        ? `drop-shadow(0 0 ${baseSize * 0.0093}px rgba(0,255,255,0.8))`
                        : "none",
                    }}
                  >
                    {char}
                    {particles}
                  </span>
                );
              })}
              
              {/* 量子传送门效果 */}
              {isCurrentlyReading && (
                <>
                  <div style={{
                    position: 'absolute',
                    inset: `-${portalInset}px`,
                    borderRadius: '50%',
                    background: `conic-gradient(from ${frame * 2}deg,
                      transparent, rgba(0,255,255,0.4), transparent,
                      rgba(255,0,255,0.4), transparent)`,
                    animation: `spin 2s linear infinite`,
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: `-${baseSize * 0.014}px`,
                    borderRadius: '50%',
                    border: `${borderWidth}px solid rgba(0,255,255,0.6)`,
                    animation: `pulse 1s ease-in-out infinite alternate`,
                    pointerEvents: 'none',
                  }} />
                </>
              )}
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          to { transform: scale(1.2); }
        }
      `}</style>
    </AbsoluteFill>
  );
};