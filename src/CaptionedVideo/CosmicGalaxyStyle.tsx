import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

interface CosmicGalaxyStyleProps {
  page: {
    tokens: Array<{
      text: string;
      ts: number;
      end: number;
    }>;
  };
  enterProgress: number;
}

export const CosmicGalaxyStyle: React.FC<CosmicGalaxyStyleProps> = ({
  page,
  enterProgress,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 响应式尺寸计算
  const baseSize = Math.min(width, height);
  const fontSize = baseSize * 0.042;
  const orbitOuter = baseSize * 0.167;
  const orbitMid = baseSize * 0.12;
  const orbitInner = baseSize * 0.093;
  const planetSize = baseSize * 0.0056;
  const starSize = baseSize * 0.0037;
  const padding = baseSize * 0.019;
  const gap = baseSize * 0.022;
  const nebulaSize = baseSize * 0.056;
  const borderWidth = baseSize * 0.0009;
  const particleBase = baseSize * 0.0028;
  
  return (
    <AbsoluteFill style={{
      justifyContent: "flex-end",
      alignItems: "center",
      top: undefined,
      bottom: height * 0.18,
      height: height * 0.08,
      background: "radial-gradient(ellipse, rgba(13, 25, 55, 0.5), rgba(3, 7, 18, 0.8) 70%)",
    }}>
      {/* 星空背景 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* 星星 */}
        {Array.from({length: 150}).map((_, i) => {
          const starX = (i * 137.5) % 100; // 黄金角分布
          const starY = (i * 23.5) % 100;
          const starSizeCalc = (Math.random() * 3 + 1) * (starSize / 4);
          const twinkle = Math.sin(frame * 0.05 + i * 0.1) * 0.5 + 0.5;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${starX}%`,
                top: `${starY}%`,
                width: `${starSizeCalc}px`,
                height: `${starSizeCalc}px`,
                background: `hsl(${200 + i % 60}, 70%, ${70 + twinkle * 30}%)`,
                borderRadius: '50%',
                opacity: 0.4 + twinkle * 0.6,
                boxShadow: `0 0 ${starSizeCalc * 2}px hsl(${200 + i % 60}, 70%, 80%)`,
              }}
            />
          );
        })}
        
        {/* 星云 */}
        {Array.from({length: 8}).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 17 + frame * 0.02) % 120 - 10}%`,
              top: `${(i * 23 + Math.sin(frame * 0.01 + i) * 20) % 120 - 10}%`,
              width: `${nebulaSize + i * baseSize * 0.019}px`,
              height: `${nebulaSize * 0.375 + i * baseSize * 0.008}px`,
              background: `radial-gradient(
                ellipse,
                rgba(${100 + i * 20}, ${150 + i * 10}, 255, ${0.1 + Math.sin(frame * 0.02 + i) * 0.05}),
                transparent 70%
              )`,
              borderRadius: '50%',
              filter: 'blur(15px)',
              transform: `rotate(${frame * 0.1 + i * 45}deg)`,
            }}
          />
        ))}
      </div>
      
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: gap,
        maxWidth: "90%",
        position: 'relative',
        zIndex: 10,
      }}>
        {page.tokens.map((token, tokenIndex) => {
          const isCurrentlyReading = tokenIndex / page.tokens.length <= enterProgress;
          const cosmicPulse = Math.sin((frame + tokenIndex * 25) * 0.06) * 0.2 + 1;
          const starRotation = (frame + tokenIndex * 40) * 0.3;
          
          return (
            <div
              key={tokenIndex}
              style={{
                position: 'relative',
                transform: `scale(${isCurrentlyReading ? cosmicPulse : 1})`,
              }}
            >
              {/* 星系轨道环 */}
              {isCurrentlyReading && (
                <>
                  {/* 外轨道 */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: `${orbitOuter}px`,
                    height: `${orbitOuter}px`,
                    border: `${borderWidth}px solid rgba(100, 200, 255, 0.3)`,
                    borderRadius: '50%',
                    transform: `translate(-50%, -50%) rotate(${starRotation}deg)`,
                    pointerEvents: 'none',
                  }}>
                    {/* 轨道行星 */}
                    {Array.from({length: 6}).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          width: `${planetSize}px`,
                          height: `${planetSize}px`,
                          background: `hsl(${180 + i * 30}, 80%, 70%)`,
                          borderRadius: '50%',
                          transform: `
                            rotate(${i * 60}deg)
                            translateY(-${orbitOuter / 2}px)
                            rotate(${-starRotation}deg)
                          `,
                          transformOrigin: `0 ${orbitOuter / 2}px`,
                          boxShadow: `0 0 ${planetSize * 1.67}px hsl(${180 + i * 30}, 80%, 70%)`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* 中轨道 */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: `${orbitMid}px`,
                    height: `${orbitMid}px`,
                    border: `${borderWidth}px solid rgba(150, 220, 255, 0.4)`,
                    borderRadius: '50%',
                    transform: `translate(-50%, -50%) rotate(${-starRotation * 0.7}deg)`,
                    pointerEvents: 'none',
                  }}>
                    {/* 中轨道星体 */}
                    {Array.from({length: 4}).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          width: `${planetSize * 0.67}px`,
                          height: `${planetSize * 0.67}px`,
                          background: `hsl(${220 + i * 25}, 85%, 75%)`,
                          borderRadius: '50%',
                          transform: `
                            rotate(${i * 90}deg)
                            translateY(-${orbitMid / 2}px)
                            rotate(${starRotation * 0.7}deg)
                          `,
                          transformOrigin: `0 ${orbitMid / 2}px`,
                          boxShadow: `0 0 ${planetSize * 1.33}px hsl(${220 + i * 25}, 85%, 75%)`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* 内核光晕 */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: `${orbitInner}px`,
                    height: `${orbitInner}px`,
                    background: `radial-gradient(
                      circle,
                      rgba(255, 255, 255, ${0.2 + Math.sin(frame * 0.08) * 0.1}),
                      rgba(150, 200, 255, ${0.1 + Math.sin(frame * 0.06) * 0.05}),
                      transparent 60%
                    )`,
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    filter: `blur(${baseSize * 0.0093}px)`,
                    pointerEvents: 'none',
                  }} />
                </>
              )}
              
              {/* 主文字 */}
              <span style={{
                fontFamily: "Exo, 'Orbitron', sans-serif",
                fontSize: fontSize,
                fontWeight: 700,
                background: isCurrentlyReading
                  ? `linear-gradient(45deg, 
                      #ffffff 0%, 
                      #a8e6ff 25%, 
                      #7dd3fc 50%, 
                      #38bdf8 75%, 
                      #0ea5e9 100%)`
                  : "#ffffff",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: isCurrentlyReading ? "transparent" : "#ffffff",
                backgroundClip: "text",
                textShadow: isCurrentlyReading
                  ? `0 0 ${baseSize * 0.028}px rgba(56, 189, 248, 0.8),
                     0 0 ${baseSize * 0.056}px rgba(14, 165, 233, 0.6),
                     -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000`
                  : "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
                border: isCurrentlyReading ? `${borderWidth * 2}px solid rgba(56, 189, 248, 0.4)` : "none",
                padding: isCurrentlyReading ? `${padding * 0.63}px ${padding * 1.05}px` : `${padding * 0.32}px ${padding * 0.53}px`,
                borderRadius: `${baseSize * 0.019}px`,
                position: 'relative',
                top: isCurrentlyReading ? `${-borderWidth * 2}px` : "0px",
                display: 'inline-block',
                backdropFilter: isCurrentlyReading ? "blur(3px)" : "none",
                background: isCurrentlyReading
                  ? `linear-gradient(135deg, 
                      rgba(56, 189, 248, 0.1) 0%, 
                      rgba(14, 165, 233, 0.2) 50%, 
                      rgba(56, 189, 248, 0.1) 100%)`
                  : 'transparent',
                letterSpacing: "1px",
              }}>
                {token.text}
              </span>

              {/* 宇宙尘埃粒子 */}
              {isCurrentlyReading && Array.from({length: 20}).map((_, i) => {
                const angle = (i * 18) + frame * 0.5;
                const radius = baseSize * 0.056 + Math.sin(frame * 0.03 + i) * baseSize * 0.028;
                const size = particleBase * 0.36 + Math.sin(frame * 0.07 + i * 0.5) * particleBase * 0.54;
                
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: `${size}px`,
                      height: `${size}px`,
                      background: `hsl(${190 + i * 8}, 70%, 80%)`,
                      borderRadius: '50%',
                      transform: `
                        translate(-50%, -50%)
                        rotate(${angle}deg)
                        translateX(${radius}px)
                      `,
                      opacity: 0.3 + Math.sin(frame * 0.04 + i) * 0.4,
                      boxShadow: `0 0 ${size * 3}px hsl(${190 + i * 8}, 70%, 80%)`,
                      pointerEvents: 'none',
                    }}
                  />
                );
              })}

              {/* 彗星尾巴效果 */}
              {isCurrentlyReading && (
                <div style={{
                  position: 'absolute',
                  inset: `-${padding * 1.05}px`,
                  background: `conic-gradient(from ${frame}deg,
                    rgba(56, 189, 248, 0.0),
                    rgba(56, 189, 248, 0.3),
                    rgba(56, 189, 248, 0.0))`,
                  borderRadius: '50%',
                  filter: `blur(${padding * 1.05}px)`,
                  pointerEvents: 'none',
                  animation: 'cosmic-rotation 8s linear infinite',
                }} />
              )}

              {/* 星际光束 */}
              {isCurrentlyReading && Math.sin(frame * 0.1 + tokenIndex) > 0.8 && (
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: `${borderWidth * 2}px`,
                  height: `${baseSize * 0.186}px`,
                  background: `linear-gradient(
                    to bottom,
                    transparent,
                    rgba(255, 255, 255, 0.8) 40%,
                    rgba(56, 189, 248, 0.6) 50%,
                    rgba(255, 255, 255, 0.8) 60%,
                    transparent
                  )`,
                  transform: `translate(-50%, -50%) rotate(${frame * 2}deg)`,
                  pointerEvents: 'none',
                  filter: `blur(${borderWidth}px)`,
                }} />
              )}
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes cosmic-rotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AbsoluteFill>
  );
};