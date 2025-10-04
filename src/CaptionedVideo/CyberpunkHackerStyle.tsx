import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

interface CyberpunkHackerStyleProps {
  page: {
    tokens: Array<{
      text: string;
      ts: number;
      end: number;
    }>;
  };
  enterProgress: number;
}

export const CyberpunkHackerStyle: React.FC<CyberpunkHackerStyleProps> = ({
  page,
  enterProgress,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const baseSize = Math.min(width, height);
  const fontSize = baseSize * 0.041;
  const padding = baseSize * 0.019;
  const gap = baseSize * 0.017;
  const matrixFontSize = baseSize * 0.011;
  const matrixColumnWidth = baseSize * 0.019;
  const borderWidth = baseSize * 0.0009;
  const cornerSize = baseSize * 0.0056;
  const scanlineHeight = baseSize * 0.0019;

  // 矩阵字符
  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
  
  return (
    <AbsoluteFill style={{
      justifyContent: "flex-end",
      alignItems: "center",
      top: undefined,
      bottom: height * 0.18,
      height: height * 0.08,
      background: "radial-gradient(circle, rgba(0,20,0,0.3), transparent 70%)",
    }}>
      {/* 背景代码雨 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {Array.from({length: 15}).map((_, columnIndex) => (
          <div
            key={columnIndex}
            style={{
              position: 'absolute',
              left: `${columnIndex * 7}%`,
              top: 0,
              width: `${matrixColumnWidth}px`,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              fontSize: `${matrixFontSize}px`,
              fontFamily: 'Courier New, monospace',
              color: `rgba(0, 255, 65, ${0.3 + Math.sin(frame * 0.02 + columnIndex) * 0.2})`,
              animation: `matrix-rain ${3 + columnIndex % 3}s linear infinite`,
              animationDelay: `${columnIndex * 0.2}s`,
            }}
          >
            {Array.from({length: 50}).map((_, charIndex) => (
              <span
                key={charIndex}
                style={{
                  opacity: Math.random() > 0.7 ? 1 : 0.1,
                  transform: `translateY(${(frame + columnIndex * 10 + charIndex * 5) % 500}px)`,
                }}
              >
                {matrixChars[Math.floor((frame + columnIndex * 7 + charIndex * 3) % matrixChars.length)]}
              </span>
            ))}
          </div>
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
          const glitchOffset = isCurrentlyReading ? Math.sin(frame * 0.5 + tokenIndex) * 2 : 0;
          const scanlinePos = (frame + tokenIndex * 20) % 100;
          
          return (
            <div
              key={tokenIndex}
              style={{
                position: 'relative',
                filter: isCurrentlyReading ? 'contrast(1.2) brightness(1.1)' : 'none',
              }}
            >
              {/* 黑客文字主体 */}
              <span style={{
                fontFamily: "Orbitron, 'Courier New', monospace",
                fontSize: fontSize,
                fontWeight: 900,
                color: isCurrentlyReading ? "#00ff41" : "#ffffff",
                textShadow: isCurrentlyReading
                  ? `0 0 ${baseSize * 0.019}px #00ff41, 0 0 ${baseSize * 0.037}px #00ff41, 0 0 ${baseSize * 0.056}px #00ff41,
                     -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000`
                  : "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
                background: isCurrentlyReading
                  ? `linear-gradient(90deg,
                      rgba(0, 255, 65, 0.2) 0%,
                      rgba(0, 255, 65, 0.4) 50%,
                      rgba(0, 255, 65, 0.2) 100%)`
                  : 'transparent',
                padding: isCurrentlyReading ? `${padding * 0.63}px ${padding * 0.84}px` : `${padding * 0.32}px ${padding * 0.42}px`,
                borderRadius: `${baseSize * 0.0074}px`,
                border: isCurrentlyReading ? `${borderWidth}px solid rgba(0, 255, 65, 0.5)` : "none",
                position: 'relative',
                top: isCurrentlyReading ? "-2px" : "0px",
                display: 'inline-block',
                transform: `translateX(${glitchOffset}px)`,
                letterSpacing: "1px",
              }}>
                {token.text}
                
                {/* 扫描线效果 */}
                {isCurrentlyReading && (
                  <div style={{
                    position: 'absolute',
                    top: `${scanlinePos}%`,
                    left: 0,
                    right: 0,
                    height: `${scanlineHeight}px`,
                    background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
                    opacity: 0.7,
                    pointerEvents: 'none',
                  }} />
                )}
              </span>

              {/* 数字雨环绕 */}
              {isCurrentlyReading && (
                <div style={{
                  position: 'absolute',
                  inset: `-${padding * 1.05}px`,
                  pointerEvents: 'none',
                }}>
                  {Array.from({length: 8}).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        position: 'absolute',
                        left: Math.sin((frame + i * 45) * 0.05) * 40 + 50 + '%',
                        top: Math.cos((frame + i * 45) * 0.05) * 30 + 50 + '%',
                        fontSize: `${matrixFontSize * 1.27}px`,
                        fontFamily: 'Courier New, monospace',
                        color: `rgba(0, 255, 65, ${0.6 + Math.sin(frame * 0.08 + i) * 0.4})`,
                        textShadow: `0 0 ${baseSize * 0.0093}px #00ff41`,
                        transform: `scale(${0.8 + Math.sin(frame * 0.1 + i) * 0.3})`,
                      }}
                    >
                      {matrixChars[Math.floor((frame + i * 7) % matrixChars.length)]}
                    </span>
                  ))}
                </div>
              )}

              {/* 电路板效果 */}
              {isCurrentlyReading && (
                <>
                  <div style={{
                    position: 'absolute',
                    inset: `-${baseSize * 0.0046}px`,
                    background: `
                      linear-gradient(0deg, transparent 48%, rgba(0,255,65,0.2) 49%, rgba(0,255,65,0.2) 51%, transparent 52%),
                      linear-gradient(90deg, transparent 48%, rgba(0,255,65,0.2) 49%, rgba(0,255,65,0.2) 51%, transparent 52%)
                    `,
                    backgroundSize: `${baseSize * 0.028}px ${baseSize * 0.028}px`,
                    opacity: 0.4,
                    pointerEvents: 'none',
                  }} />

                  {/* 角落连接点 */}
                  {[
                    {top: `-${baseSize * 0.0028}px`, left: `-${baseSize * 0.0028}px`},
                    {top: `-${baseSize * 0.0028}px`, right: `-${baseSize * 0.0028}px`},
                    {bottom: `-${baseSize * 0.0028}px`, left: `-${baseSize * 0.0028}px`},
                    {bottom: `-${baseSize * 0.0028}px`, right: `-${baseSize * 0.0028}px`},
                  ].map((position, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: `${cornerSize}px`,
                        height: `${cornerSize}px`,
                        background: '#00ff41',
                        border: `${borderWidth}px solid #00ff41`,
                        boxShadow: `0 0 ${baseSize * 0.0093}px #00ff41`,
                        ...position,
                      }}
                    />
                  ))}
                </>
              )}

              {/* 故障效果 */}
              {isCurrentlyReading && Math.random() > 0.9 && (
                <>
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 2,
                    fontFamily: "Orbitron, 'Courier New', monospace",
                    fontSize: fontSize,
                    fontWeight: 900,
                    color: "#ff0040",
                    opacity: 0.7,
                    pointerEvents: 'none',
                  }}>
                    {token.text}
                  </span>
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: -2,
                    fontFamily: "Orbitron, 'Courier New', monospace",
                    fontSize: fontSize,
                    fontWeight: 900,
                    color: "#0040ff",
                    opacity: 0.7,
                    pointerEvents: 'none',
                  }}>
                    {token.text}
                  </span>
                </>
              )}

              {/* 数据流线条 */}
              {isCurrentlyReading && (
                <div style={{
                  position: 'absolute',
                  inset: `-${baseSize * 0.0093}px`,
                  border: `${borderWidth}px solid rgba(0, 255, 65, ${0.3 + Math.sin(frame * 0.1) * 0.2})`,
                  borderRadius: `${baseSize * 0.0093}px`,
                  pointerEvents: 'none',
                  boxShadow: `
                    0 0 ${baseSize * 0.019}px rgba(0, 255, 65, 0.3),
                    inset 0 0 ${baseSize * 0.019}px rgba(0, 255, 65, 0.1)
                  `,
                }} />
              )}
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes matrix-rain {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </AbsoluteFill>
  );
};