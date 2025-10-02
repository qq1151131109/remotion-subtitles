import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

interface HologramStyleProps {
  page: {
    tokens: Array<{
      text: string;
      ts: number;
      end: number;
    }>;
  };
  enterProgress: number;
}

export const HologramStyle: React.FC<HologramStyleProps> = ({
  page,
  enterProgress,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const baseSize = Math.min(width, height);
  const fontSize = baseSize * 0.043;
  const padding = baseSize * 0.019;
  const gap = baseSize * 0.015;
  const scanlineHeight = baseSize * 0.0019;
  const gridSize = baseSize * 0.019;
  const borderWidth = baseSize * 0.0019;
  const particleSize = baseSize * 0.0028;
  
  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      padding: padding,
      perspective: `${baseSize * 0.93}px`,
    }}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: gap,
        maxWidth: "90%",
        transformStyle: "preserve-3d",
      }}>
        {page.tokens.map((token, tokenIndex) => {
          const isCurrentlyReading = tokenIndex / page.tokens.length <= enterProgress;
          const hologramWave = Math.sin((frame + tokenIndex * 10) * 0.05) * 20;
          const floatOffset = Math.sin((frame + tokenIndex * 15) * 0.03) * 8;
          
          return (
            <div
              key={tokenIndex}
              style={{
                position: 'relative',
                transformStyle: "preserve-3d",
                transform: `
                  rotateY(${hologramWave}deg) 
                  translateZ(${isCurrentlyReading ? 50 : 0}px)
                  translateY(${floatOffset}px)
                `,
                transition: isCurrentlyReading ? "all 0.5s ease-out" : "none",
              }}
            >
              {/* 主文字 */}
              <span style={{
                fontFamily: "Arial Black, sans-serif",
                fontSize: fontSize,
                fontWeight: 900,
                color: isCurrentlyReading ? "#00ffff" : "#ffffff",
                textShadow: isCurrentlyReading
                  ? `0 0 ${baseSize * 0.019}px #00ffff, 0 0 ${baseSize * 0.037}px #00ffff, 0 0 ${baseSize * 0.056}px #00ffff,
                     -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000`
                  : "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
                background: isCurrentlyReading
                  ? `linear-gradient(90deg,
                      rgba(0,255,255,0.2) 0%,
                      rgba(0,255,255,0.4) 50%,
                      rgba(0,255,255,0.2) 100%)`
                  : 'transparent',
                padding: isCurrentlyReading ? `${padding * 0.53}px ${padding * 0.63}px` : `${padding * 0.32}px ${padding * 0.42}px`,
                borderRadius: `${baseSize * 0.011}px`,
                border: isCurrentlyReading ? `${borderWidth}px solid rgba(0,255,255,0.5)` : "none",
                position: 'relative',
                top: isCurrentlyReading ? "-2px" : "0px",
                display: 'inline-block',
                backdropFilter: isCurrentlyReading ? "blur(2px)" : "none",
              }}>
                {token.text}
              </span>

              {/* 全息扫描线 */}
              {isCurrentlyReading && (
                <div style={{
                  position: 'absolute',
                  top: (Math.sin(frame * 0.1 + tokenIndex) * 50) + '%',
                  left: 0,
                  right: 0,
                  height: `${scanlineHeight}px`,
                  background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                  opacity: 0.8,
                  animation: 'scan 2s linear infinite',
                }} />
              )}

              {/* 全息网格背景 */}
              {isCurrentlyReading && (
                <div style={{
                  position: 'absolute',
                  inset: `-${baseSize * 0.0046}px`,
                  background: `
                    linear-gradient(0deg, transparent 24%, rgba(0,255,255,0.1) 25%, rgba(0,255,255,0.1) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.1) 75%, rgba(0,255,255,0.1) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(0,255,255,0.1) 25%, rgba(0,255,255,0.1) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.1) 75%, rgba(0,255,255,0.1) 76%, transparent 77%, transparent)
                  `,
                  backgroundSize: `${gridSize}px ${gridSize}px`,
                  borderRadius: `${baseSize * 0.011}px`,
                  opacity: 0.3,
                  pointerEvents: 'none',
                }} />
              )}

              {/* 3D投影效果 */}
              <span style={{
                position: 'absolute',
                top: 2,
                left: 2,
                fontFamily: "Arial Black, sans-serif",
                fontSize: fontSize,
                fontWeight: 900,
                color: "rgba(0,255,255,0.3)",
                padding: isCurrentlyReading ? `${padding * 0.53}px ${padding * 0.63}px` : `${padding * 0.32}px ${padding * 0.42}px`,
                borderRadius: `${baseSize * 0.011}px`,
                zIndex: -1,
                filter: `blur(${borderWidth}px)`,
                transform: `translateZ(-${baseSize * 0.0093}px)`,
              }}>
                {token.text}
              </span>

              {/* 边缘光效 */}
              {isCurrentlyReading && (
                <>
                  <div style={{
                    position: 'absolute',
                    inset: `-${baseSize * 0.0028}px`,
                    background: `conic-gradient(from ${frame * 3}deg,
                      rgba(0,255,255,0.0), rgba(0,255,255,0.5),
                      rgba(0,255,255,0.0), rgba(0,200,255,0.5))`,
                    borderRadius: `${baseSize * 0.013}px`,
                    filter: `blur(${baseSize * 0.0028}px)`,
                    zIndex: -2,
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: `-${baseSize * 0.0074}px`,
                    background: `radial-gradient(ellipse, rgba(0,255,255,0.3), transparent 70%)`,
                    borderRadius: "50%",
                    zIndex: -3,
                  }} />
                </>
              )}

              {/* 数据流粒子 */}
              {isCurrentlyReading && Array.from({length: 8}).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: `${particleSize}px`,
                    height: `${particleSize}px`,
                    background: '#00ffff',
                    borderRadius: '50%',
                    left: Math.sin((frame + i * 45) * 0.05) * 60 + 50 + '%',
                    top: Math.cos((frame + i * 45) * 0.05) * 40 + 50 + '%',
                    opacity: 0.8,
                    boxShadow: `0 0 ${baseSize * 0.0093}px #00ffff`,
                    pointerEvents: 'none',
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </AbsoluteFill>
  );
};